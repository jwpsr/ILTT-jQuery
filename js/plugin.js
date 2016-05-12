(function ($) {
    $.fn.animagic = function(options){
      var settings = $.extend({
         height: '0px',
         animateDuration: 2000,
         fadeDuration: 'slow',
         opacity: 0.2,
         callback: function(){} //calback placeholder
      }, options);
       
      return this.each( function(){
          $(this).animate({height: settings.height}, {duration: settings.animateDuration})
            .fadeTo(settings.fadeDuration, settings.opacity)
            .queue(settings.callback);
          
          //settings.func.call(); //execute callback
      });
    };
})(jQuery);