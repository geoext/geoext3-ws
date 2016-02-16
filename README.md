# GeoExt3 workshop [![Build Status](https://travis-ci.org/geoext/geoext3-ws.svg?branch=master)](https://travis-ci.org/geoext/geoext3-ws)

Learn how to use GeoExt 3 in your ExtJS applications…

## Developing instructions

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
