/*
  Copyright (c) 2013 BBQLab, http://bbqlab.net
  
  Permission is hereby granted, free of charge, to any person obtaining
  a copy of this software and associated documentation files (the
  "Software"), to deal in the Software without restriction, including
  without limitation the rights to use, copy, modify, merge, publish,
  distribute, sublicense, and/or sell copies of the Software, and to
  permit persons to whom the Software is furnished to do so, subject to
  the following conditions:
  
  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.
  
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
  LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
  OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
  WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

;(function($){
    $.fn.extend({
        gridone: function(options) {
            this.defaultOptions = {
              'margin': 0
            };
            var settings = $.extend({}, this.defaultOptions, options);

            function set_sizes($this) {

                console.log("l'altezza della pagina e': " + doc_height);
                var doc_height = $(window).height();
                var doc_width = $('body').outerWidth();

                var offset = $this.offset();
                doc_width = doc_width - offset.left;
                
                $('.cell').mouseenter(function() {
                  $('.overlay', this).addClass('active');
                });

                $('.cell').mouseout(function() {
                  $('.overlay', this).removeClass('active');
                });
                
                var height_buf = 0;
                var last_row = false;
                $('.row').each(function(row_idx) {
                  var $row = $(this);
                  var width_buf = 0;

                  $('.cell', $row).each(function(index) {
                     var img_url = $('img', this).attr('src');
                     var height_factor = $(this).parent().data('height') / 12;
                     var width_factor = $(this).data('width') / 12;
                     var height = doc_height * height_factor - settings.margin/2;
                     var width = doc_width * width_factor - settings.margin/2;
                     var offset_y = height_buf + settings.margin/4;
                     var offset_x = width_buf + settings.margin/4;

                     width_buf += width + settings.margin/2;

                     var position = 'center';
                     if($(this).data('x') != undefined && $(this).data('y') != undefined){
                       position = $(this).data('x') + ' ' + $(this).data('y');
                     }

                     $(this).css({  'background-image': 'url("' + img_url + '")',
                                    'background-repeat': 'no-repeat'
                                  , 'background-size': 'cover'
                                  , 'background-position': position
                                  , width: width
                                  , height: height
                                  , top: offset_y
                                  , left: offset_x});

                  });

                  var height_factor = $row.data('height') / 12;
                  height_buf += doc_height * height_factor;
                  last_row = $row;
                });
            }

            var obj = this.each(function() {
                var $this = $(this);
                $('.row').after('<div style="clear:both"></div>');
                set_sizes($this);

                $('body').css('overflow','hidden');
                $(window).resize(function() {
                  set_sizes($this);
                });
            });

            return obj;
        }
    });
})(jQuery);
