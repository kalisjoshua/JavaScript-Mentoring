# Version 6

In this version we extend the previous by allowing the developer to pass in their own transition function as part of the config options or use the predefined transitions.

*v1*
1. Add an image to the plugin element in the DOM
2. Load the first image in the list as the source of that image
3. Cycle through all images in the list
4. Do these steps for all plugin elements on the page

*v2*
1. When a user hovers over a plugin element, pause the animation
2. When a user moves the cursor off the element resume the animation

*v3*
1. Require only one argument to be passed into the plugin as the options
2. Accept optional parameters for speed and cycle limit
3. When the cycle limit is reached stop the animation

*v4*
1. Add a single transition between images

*v5*
1. Add config option for identifying which transition method to use

*v6*
1. Allow developers to pass in a transition function