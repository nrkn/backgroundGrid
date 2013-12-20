(function( $ ){
  $.fn.backgroundGrid = function( settings ){
    var options = $.extend( {},  $.fn.backgroundGrid.defaults, settings );
    
    var size = options.size;

    var canvas = document.createElement( 'canvas' );
    canvas.width = size.width;
    canvas.height = size.height;
    
    var context = canvas.getContext( '2d' );
    context.lineWidth = 1;
    
    var highlight = options.colors.highlight;
    var shadow = options.colors.shadow;
    
    function vertical( x, y, l, color ){
      drawLine( x + 0.5, y, x + 0.5, y + l, color );
    }
    
    function horizontal( x, y, l, color ){
      drawLine( x, y + 0.5, x + l, y + 0.5, color );
    }
    
    function drawLine( x1, y1, x2, y2, color ) {
      context.strokeStyle = color || context.strokeStyle;

      context.beginPath();
      context.moveTo( x1, y1 );
      context.lineTo( x2, y2 );
      context.stroke();
    }    
    
    function drawCross( x, y, size ){
      var w = size.width / 2 - 1;
      var h = size.height / 2 - 1;

      var x1 = x;
      var x2 = x + w;          
      var x3 = x + w + 1;
      var x4 = x + size.width - 1;
      
      var y1 = y;
      var y2 = y + h;
      var y3 = y + h + 1;
      var y4 = y + size.height - 1;
      
      horizontal( x1, y2, w + 1, shadow );
      vertical( x2, y1, h );
      horizontal( x3, y2, w );
      vertical( x2, y3, h );
      
      horizontal( x3, y3, w, highlight );
      vertical( x3, y3, h );
      horizontal( x1 + 1, y3, w - 1 )
      vertical( x3, y1 + 1, h - 1 );
    }
    
    horizontal( 0, size.height - 1, size.width, shadow );
    vertical( size.width - 1, 0, size.height );    
    
    horizontal( 0, 0, size.width - 1, highlight );
    vertical( 0, 0, size.height - 1 );
           
    for( var i = 0; i < options.subdivide; i++ ){          
      var colors = options.getDivisionColors( i );
      highlight = colors.highlight;
      shadow = colors.shadow;
      
      var into = Math.pow( 2, i );
      var intoSize = {
        width: size.width / into,
        height: size.height / into
      };
      for( var y = 0; y < into; y++ ){
        for( var x = 0; x < into; x++ ){
          drawCross( x * intoSize.width, y * intoSize.height, intoSize );
        }
      }
    }    
        
    return this.each( function(){
      this.style.backgroundImage = 'url(' + canvas.toDataURL() + ')';            
    });
  };
  
  $.fn.backgroundGrid.defaults = {
    size: {
      width: 64,
      height: 64
    },
    colors: {
      highlight: 'rgba( 255, 255, 255, 0.3 )',
      shadow: 'rgba( 0, 0, 0, 0.3 )'
    },
    subdivide: 3,
    getDivisionColors: function( division ){
      var opacity = 0.3 * Math.pow( 0.5, division + 1 );
      return {
        highlight: 'rgba( 255, 255, 255, ' + opacity + ' )',
        shadow: 'rgba( 0, 0, 0, ' + opacity + ' )'
      };
    }
  };
})( jQuery );