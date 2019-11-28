/**
 * animated pictures
 */

var pathTheme = '/wp-content/themes/TP/';

for(var j=1; j<=10; j++){
    pathJSON = pathTheme+'svg/bonus-types/'+j+'/kind'+j+'.json';

    var animation = bodymovin.loadAnimation({
        container: document.getElementById('kind'+j+'-icon'), // Required
        path: pathJSON, // Required
        renderer: 'svg', // Required
        loop: true, // Optional
        autoplay: true
    });
}

var animatedIcons = document.getElementsByClassName('animated-icon');

for(var k=0; k<animatedIcons.length; k++){
    pathJSON = pathTheme+'svg/bonus-types/'+(k+1)+'/kind'+(k+1)+'.json';

    var animation = bodymovin.loadAnimation({
        container: animatedIcons[k], // Required
        path: pathJSON, // Required
        renderer: 'svg', // Required
        loop: true, // Optional
        autoplay: true
    });
}

var buttons = document.getElementsByClassName('button-icon');
for(var n=0; n<buttons.length; n++){
    var animation = bodymovin.loadAnimation({
        container: buttons[n], // Required
        path: pathTheme+'svg/bonus-types/button/button.json', // Required
        renderer: 'svg', // Required
        loop: true, // Optional
        autoplay: true
    });
}

/**
 * added hash in link
 * @type {string}
 */
var hash = window.location.hash.toString();
if(hash){

    var kindPost,
        kind,
        tabDataId;

    var posKind = hash.indexOf('-') + 1;
    if(posKind){
        kind = hash.substr(posKind,hash.length);
        kindPost = 'bonus';
    }

    document.addEventListener("DOMContentLoaded", ready);

    function ready(){

        if( kindPost != 'bonus' ){
            $(hash).addClass('wide');
        }else{

            $('.one-tab').removeClass('super-active');
            $('.fade-slider-tabs .one-tab').each(function() {
                tabDataId = $(this).attr("data-id");
                if( tabDataId == kind ){
                    $(this).addClass('active');
                }
            });

            /**
             * add active slider container
             */
            $('.one-kind-slider').removeClass('active');
            $('.one-kind-slider').addClass('no-active');
            $('#'+kind).addClass('active');

            /**
             * add active slide
             */

            $('#'+kind).find('.bonus-slider').find('.one-slide').removeClass('active');
            fadeSlider.currentSliderItem = kind;

            fadeSlider.bonusSlider = document.getElementById(fadeSlider.currentSliderItem).querySelector(".bonus-slider-block").querySelector(".bonus-slider");
            fadeSlider.items = fadeSlider.bonusSlider.children;

            fadeSlider.itemWidth = document.getElementById(kind).querySelector(".bonus-slider-block").offsetWidth;
            for(var item = 0; item < fadeSlider.items.length; item++){
                fadeSlider.items[item].style.width = parseInt(fadeSlider.itemWidth) + 'px';
            }

            fadeSlider.itemsNumber = fadeSlider.items.length;
            fadeSlider.bonusSlider.style.width = parseInt(fadeSlider.itemWidth * (fadeSlider.itemsNumber + 1)) + 'px';

            fadeSlider.currentItem = $(hash).attr("data-bulet");
            fadeSlider.bonusSlider.style.left = - (parseInt( fadeSlider.currentItem * fadeSlider.itemWidth )) + 'px';

            fadeSlider.removeActivePaging(document.getElementById(fadeSlider.currentSliderItem).querySelector(".paging") );
            $('#'+kind+ ' .paging span[data-bulet = "'+fadeSlider.currentItem+'"]').addClass("active");

        }
    }

    fadeSlider = new FadeSlider(kind);
}else{
    var activeSlider = document.getElementsByClassName("one-kind-slider active");
    for(var slider = 0; slider < activeSlider.length; slider++){
        var id = activeSlider[slider].getAttribute('id');
    }

    fadeSlider = new FadeSlider(id);
}

if(fadeSlider){
    window.addEventListener("DOMContentLoaded", fadeSlider.init());
}