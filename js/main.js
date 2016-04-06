//need to clean everything!!

//cookie storage for drape

function setCookie(cname, cvalue, exseconds) {
    var d = new Date();
    d.setTime(d.getTime() + (exseconds * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    var cookie = getCookie("clicked");
    if (cookie != "") {
        $('.drape-wrapper').hide();
    } else {
        //console.log('no cookie', cookie);
    }
}


//checkCookie();


//tabs


var tabLinks = new Array();
var contentDivs = new Array();


function init() {

    imagePreview();
    checkWindowSize();
    //if mobile dont initiate parallax and set keylayer_parallax position
    //relative or not fixed
    //and dont show drape
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        console.log('is mobile');
        $('.white-fade').hide();
        $('#no-parallax').show();
        $('.keyart_layer.parallax').css('position', 'absolute');
    } else {
        $('.drape-wrapper').show();
        $('#parallax').show();
        initiateParallax();
        console.log('not mobile');
    }
    initTabs();

}

function initTabs() {
    var tabs = $('#tabs').children();

    for (var i = 0; i < tabs.length; i++) {

        var tabLink = getButton(tabs[i]);
        var id = getHash(tabLink.getAttribute('href'));
        tabLinks[id] = tabLink;
        contentDivs[id] = document.getElementById(id);

    }


    var i = 0;


    for (var id in tabLinks) {

        tabLinks[id].onclick = showTab;
        tabLinks[id].onfocus = function () {
            this.blur()
        };
        if (i == 0) {
            var $contentDiv = $('#' + id);
            $(tabLinks[id]).addClass('selected') && $contentDiv.addClass('selected');
        }
        i++;
    }

    // Hide all content divs except the first
    var j = 0;

    for (var id in contentDivs) {
        if (j != 0) {
            $('#' + id).hide();
        }
        j++;
    }
}


function showTab() {
    var selectedId = getHash(this.getAttribute('href'));


    for (var id in contentDivs) {
        var $contentDiv = $('#' + id);

        if (id == selectedId) {
            $(tabLinks[id]).addClass('selected');
            $contentDiv.addClass('selected');
            $contentDiv.show();
        } else {
            $contentDiv.hide();
            $(tabLinks[id]).removeClass('selected');
            $contentDiv.removeClass('selected');
        }
    }

    // Stop the browser following the link

    initMasonry();
    return false;
}


function getButton(element) {
    return $(element).children()[0];
}


function getHash(url) {
    var hashPos = url.lastIndexOf('#');
    return url.substring(hashPos + 1);
}


//image preview

function imagePreview() {

    var $preview = $('#preview');
    var $window = $(window);


    $('.image-cover img').click(function () {
        if ($window.width() > 768) {
            var imgRef = this.getAttribute('src');
            var imgTag = $preview.find('img');
            imgTag.attr('src', imgRef);

            if (imgTag[0].width < imgTag[0].height) {
                imgTag.addClass('tall');
                imgTag.removeClass('wide');
            } else {
                imgTag.removeClass('tall');
                imgTag.addClass('wide');
            }

            $preview.show();
        }

    });

    $preview.click(function () {
        $preview.hide();
    });

}

function checkWindowSize() {
    $(window).resize(function () {
        imagePreview();
    });
};


//parallax

function runParallax() {
    //if is coming from mobile browser

    window.addEventListener("scroll", function (e) {
        var top = this.pageYOffset;
        var layers = document.getElementsByClassName("parallax");
        var layer, speed, yPos;
        for (var i = 0; i < layers.length; i++) {
            layer = layers[i];
            speed = layer.getAttribute('data-speed');
            yPos = -(top * speed / 100);
            layer.setAttribute('style', 'transform: translate3d(0px, ' + yPos + 'px, 0px)');
        }
    });
}


function initiateParallax() {
    runParallax();
}


function dropDrape() {
    $('.loader').fadeOut();
    $('.left').addClass('slide to-left');
    $('.right').addClass('slide to-right');
    $('.white-fade').fadeOut(2000, "linear");
    setTimeout(function () {
        $('.drape-wrapper').remove();
    }, 1500);
};

function initMasonry() {

    var $container = $('.tabContent');


    $container.imagesLoaded(function () {
        $container.masonry({
            itemSelector: '.post-box',
            columnWidth: '.post-box',
        });
    });


}

var interval = setInterval(function () {
    $('html').css({'overflow': 'hidden'});
    if (document.readyState === 'complete') {
        setTimeout(function () {
            //console.log('complete');
            dropDrape();
            $('html').css({'overflow': 'auto'});
            clearInterval(interval);
        }, 2000);

    }
    //console.log('not complete');
}, 100);

