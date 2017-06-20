function init() {
    //easel dev

    //var stage = new createjs.Stage("demoCanvas");
    //var circle = new createjs.Shape();
    //circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
    //circle.x = 100;
    //circle.y = 100;
    //stage.addChild(circle);
    //stage.update();
    //
    ////Update stage will render next frame
    //createjs.Ticker.addEventListener("tick", handleTick);
    //
    //function handleTick() {
    //    //Circle will move 10 units to the right.
    //    circle.x += 10;
    //    //Will cause the circle to wrap back
    //    if (circle.x > stage.canvas.width) {
    //        circle.x = 0;
    //    }
    //    stage.update();
    //}

};

$(document).ready(function () {



        /* fix vertical when not overflow
         call fullscreenFix() if .fullscreen content changes */
        function fullscreenFix() {
            var h = $('body').height();
            $(".content-b").each(function (i) {
                if ($(this).innerHeight() > h) {
                    $(this).closest(".fullscreen").addClass("overflow");
                }
            });
        }

        function loopHome() {
            var $home = $('#home');
            var styles = [
                {
                    background: {
                        'background-color': '#B7E3E4',
                        'transition': 'all 1s cubic-bezier(0.645, 0.045, 0.355, 1)',
                    },
                    fontColor: {color: '#F03F35'}
                },
                {
                    background: {
                        'background-color': '#F0CF61',
                        'transition': 'all 1s cubic-bezier(0.645, 0.045, 0.355, 1)',
                    },
                    fontColor: {color: 'white'}
                },
                {
                    background: {
                        'background-color': '#FFEFE5',
                        'transition': 'all 1s cubic-bezier(0.645, 0.045, 0.355, 1)',
                    },
                    fontColor: {color: '#1FC8A9'}
                },
                {
                    background: {
                        'background-color': '#19AAD1',
                        'transition': 'all 1s cubic-bezier(0.645, 0.045, 0.355, 1)',
                    },
                    fontColor: {color: '#FFCC4C'}
                },
                {
                    background: {
                        'background-color': '#F4C7EE',
                        'transition': 'all 1s cubic-bezier(0.645, 0.045, 0.355, 1)',
                    },
                    fontColor: {color: '#008FD3'}
                },
            ];
            var p = $home.find('p');

            var count = 0;

            setInterval(function () {
                count === styles.length ? count = 0 : null;
                $home.css(styles[count].background);
                p.css(styles[count].fontColor);
                //console.log('cool', count, styles[count].background);
                count++;
            }, 3000);
        }


        loopHome();

        $(window).resize(fullscreenFix);
        fullscreenFix();

        function positionTopicsToSide() {
            var $span = $('.topic');
            $span.addClass('middleware');

            setTimeout(function () {
                $span.addClass('fixed-side');
                $span.addClass('white-box');
            });
        }

        function positionTopicsBack() {
            var $span = $('.topic');
            $span.removeClass('middleware');

            setTimeout(function () {
                $span.removeClass('white-box');
                $span.removeClass('fixed-side');
            });
        }

        $(window).scroll(function () {
            console.log('scrolling');
            if (window.pageYOffset > 400) {
                positionTopicsToSide();
            } else if (window.pageYOffset < 400) {
                positionTopicsBack();
            } else {
                positionTopicsBack();
            }
        });


        $('.link').on('click', function (e) {
            e.preventDefault();
            var hash = this.hash;
            //positionTopicsToSide();

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function () {
                window.location.hash = hash;
            });

        });


    }
);