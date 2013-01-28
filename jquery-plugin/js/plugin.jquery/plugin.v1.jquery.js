(function ($) {
  $.fn.ISMs = function (folder, images, speed) {

    return this
      .each(function (indx, item) {
        var img     = $("<img />"),
            imgList = images.slice(0);

        function animate (now) {
          setTimeout(nextImage, (now ? 1 : speed));
        }

        function nextImage () {
          img.attr("src", folder + "/" + imgList[0]);
          imgList = imgList.slice(1).concat(imgList[0]);
          animate();
        }

        animate(true);

        $(item).html(img);
      });
  };
}(jQuery));

$.fn.ready(function () {
  $(".ISMs.fast").ISMs(folder, images, 400);
  $(".ISMs.slow").ISMs(folder, images, 4000);
});