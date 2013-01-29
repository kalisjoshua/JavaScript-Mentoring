(function ($) {
  $.fn.ISMs = function (options) {                              // define jQuery plugin on prototype (fn, a shortcut for prototype)

    $.extend(options, $.fn.ISMs.defaults);                       // make sure that there are values for all options (optimistically)

    return this                                                 // return the jQuery collection to not break chaining
      .each(function (indx, item) {                             // create function scope for each plugin on a page
        /*
          These variables and functions need to be defined inside
          this each loop to localize them all to the (DOM/jQuery)
          element being iterated over so that each plugin item
          on a page can have its own life-cycle.
          */
        var counter   = 0,                                      // limit the number of rotations of the animation
            hovering  = false,                                  // indicator of user interaction
            img       = $("<img />"),                           // reference to DOM object that will be used for displaying the image
            imgCount  = options.images.length,                  // local variable to length since it isn't going to change
            imgList   = options.images.slice(0),                // copy of images list so that each jQuery object will have its own
            pending;                                            // holds reference to pending timeout execution for clearing

        function animate (now) {                                // factored out the animation logic from the 'nextImage' logic
          clearTimeout(pending);                                // clear timeouts if there is one since this method will be used in different contexts

          if (!hovering && counter < options.limit * imgCount) {// conditionally continue animation based on hover-state and number of rotations
            pending = setTimeout(function () {                  // create a composite function to do the actions of the animation
              nextImage();                                      // let the function do its job
              animate();                                        // continue the animation
            }, (now ? 1 : options.speed));
          }
        }

        function nextImage (now) {
          counter++;                                            // increment the counter to stop the animation at some number of complete rotations of all images
          img.attr("src", options.folder + "/" + imgList[0]);   // swap out the the currently displayed image for the next one
          imgList = imgList.slice(1).concat(imgList[0]);        // move the displayed image to the end of the list
          // setTimeout(nextImage, (now ? 1 : speed));          // removed to better adhere to what the function is actually for
        }

        animate(true);                                          // immediately display the first image and delay all following

        $(item)
          .html(img)                                            // add the image to the DOM so users can see it
          .on("mouseover mouseout", function (event) {
            hovering = !hovering;                               // toggle the state of hovering
            animate();                                          // either clear the next animation or start a new one based on the event
          });
      });                                                       // end of $.each
  };                                                            // end of plugin definition

  $.fn.ISMs.defaults = {
    limit: 3,
    speed: 400
  };
}(jQuery));







// This should be in app.js but it is easier to have it in here for demo
// purposes, since the config will be changing over time.
$.fn.ready(function () {
  $(".ISMs.fast")
    .ISMs({
      "folder": folder,
      "images": images,
      "limit": 4,
      "speed": 100
    });

  $(".ISMs.slow")
    .ISMs({
      "folder": folder,
      "images": images,
      "limit": 1,
      "speed": 400
    });
});