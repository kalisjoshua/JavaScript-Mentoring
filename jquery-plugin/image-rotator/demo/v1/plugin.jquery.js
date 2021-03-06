(function ($) {
  $.fn.ISMs = function (folder, images, speed) {                        // define jQuery plugin on prototype (fn, a shortcut for prototype)

    return this                                                         // return the jQuery collection to not break chaining
      .each(function (indx, item) {                                     // create function scope for each plugin on a page
        /*
          These variables and functions need to be defined inside
          this each loop to localize them all to the (DOM/jQuery)
          element being iterated over so that each plugin item
          on a page can have its own life-cycle.
          */
        var img     = $("<img />"),                                     // reference to DOM object that will be used for displaying the image
            imgList = images.slice(0);                                  // copy of images list so that each jQuery object will have its own

        function nextImage (now) {
          img.attr("src", folder + "/" + imgList[0]);                   // swap out the the currently displayed image for the next one
          imgList = imgList.slice(1).concat(imgList[0]);                // move the displayed image to the end of the list
          setTimeout(nextImage, (now ? 1 : speed));                     // continue/start the animation and run infinitely
        }

        nextImage(true);                                                // immediately display the first image and delay all following

        $(item).html(img);                                              // add the image to the DOM so users can see it
      });                                                               // end of $.each
  };                                                                    // end of plugin definition
}(jQuery));







// This should be in app.js but it is easier to have it in here for demo
// purposes, since the config will be changing over time.
$.fn.ready(function () {
  $(".ISMs.fast").ISMs(folder, images, 500);
  $(".ISMs.slow").ISMs(folder, images, 1000);
});