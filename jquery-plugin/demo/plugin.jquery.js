(function ($) {

  $.fn.ISMs = function (folder, images) {
    this.html($("<img />").attr("src", folder + "/" + images[0]));
  };
  
}(jQuery));