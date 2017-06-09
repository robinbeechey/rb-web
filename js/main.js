$(document).ready(function () {
        /* fix vertical when not overflow
         call fullscreenFix() if .fullscreen content changes */
        function fullscreenFix() {
            var h = $('body').height();
            // set .fullscreen height
            $(".content-b").each(function (i) {
                if ($(this).innerHeight() > h) {
                    $(this).closest(".fullscreen").addClass("overflow");
                }
            });
        }

        function loopHome() {
            var $home = $('#home');
            var styles = [
                {background: {'background-color': '#B7E3E4', 'transition': 'all 1s cubic-bezier(0.645, 0.045, 0.355, 1)'}, fontColor: {color: '#F03F35'}},
                {background: {'background-color': '#F0CF61', 'transition': 'all 1s cubic-bezier(0.645, 0.045, 0.355, 1)'}, fontColor: {color: 'white'}},
                {background: {'background-color': '#FFEFE5', 'transition': 'all 1s cubic-bezier(0.645, 0.045, 0.355, 1)'}, fontColor: {color: '#1FC8A9'}},
                {background: {'background-color': '#19AAD1', 'transition': 'all 1s cubic-bezier(0.645, 0.045, 0.355, 1)'}, fontColor: {color: '#FFCC4C'}},
                {background: {'background-color': '#F4C7EE', 'transition': 'all 1s cubic-bezier(0.645, 0.045, 0.355, 1)'}, fontColor: {color: '#008FD3'}},
            ];
            var p = $home.find('p');

            for (var i = 0; i < styles.length; i++) {
                console.log('i', i);

                (function (i) {
                    setInterval(function () {
                        //var style = styles[Math.floor(Math.random() * styles.length)];
                        console.log(styles[i]);
                        $home.css(styles[i].background);
                        p.css(styles[i].fontColor);
                        //if (i === 5) {
                        //    i = 0;
                        //}
                    }, (i+1)*5000)
                })(i);
            }
        }


        loopHome();

        $(window).resize(fullscreenFix);
        fullscreenFix();

        /* resize background images */
        function backgroundResize() {
            var windowH = $(window).height();
            $(".background").each(function (i) {
                var path = $(this);
                // variables
                var contW = path.width();
                var contH = path.height();
                var imgW = path.attr("data-img-width");
                var imgH = path.attr("data-img-height");
                var ratio = imgW / imgH;
                // overflowing difference
                var diff = parseFloat(path.attr("data-diff"));
                diff = diff ? diff : 0;
                // remaining height to have fullscreen image only on parallax
                var remainingH = 0;
                if (path.hasClass("parallax")) {
                    var maxH = contH > windowH ? contH : windowH;
                    remainingH = windowH - contH;
                }
                // set img values depending on cont
                imgH = contH + remainingH + diff;
                imgW = imgH * ratio;
                // fix when too large
                if (contW > imgW) {
                    imgW = contW;
                    imgH = imgW / ratio;
                }
                //
                path.data("resized-imgW", imgW);
                path.data("resized-imgH", imgH);
                path.css("background-size", imgW + "px " + imgH + "px");
            });
        }

        $(window).resize(backgroundResize);
        $(window).focus(backgroundResize);
        backgroundResize();


        function positionTopicsToSide() {
            var $span = $('.topic');
            //setTimeout(function(){
            $span.addClass('middleware');
            //});


            setTimeout(function () {
                $span.addClass('fixed-side');
            });
        }

        function positionTopicsBack() {
            var $span = $('.topic');
            $span.removeClass('middleware');

            setTimeout(function () {
                $span.removeClass('fixed-side');
            });
        }

        $(window).scroll(function () {
            console.log('scrolling', window.pageYOffset);
            if (window.pageYOffset > 400) {
                positionTopicsToSide();
            } else if (window.pageYOffset < 400) {
                positionTopicsBack();
            } else {
                positionTopicsBack();
            }
        });

        window.window = window;

        $('.link').on('click', function (e) {
            e.preventDefault();
            var hash = this.hash;
            var $parent = $(this).parent();
            positionTopicsToSide();


            //setTimeout(function(){
            //    $parent.removeClass('fixed');
            //    $parent.removeClass('middleware');
            //}, 1000);


            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function () {

                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        });


    }
);