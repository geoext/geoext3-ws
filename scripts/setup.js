var mkdirp = require('mkdirp');

mkdirp('src/_book', function (err) {
    if (err) {
        console.error('Could not create the folder "src/_book"', err);
    } else {
        console.log('Folder "src/_book" created');
    }
});
