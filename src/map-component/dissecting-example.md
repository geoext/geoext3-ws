# Dissecting the example

Let's look at the parts of the HTML page.

## The HTML skeleton

The HTML of the page looks as follows:

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Exercise | GeoExt Workshop</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/extjs/6.0.0/classic/theme-triton/resources/theme-triton-all.css" type="text/css">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/extjs/6.0.0/ext-all.js" type="text/javascript"></script>
        <link rel="stylesheet" href="./lib/ol/ol.css" type="text/css">
        <script src="./lib/ol/ol.js" type="text/javascript"></script>
        <script src="https://geoext.github.io/geoext3/master/GeoExt.js" type="text/javascript"></script>
    </head>
    <body>
        <script>
        </script>
    </body>
</html>
```

### HTML5 DOCTYPE

The first line in this document is the `doctype` of the HTML. By specifying…

```html
<!DOCTYPE html>
```

…we declare that the HTML file shall be handled as an [HTML5 document](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5). We recommend the usage of this doctype to force browsers into fixed rules of rendering the page. This eventually also reduces inconsistencies of the behaviour of the page in various browsers.

### Declaration of the character set

In order to tell the browser that we have encoded our file as UTF-8, we add a `<meta>`-tag to the `<head>` of the document:

```html
<head>
    <meta charset="utf-8">
</head>
```

This way we can be relatively sure that all the characters we enter into the document (e.g. German umlauts like `ä`, `ö` or `ü`; or `Улаанбаатар`) are correctly displayed when viewing the site.

### CSS and JavaScript resources

Also in the `<head>` of the document we load external JavaScript and CSS files, so we can use our needed libraries later.

```html
<head>
    <link rel="stylesheet" href="URL-or-relative-path-to-file" type="text/css">
    <script src="URL-or-relative-path-to-file" type="text/javascript"></script>
</head>
```

For this workshop it will be enough to always include the full builds of the library; and to always load them in the `<head>`. This technique allows us to basically forget about these resources for the course of the workshop. For a production website you would probably load the files in a different manor, and you would rather not load the versions of the libraries which contain everything. The creation of specific versions of the base libraries that only include what your application actually needs, is way beyond the scope of this workshop.

### `<script>`-tag in the `<body>`

Our body of the HTML file is really, really, *really* minimalistic:

```html
<body>
    <script>
    </script>
</body>
```

We only include one `<script>`-tag that will contain all the JavaScript that we need to create our map. The contents of this tag will be interpreted as JavaScript, and the code will be run as soon as the browser sees it.

## JavaScript code for the map

All our code to create the full screen map lives in the `<script>`-tag in the HTML `<body>`.

Let's go through all the lines in there.

### A variable named `map`

The first line in the example reads:

```js
var map;
```

This creates a global variable named map, which (at this point) has the value `undefined`. We will later store our instance of the `ol.Map` in that variable. We have made it global to allow for easier debugging (e.g. in the developer tools of your browser). For the workshop it is OK to create a lot of global variables for stuff you want to examine later on; in production sites it [usually frowned upon](http://programmers.stackexchange.com/a/277283).

### Passing a function to `Ext.onReady`

The next line reads:

```js
Ext.onReady(function(){
    // some other lines we do not care about now
});
```

These lines pass an anonymous (e.g. unnamed) function to the method `Ext.onReady`. This method will execute the passed function as soon as the Document is ready, e.g. External resources have loaded and the DOM (Document Object Model) of the page is ready to be manipulated.

behind the curtains, when we create instances of Some Ext classes, they will eventually need to modify the DOM. In order to run into problems when such changes happen to early (remember, all code in the `<script>` tag is executed as soon as it is being read), we wrap the real code to actually create ExtJS components into a function. We then simply tell ExtJS to delay the real work to a later time, when everything is ready.

Let's have a look now at the parts inside this function.

### Creating an `ol.Map`

First we want to create an instance of an `ol.Map`:

```js
map = new ol.Map({
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat( [106.92, 47.92] ),
        zoom: 12
    })
});
```

These lines create an OpenLayers map, and configure it with a view that is centered on Ulan Bator and that has one layer showing pre-rendered tiles from the [OpenStreetMap project](http://www.openstreetmap.org/).

You should already be slightly familiar with OpenLayers and can basically use any map that works without GeoExt.

Since we did not write `var map = …`, the assignment will happen to the global variable map, that we declared in the first line of the `script`-tag. You can easily debug the OpenLayers map this way.

### Creating a `GeoExt.component.Map`

Next we use the method `Ext.create` with two arguments: the name of the class to create, and a configuration object with properties for the instance.

```js
var mapComponent = Ext.create('GeoExt.component.Map', {
    map: map
});
```

In plain English this line could read

> Please create an instance of the class `GeoExt.component.Map` and ensure that it is configured with the OpenLayers map I have stored in the variable `map`. Once you have done that, please store this instance in a variable `mapComponent`.

After these lines have executed, we now have two variables, one holding the plain OpenLayers map (`map`), and one that is named `mapComponent` which contains an instance of a GeoExt class; and this instance knows about the OpenLayers map.

### Creating a `Ext.Viewport`

The final for lines in the block read:

```js
var vp = Ext.create('Ext.container.Viewport', {
    layout: 'fit',
    items: mapComponent
});
```

Here again we use `Ext.create` to build an instance of a class, this time of the `Ext.container.Viewport` class. From the ExtJS API docs:

> A specialized container representing the viewable application area (the browser viewport).
>
> The Viewport renders itself to the document body, and automatically sizes itself to the size of the browser viewport and manages window resizing. There may only be one Viewport created in a page.

([source](http://docs.sencha.com/extjs/6.0/6.0.0-classic/#!/api/Ext.container.Viewport))

This viewport will be as big as the browser viewport. All it's children (configured via the `items`-key) will be layed out according to the [`fit`-layout](http://docs.sencha.com/extjs/6.0/6.0.0-classic/#!/api/Ext.layout.container.Fit). This layout ensures that the child component (in our case the `mapComponent`) will be as big as the viewport itself.

Try to resize your browser window and see that the viewport (and the containing map component) always fill out the full area of the browser window.

## Next steps

Let's look at various [variants to configure](configuration-variants.md) the three parts of our map.
