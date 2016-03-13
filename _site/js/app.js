
$(document).ready(function() {
    console.log('cool loaded');
    $('#drape-button').on('click', function () {
        console.log('button pressed');
        $('.left').addClass('slide to-left');
        $('.right').addClass('slide to-right');
        setTimeout(function(){
            $('.left').hide();
            $('.right').hide();
        }, 2000);

    });
});
