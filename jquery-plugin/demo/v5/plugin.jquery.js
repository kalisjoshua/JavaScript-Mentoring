(function ($) {
  $.fn.ISMs = function (options) {                                      // define jQuery plugin on prototype (fn, a shortcut for prototype)
    var transition = {
          fade: function (behind, front, src) {
            behind.attr("src", src);                                    // change the image behind so the fade out of the front will reveal the new image
            front
              .fadeOut(200, function () {                               // fade out the front/previous image
                front.attr("src", src).show();                          // after, update the src of the front and show it for the next rotation
              });
          },

          slideDown  : slide.bind(null, [{top :  "100%"}, {top : 10}]), // setup predefined transition functions
          slideLeft  : slide.bind(null, [{left: "-100%"}, {left: 10}]),
          slideRight : slide.bind(null, [{left:  "100%"}, {left: 10}]),
          slideUp    : slide.bind(null, [{top : "-100%"}, {top : 10}])
        };

    function slide (pos, behind, front, src) {
      behind.attr("src", src);                                          // change the image behind so the fade out of the front will reveal the new image
      front
        .animate(pos[0], 200, function () {                             // slide out the front image
          front.attr("src", src).css(pos[1]);                           // after, update the src of the front and show it for the next rotation
        });
    }

    options = $.extend({}, $.fn.ISMs.defaults, options);                // make sure that there are values for all options (optimistically)

    return this                                                         // return the jQuery collection to not break chaining
      .each(function (indx, item) {                                     // create function scope for each plugin on a page
        /*
          These variables and functions need to be defined inside
          this each loop to localize them all to the (DOM/jQuery)
          element being iterated over so that each plugin item
          on a page can have its own life-cycle.
          */
        var counter   = 0,                                              // limit the number of rotations of the animation
            hovering  = false,                                          // indicator of user interaction
            behind    = $("<img />").addClass("img1"),                  // reference to DOM object that will be used for displaying the image
            front     = $("<img />").addClass("img2"),                  // reference to DOM object that will be used for displaying the image
            imgCount  = options.images.length,                          // local variable to length since it isn't going to change
            imgList   = options.images.slice(0),                        // copy of images list so that each jQuery object will have its own
            pending;                                                    // holds reference to pending timeout execution for clearing

        function animate (now) {                                        // factored out the animation logic from the 'nextImage' logic
          clearTimeout(pending);                                        // clear timeouts if there is one since this method will be used in different contexts

          if (!hovering && counter < options.limit * imgCount) {        // conditionally continue animation based on hover-state and number of rotations
            pending = setTimeout(function () {                          // create a composite function to do the actions of the animation
              nextImage();                                              // let the function do its job
              animate();                                                // continue the animation
            }, (now ? 1 : options.speed));
          }
        }

        function nextImage () {
          counter++;                                                    // increment the counter to stop the animation at some number of complete rotations of all images
          var src = options.folder + "/" + imgList[0];

          if (options.transition in transition) {                       // protect against an invalid transition value in options object
            transition[options.transition](behind, front, src);         // call the defined optional transition function
          } else {
            transition.fade(behind, front, src);                        // execute a fallback (default) transition function
          }
          
          imgList = imgList.slice(1).concat(imgList[0]);                // move the displayed image to the end of the list
        }

        animate(true);                                                  // immediately display the first image and delay all following

        $(item)
          .html([behind, front])                                        // add the image to the DOM so users can see it
          .on("mouseover mouseout", function (event) {
            hovering = !hovering;                                       // toggle the state of hovering
            animate();                                                  // either clear the next animation or start a new one based on the event
          });
      });                                                               // end of $.each
  };                                                                    // end of plugin definition

  $.fn.ISMs.defaults = {
    limit: 3,
    speed: 400,
    transition: "slideDown"
  };
}(jQuery));







// This should be in app.js but it is easier to have it in here for demo
// purposes, since the config will be changing over time.
$.fn.ready(function () {
  $(".ISMs.fast")
    .ISMs({
      "folder" : folder,
      "images" : images,
      "limit"  : 2,
      "speed"  : 500,
      "transition": "fade"
    });

  $(".ISMs.slow")
    .ISMs({
      "folder" : folder,
      "images" : images,
      "limit"  : 1,
      "speed"  : 1000
    });
});