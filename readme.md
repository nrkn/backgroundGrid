#backgroundGrid

A jQuery plugin that generates a grid background for whatever element it's 
applied to.

##example
![text with grid background](http://nrkn.com/text.png)

##usage
```javascript
$( '.container' ).backgroundGrid();
```

or:

```javascript
$( '.container' ).backgroundGrid({
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
});
```

##license

MIT