(function ($) {
    $.fn.animagic = function(options, callback){
      var settings = $.extend({
         height: '0px',
         animateDuration: 2000,
         fadeDuration: 'slow',
         opacity: 0.2,
         func: function(){} //calback placeholder
      }, options);
       
      return this.each( function(){
          $(this).animate({height: settings.height}, {duration: settings.animateDuration})
            .fadeTo(settings.fadeDuration, settings.opacity)
            .queue(settings.func);
          
          if($.isFunction(callback)) {
              callback.call();  //execute callback
          }
      });
    };
})(jQuery);