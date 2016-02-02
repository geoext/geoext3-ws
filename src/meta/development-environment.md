# Development environment

## Required software

In order to complete this workshop, you will need the following software:

* A text editor, for example [Atom](https://atom.io/) or some other editor in
  which you feel comfortable.
* A browser, to read the workshop instructions and open up the tasks you will
  have to accomplish
* [Node.JS](https://nodejs.org/en/), so that you can run the workshop examples.
  Node.js will also install `npm`, which we will use to install workshop
  dependencies and to serve the workshop slides as HTML. If you are on linux,
  we have made excellent experiences with [`nvm`](https://github.com/creationix/nvm#node-version-manager-)
  to install various versions of Node.js.

## Preparation steps

* Download the latest workshop-contens from this URL:
  * https://github.com/geoext/geoext3-ws/archive/master.zip
* Extract the zip-archive into a directory of your choice
* You should find the following files and directories in the
`geoext3-ws-master`-folder:
  * `LICENSE.md`
  * `package.json`
  * `README.md`
  * `src/`
* Install the dependencies of the workshop via `npm install`
* Here are some example steps for a Linux-system
  ```bash
  # create a directory gx-ws …
  mkdir -p ~/gx-ws
  # … go there …
  cd ~/gx-ws
  # … grab the zip-archive …
  wget https://github.com/geoext/geoext3-ws/archive/master.zip
  # … unzip the archive …
  unzip master.zip
  # … change into the extracted folder
  cd geoext3-ws-master
  # Install depoendencies via npm
  npm install
  ```

## Starting the workshop

* Issue the following command in the directory `geoext3-ws-master`
  from above:
  ```bash
  npm start
  ```
* This should give you an output like below:
  ```bash
  Live reload server started on port: 35729
  Press CTRL+C to quit ...

  info: loading book configuration....OK
  info: load plugin gitbook-plugin-image-captions ....OK
  info: load plugin gitbook-plugin-highlight ....OK
  info: load plugin gitbook-plugin-search ....OK
  info: load plugin gitbook-plugin-sharing ....OK
  info: load plugin gitbook-plugin-fontsettings ....OK
  info: load plugin gitbook-plugin-livereload ....OK
  info: >> 6 plugins loaded
  info: start generation with website generator
  info: clean website generatorOK
  info: generation is finished

  Starting server ...
  Serving book on http://localhost:4000
  ```
* If instead you see some error like below, the workshop is likely already
  running on your system or some other application is blocking the ports
  `35729` and `4000`:
  ```bash
  ... Uhoh. Got error listen EADDRINUSE :::35729 ...
  Error: listen EADDRINUSE :::35729
    at Object.exports._errnoException (util.js:870:11)
    at exports._exceptionWithHostPort (util.js:893:20)
    at Server._listen2 (net.js:1237:14)
    at listen (net.js:1273:10)
    at Server.listen (net.js:1369:5)
    at Server.listen (/home/jansen/.gitbook/versions/2.6.7/node_modules/tiny-lr/lib/server.js:164:15)
    at Promise.apply (/home/jansen/.gitbook/versions/2.6.7/node_modules/q/q.js:1078:26)
    at Promise.promise.promiseDispatch (/home/jansen/.gitbook/versions/2.6.7/node_modules/q/q.js:741:41)
    at /home/jansen/.gitbook/versions/2.6.7/node_modules/q/q.js:1304:14
    at flush (/home/jansen/.gitbook/versions/2.6.7/node_modules/q/q.js:108:17)

  You already have a server listening on 35729
  You should stop it and try again.
  ```
## Stopping the workshop

* Simply hit `Ctrl-C` in the terminal wher you started the workshop, e.g.
  `~/gx-ws/geoext3-ws-master`
