//You need an anonymous function to wrap around your function to avoid conflict
(function($){

  //Attach this new method to jQuery
  $.fn.extend({ 
    
    //This is where you write your plugin's name
    contextAdaptive: function() {
      
      var emConvertor = $("#em").width()
      var windowWidth = $(window).width()/emConvertor;

      //Iterate over the current set of matched elements
      return this.each(function() {

        // specify some settings
        var maxWidth = 100,
            maxHeight = 70,
            emWidth = $(this).width()/emConvertor,
            emHeight = $(this).height()/emConvertor;

        // make sure we don't really care about heights or widths out of range.
        emWidth = emWidth > maxWidth ? maxWidth : emWidth; 
        emHeight = emHeight > maxHeight ? maxHeight : emHeight; 

        var width = {max:[],min:[]},
            height = {max:[],min:[]};

        var i = 1;
        while(i<=maxWidth) {
          if(i<=emWidth)
            width.min.push(i+'em')
          if(i>=emWidth)
            width.max.push(i+'em')

          // make sure our iterators are jumping correctly
          if(i < 5) i++;
          else if(i==5) i+=5;
          else if(i>=10) i+=10;
        }

        var i = 1;
        while(i<=maxHeight) {
          if(i<=emHeight)
            height.min.push(i+'em')
          if(i>=emHeight)
            height.max.push(i+'em')

          // make sure our iterators are jumping correctly
          if(i < 5) i++;
          else if(i==5) i+=5;
          else if(i>=10) i+=10;
        }

        var layout = [];

        // set landscape or portrait
        if(emWidth > emHeight)
          layout.push('landscape')
        else
          layout.push('portrait')

        // if it's within common widescreen, let's make it picture
        if(emWidth/emHeight <= 1.85 && emHeight/emWidth <= 1.85)
          layout.push('picture')

        // row has to be at least 4x as long as it's high
        if(emWidth/emHeight >= 4) {
          layout.push('row')

          // of the height is less than 4em (4 lines of text high) it's only good for one text row (good for detecting single line-spaces)
          if(emHeight <= 4 && emHeight >= 1) {
            layout.push('text-row')

            // if it's greater than 30em it's sufficient for a long row of text
            if(emWidth >= 30)
              layout.push('text-row-long')

            // otherwise you're limited to just a few words
            if(emWidth < 30)
              layout.push('text-row-short')
          }
        }

        // if the proportions are square or taller than square let's call it a column
        if(emWidth/emHeight <= 1)
          layout.push('column')

        // now let's set the attributes correctly
        $(this).attr({
          'layout':layout.join(' '),
          'min-width':width.min.join(' '),
          'max-width':width.max.join(' '),
          'min-height':height.min.join(' '),
          'max-height':height.max.join(' ')
        });
      })
    }
  });
    
//pass jQuery to the function, 
//So that we will able to use any valid Javascript variable name 
//to replace "$" SIGN. But, we'll stick to $ (I like dollar sign: ) )       
})(jQuery);