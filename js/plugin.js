(function ($) {
    $.fn.PLUGIN_NAME = function(options){
      var settings = $.extend({
         prop1: 'defaultValue', //property placeholder
         prop2: 'defaultValue',
         func: function(){} //calback placeholder
      });
       
      return this.each( function(){
          $(this).something //do something
          
          settings.func.call(); //execute callback
      });
    };
})(jQuery);