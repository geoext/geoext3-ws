# Layer tree

Now that we have a map-component in an ExtJS layout, we naturally want to add more layers to the map. But when we have more than one layer in the OpenLayers map, we also may want to include some component to handle the individual visibility and the order of layers in the map. As OpenLayers does not provide a control to influence these properties, we have to create our own component.

GeoExt wants to helpo here by providing the necessary parts to create a Tree of the layers in the map-component.

Let's try to add a layer tree.
