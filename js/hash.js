var hashString = window.location.hash.toString();
if(hashString) {
    $("html, body").stop().animate({scrollTop: (($(hashString).offset().top) * 1) - 90}, 500, 'swing', function () {
        return true;
    });
}