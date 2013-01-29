# Version 2

In this version we extend the previous with added configuration properties to allow for better developer experience with control of speed of animation and an optional limit of the number of cycles.

1. Add an image to the plugin element in the DOM
2. Load the first image in the list as the source of that image
3. Cycle through all images in the list
4. Do these steps for all plugin elements on the page

1. When a user hovers over a plugin element, pause the animation
2. When a user moves the cursor off the element resume the animation

1. Require only one argument to be passed into the plugin as the options
2. Accept optional parameters for speed and cycle limit
3. When the cycle limit is reached stop the animation