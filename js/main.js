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
                        'background-color': '#7DE0E6',
                        'transition': 'all 1s cubic-bezier(0.645, 0.045, 0.355, 1)',
                    },
                    aColor: {color: '#FF2A93'},
                    pColor: {color: 'white'},
                    logoColor: {fill: '#FF2A93'}
                },
                {
                    background: {
                        'background-color': '#B7E3E4',
                        'transition': 'all 1s cubic-bezier(0.645, 0.045, 0.355, 1)',
                    },
                    aColor: {color: '#F03F35'},
                    pColor: {color: '#2d2d2d'},
                    logoColor: {fill: '#F03F35'}
                },
                {
                    background: {
                        'background-color': '#F0CF61',
                        'transition': 'all 1s cubic-bezier(0.645, 0.045, 0.355, 1)',
                    },
                    aColor: {color: 'white'},
                    pColor: {color: '#2d2d2d'},
                    logoColor: {fill: 'white'}
                },
                {
                    background: {
                        'background-color': '#FF8B8B',
                        'transition': 'all 1s cubic-bezier(0.645, 0.045, 0.355, 1)',
                    },
                    aColor: {color: '#CFFFFF'},
                    pColor: {color: 'white'},
                    logoColor: {fill: '#CFFFFF'}
                },
                {
                    background: {
                        'background-color': '#1B1D1C',
                        'transition': 'all 1s cubic-bezier(0.645, 0.045, 0.355, 1)',
                    },
                    aColor: {color: '#EA1821'},
                    pColor: {color: 'white'},
                    logoColor: {fill: '#EA1821'}
                },
                {
                    background: {
                        'background-color': '#19AAD1',
                        'transition': 'all 1s cubic-bezier(0.645, 0.045, 0.355, 1)',
                    },
                    aColor: {color: '#FFCC4C'},
                    pColor: {color: 'white'},
                    logoColor: {fill: '#FFCC4C'}
                },
                {
                    background: {
                        'background-color': 'white',
                        'transition': 'all 1s cubic-bezier(0.645, 0.045, 0.355, 1)',
                    },
                    aColor: {color: '#19AAD1'},
                    pColor: {color: '#2d2d2d'},
                    logoColor: {fill: '#19AAD1'}
                }

            ];
            var a = $home.find('a');
            var p = $home.find('p');
            var logo = $home.find('.rb-logo');

            var count = 0;

            function doSomething() {
                count === styles.length ? count = 0 : null;
                $home.css(styles[count].background);
                a.css(styles[count].aColor);
                p.css(styles[count].pColor);
                logo.css(styles[count].logoColor);

                count++;
            }

            doSomething();

            setInterval(doSomething, 3000);

            //setInterval(function () {
            //    count === styles.length ? count = 0 : null;
            //    $home.css(styles[count].background);
            //    a.css(styles[count].aColor);
            //    p.css(styles[count].pColor);
            //    logo.css(styles[count].logoColor);
            //
            //    count++;
            //}, 3000);


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