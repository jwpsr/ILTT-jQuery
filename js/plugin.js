(function ($) {
    $.fn.animagic = function(options, func){
      var settings = $.extend({
         height: '374px',
         backgroundSize: '100%',
         backgroundPosition: 'top left',
         func: function(){} //calback placeholder
      });
       
      return this.each( function(){
          $(this).css() //do something
          
          settings.func.call(); //execute callback
      });
    };
})(jQuery);