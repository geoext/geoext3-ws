var watch = require('watch');
var fs = require('fs-extra');
var net = require('net');
var path = require('path');
var process = require('process');

var exerciseDir = "exercises";
var srcDir = path.join(__dirname, "..", "src");
var exerciseInDir = path.join(srcDir, exerciseDir);
var exerciseOutDir = path.join(srcDir, "_book", exerciseDir);

var initialWaitMs = 1000;
var stillRunningIntervalMs = 5000;
var stillRunningInterval = null;

var gitbookPort = 4000;
var currentlySyncing = false;
var MAX_NUM_RETRIES = 5;
var actualRetries = 0;


function handlePortStatus(isPortBusy) {
    if (!currentlySyncing && !isPortBusy) {
        // the gitbook server isn't started yet, schedule another check
        setTimeout(portIsBusy, initialWaitMs, gitbookPort, handlePortStatus);
    } else if (!currentlySyncing && isPortBusy) {
        // we did not start syncing, but the gitbook server is already up
        setupExerciseSyncing();
    } else if (currentlySyncing && isPortBusy) {
        // the normal state… syncing while the gitbook is being served
        // reset numRetries, we might have been counting it down while the
        // gitbook server went down during a page rebuild.
        actualRetries = 0;
    } else if (currentlySyncing && !isPortBusy) {
        // gitbook server was stopped... This may be because a *.md file or
        // book.json changed. We don't want to immeadiately stop and shutdown
        actualRetries++;
        if (actualRetries > MAX_NUM_RETRIES) {
            shutdownExerciseSyncing();
        }
    }
}

function setupExerciseSyncing() {
    currentlySyncing = true;
    console.log("");
    console.log("Exercise syncing started");
    console.log("");
    console.log("  Files stored in '%s'", exerciseInDir);
    console.log("  will be synced with '%s'", exerciseOutDir);
    console.log("  Base-URL: http://localhost:%s/%s/", gitbookPort, exerciseDir);
    console.log("");
    watchExerciseDirectory();
    stillRunningInterval = setInterval(
        portIsBusy,
        stillRunningIntervalMs,
        gitbookPort,
        handlePortStatus
    );
}

function shutdownExerciseSyncing() {
    if (stillRunningInterval && stillRunningInterval.clearInterval) {
        stillRunningInterval.clearInterval();
    }
    if (currentlySyncing) {
        unwatchExerciseDirectory();
        console.log("");
        console.log("Exercise syncing stopped");
        console.log("");
        currentlySyncing = false;
        process.exit(0);
    }
}

function portIsBusy(port, callback) {
    var server = net.createServer();
    server.once('error', function(err) {
        if (err.code === 'EADDRINUSE') {
            callback(true);
        }
    });
    server.once('listening', function() {
        // close the server if listening doesn't fail
        server.close();
        callback(false);
    });

    server.listen(port);
}

function watchExerciseDirectory() {
    watch.watchTree(exerciseInDir, function(f, curr, prev) {
        if (typeof f == "object" && prev === null && curr === null) {
            // Finished walking the tree
        } else if (prev === null) {
            console.log("  [exercise-sync] …publish new exercise file");
            copyOrLog(f);
        } else if (curr.nlink === 0) {
            console.log("  [exercise-sync] …unpublish removed exercise file");
            removeOrLog(f);
        } else {
            console.log("  [exercise-sync] …update published exercise file");
            copyOrLog(f);
        }
    });
}

function unwatchExerciseDirectory() {
    watch.unwatchTree(exerciseInDir);
}

function targetFileFromSourceFile(sourceFile) {
    return path.join(exerciseOutDir, path.basename(sourceFile));
}

function copyOrLog(f) {
    try {
        fs.copySync(f, targetFileFromSourceFile(f));
    } catch (err) {
        console.error('  [exercise-sync] …failed: ' + err.message);
    }
}

function removeOrLog(f) {
    try {
        fs.removeSync(targetFileFromSourceFile(f));
    } catch (err) {
        console.error('  [exercise-sync] …failed: ' + err.message);
    }
}


// start checking after a small wait timeout
setTimeout(portIsBusy, initialWaitMs, gitbookPort, handlePortStatus);

// Ensure that we can capture the SIGINT even on windows:
// hat-tip to http://stackoverflow.com/a/14861513
if (process.platform === "win32") {
    var rl = require("readline").createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.on("SIGINT", function() {
        process.emit("SIGINT");
    });
}

// handle Ctrl-C / SIGINT
process.on("SIGINT", shutdownExerciseSyncing);
