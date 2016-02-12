# Configuration variants

This chapter looks at our possibilities to customize the appearance and behaviour of the map.

## Configuring aspects of OpenLayers

As you have seen, we have simply created an instance of `ol.Map` and passed it to the `GeoExt.component.Map`. If we configure the `ol.Map` differently, the changes should be reflected in the final application.

### Exercises

Change the following aspects of the OpenLayers map:

* Set a different map center
* Initially zoom to another region
* Add more layers to the map. Try the layers from these WMS capabilities for example:
  * http://ows.terrestris.de/osm/service?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetCapabilities
  * http://ows.terrestris.de/osm-gray/service?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetCapabilities
* Add another control. Try these, for example:
  * `ol.control.ScaleLine`
  * `ol.control.MousePosition`

## Configuring aspects of ExtJS

Change the following aspects of the extJS components:

* Use another layout for the viewport. Just remember that you probably need to change two places:
  * the `layout` config of the viewport
  * depending on the chosen layout, children (our map-component) may need new properties
* wrap the `GeoExt.component.Map` in a panel with a title.

## Configuring aspects of GeoExt

Of course you can also change aspects directly via GeoExt:

* Set the center of the map, but this time with GeoExt
* Add a layer with GeoExt
