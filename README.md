# GeoExt3 workshop [![Build Status](https://travis-ci.org/geoext/geoext3-ws.svg?branch=master)](https://travis-ci.org/geoext/geoext3-ws)

Learn how to use GeoExt 3 in your ExtJS applications.

## Want to do the workshop?

This assumes that [Node.js](https://nodejs.org/en/) is installed:

* Download the latest workshop-contents from this URL:
  * https://github.com/geoext/geoext3-ws/archive/master.zip
* Extract the zip-archive into a directory of your choice.
* You should find the following files and directories in the
`geoext3-ws-master`-folder:
  * `LICENSE.md`
  * `package.json`
  * `README.md`
  * `src/`
* Install the dependencies of the workshop via `npm install`.
* Start the workshop server with `npm start`.
* Open `http://localhost:4000`.

## Preparation steps for OSGeo-Live v10.0

If you do not have Node.js installed (e.g. if you work on a fresh [OSGeo-Live v10.09(https://live.osgeo.org/)), you will need to install it. Here are some example commands you need to issue in a terminal to get everything the workshop depends upon.

First, let's install [`nvm` (Node Version Manager)](https://github.com/creationix/nvm) which we use to manage installations of Node.js.:

    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.1/install.sh | bash

Next, please close and reopen the terminal, so that the `nvm` script is available.

Afterwards issue the following in the terminal to install the lates v6.x Node.js and a matching `npm` utility:

    nvm install v6

You can now follow the instructions above.


## Example steps for a Linux-system

```bash
# Create a directory gx-ws …
mkdir -p ~/gx-ws
# … go there …
cd ~/gx-ws
# … grab the zip-archive …
wget https://github.com/geoext/geoext3-ws/archive/master.zip
# … unzip the archive …
unzip master.zip
# … change into the extracted folder
cd geoext3-ws-master
# … install dependencies via npm
npm install
# …tart the workshop server
npm start
```

## Developing instructions

For developing and enhancing the workshop.

### tl;dr

* Run `npm i && npm start` and visit `http://localhost:4000`
* Edit the markdown files in `src/`
* Edit exercise-files in `src/exercises/`

### Detailed version

* In the root directory of the repository
* run `npm install` … to install node dependencies (and those of gitbook, e.g. plugins)
* Afterwards you can use certain `npm` scripts:
  * `npm start` … starts a development server which builds the HTML version of the workshop and serves it at `http://localhost:4000`. Changes to any of the input files in `src` will be instantly visible in the generated HTML. Hit `Ctrl-C` to quit the development server. Changes to any files in the `src/exercises`-directory are published directly to `http://localhost:4000/exercises/`
  * `npm doc:build` … builds the HTML once and stores it at `build/geoext3-ws`
  * `npm doc:pdf` … builds the PDF once and stores it at `build/geoext3-ws.pdf`, requires that `calibre` is installed (see below).
  * `npm doc:epub` … builds the EPUB once and stores it at `build/geoext3-ws.epub`, requires that `calibre` is installed (see below).
  * `npm run build:all` … cleans from previous builds and creates HTML, PDF and EPUB versions of the workshop at `build`, requires that `calibre` is installed (see below).
  * `npm run archive` … does what `npm run build:all` does and creates an archive in zip-format in `build/`, requires that `zip` is installed.  

### Installing calibre

Certain scripts for creating a PDF or EPUB version need the `calibre` program; follow the [instructions on installing](http://calibre-ebook.com/download_linux) for your operating system.
