$(function(){

    $(window).bind('scroll', function() {
        var $this =$(this),
            scrollTop =$(this).scrollTop();
        if (scrollTop > 400) {
            $("#back_top").show();
        } else $("#back_top").hide();
    });

    $('body').on('click touchend', '#back_top', function(event) {
        event.preventDefault();
        console.log($(this));
        $('body,html').animate({
            scrollTop: 0
        }, 400);
    });
})

$(window).resize(function() {
    initBodyContent();
});

function initBodyContent() {
    var h = $(window).height() - 235;
    $('main').css('min-height', h);
}