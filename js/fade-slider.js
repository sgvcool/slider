class FadeSlider{

    constructor(currentSliderItem = 'kind1'){

        /**
         * current slider
         */
        this.currentSliderItem = currentSliderItem;
        this.paging(this.currentSliderItem);
        this.pages = document.getElementById(this.currentSliderItem).querySelector(".paging").children;

        this.tabs = document.getElementsByClassName("one-tab");
        this.kindSliders = document.getElementsByClassName("one-kind-slider");

        /**
         * rarr click duraction and move
         */
        this.item = 0;

        /**
         *  add moving animation
         **/
        this.bonusSlider = document.getElementById(this.currentSliderItem).querySelector(".bonus-slider-block").querySelector(".bonus-slider");
        this.items = this.bonusSlider.children;
        this.itemsNumber = this.items.length;

        this.itemWidth = this.items[0].offsetWidth; /* ширина 1 элемента в слайдере */


        this.slides = document.getElementsByClassName('one-slide');
        this.bonusSlider.style.width = parseInt(this.itemWidth * (this.itemsNumber + 1)) + 'px';
        this.bonusSlider.style.left = - (parseInt(this.itemWidth)) + 'px';
        for(var item = 0; item < this.slides.length; item++){
            this.slides[item].style.width = parseInt(this.itemWidth) + 'px';
        }

        /* click on rarrs */
        this.currentItem = 1;
        this.bounceEaseOut = this.makeEaseOut(this.bounce);

        this.prev = document.getElementById("left");
        this.prev.addEventListener("click", function(){
            fadeSlider.onClickPrev();
        });

        this.next  = document.getElementById("right");
        this.next.addEventListener("click", function(){
            fadeSlider.onClickNext();
        });

    }

    /**
     *  Choosen kind animation
     **/
    makeEaseOut(timing) {
        return function(timeFraction) {
            return 1 - timing(1 - timeFraction);
        }
    }
    bounce(timeFraction) {
        for (var a = 0, b = 1, result; 1; a += b, b /= 2) {
            if (timeFraction >= (7 - 4 * a) / 11) {
                return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
            }
        }
    }

    animate(options) {

        var start = performance.now();

        requestAnimationFrame(function animate(time) {
            // timeFraction от 0 до 1
            var timeFraction = (time - start) / options.duration;
            if (timeFraction > 1) timeFraction = 1;

            // текущее состояние анимации
            var progress = options.timing(timeFraction);

            options.draw(progress);

            if (timeFraction < 1) {
                requestAnimationFrame(animate);
            }

        });
    }

    /**
     * clicking prev. if current image is the first image, ul slide all the way to the last one
     * otherwise, it slide to the image on the left of current image.
     **/
    onClickPrev(){

        /**
         * from item we will go
         */
        fadeSlider.step(fadeSlider.currentItem);

        if (fadeSlider.currentItem == 1 ){
            fadeSlider.currentItem = fadeSlider.itemsNumber;
            fadeSlider.slideTo(fadeSlider.currentItem);
        }else{
            fadeSlider.currentItem = (fadeSlider.currentItem - 1);
            fadeSlider.slideTo(fadeSlider.currentItem);
        }
    }

    /**
     * clicking next. if current image is the last image, ul slide all the way to the first one
     * otherwise, it slide to the image on the right of current image.
     **/

    onClickNext(){

        /**
         * from item we will go
         */
        fadeSlider.step(fadeSlider.currentItem);

        if (fadeSlider.currentItem == fadeSlider.itemsNumber){
            fadeSlider.currentItem = 1;
            fadeSlider.slideTo(fadeSlider.currentItem);
        }else{
            fadeSlider.currentItem++;
            fadeSlider.slideTo(fadeSlider.currentItem);
        }
    }

    /**
     * step generate position
     */
    step(fromToGo){
        fadeSlider.fromToGo = fromToGo;
    }

    /**
     * slideTo is the function that actually does the movement.
     * it takes one variable--imageToGo as parameter. it's an int stands for the image will be displayed
     * By comparing imageToGo and currentImage, it can be decided which direction to move, left or right
     * left: direction = -1; right: direction = 1
     * so the new left position is the current postion plus/minus (number of imagesToGo * image width)
     * when the step function is finished, a callback function will be called to set current image to imageToGo
     **/
    slideTo(ToGo){
        fadeSlider.currentPosition = fadeSlider.currentItem * fadeSlider.itemWidth;
        this.options = {
            duration: 1000,
            timing: fadeSlider.bounceEaseOut,
            draw: function(progress) {
                //fadeSlider.bonusSlider.style.left = - (progress * 1045 + ( (fadeSlider.currentItem * fadeSlider.itemWidth) - fadeSlider.itemWidth) ) + 'px';
                /*console.log(fadeSlider.itemWidth, 'options');*/
                fadeSlider.bonusSlider.style.left = - (progress * fadeSlider.itemWidth + ( (fadeSlider.currentItem * fadeSlider.itemWidth) - fadeSlider.itemWidth) ) + 'px';
            }
        };
        fadeSlider.animate(this.options);

        /**
         * set active bullet
         */
        if(fadeSlider.pages.length > 0){
            for(var j = 0; j < fadeSlider.pages.length; j++){
                fadeSlider.pages[j].classList.remove("active");
            }
        }
        fadeSlider.pages[fadeSlider.currentItem - 1].classList.add("active");
    }

    /**
     * remove active Tab
     */
    removeActiveTab(){
        for(var tab = 0; tab < this.tabs.length; tab++){
            this.tabs[tab].classList.remove("super-active");
            this.tabs[tab].classList.remove("active");
        }
    }

    /**
     * remove active slider container
     */
    removeActiveSlider(){
        for(var oneKindBlock = 0; oneKindBlock < this.kindSliders.length; oneKindBlock++){
            this.kindSliders[oneKindBlock].classList.remove("active");
        }
    }

    /**
     * remove active bull page
     */
    removeActivePaging(pagingContainerId){
        this.pagingContainerId = pagingContainerId;
        this.pages = this.pagingContainerId.children;

        if(this.pages.length > 0){
            for(var j = 0; j < this.pages.length; j++){
                this.pages[j].classList.remove("active");
            }
        }
    }

    /**
     * Paging
     */
    paging(sliderItem){
        var currentPageContainer = document.getElementById(sliderItem).querySelector(".paging");

        if(currentPageContainer){

            this.pages = currentPageContainer.children;

            if(this.pages.length > 0){
                for(var j = 0; j < this.pages.length; j++){

                    this.pages[j].addEventListener("click", function(){

                        fadeSlider.removeActivePaging(currentPageContainer);

                        /**
                         * add active for bullet
                         */
                        this.classList.add("active");

                        /**
                         * moving slide
                         */
                        fadeSlider.currentItem = this.getAttribute("data-bulet");
                        fadeSlider.currentPosition = fadeSlider.currentItem * fadeSlider.itemWidth;

                        /**
                         * from item we will go
                         */
                        fadeSlider.step(fadeSlider.currentItem);
                        fadeSlider.slideTo(fadeSlider.currentItem);

                    });
                }
            }
        }
    }

    /**
     * Init slider function
     */
    init(){

        for(var i = 0; i < this.tabs.length; i++){

            if( this.tabs[i].classList.contains('active') || this.tabs[i].classList.contains('first-active')){

                this.tabs[i].addEventListener("click", function(){

                    /**
                     * add active tabs
                     */
                    fadeSlider.removeActiveTab();
                    this.classList.add("active");

                    /**
                     * add active slider Container
                     */
                    fadeSlider.removeActiveSlider();
                    this.dataId = this.getAttribute("data-id");

                    var currentSlider = document.getElementById(this.dataId);
                    currentSlider.classList.add("active");

                    /**
                     * set current slider
                     */
                    //console.log(fadeSlider.itemWidth);

                    fadeSlider.currentSliderItem = this.dataId;
                    fadeSlider.bonusSlider = document.getElementById(fadeSlider.currentSliderItem).querySelector(".bonus-slider-block").querySelector(".bonus-slider");
                    fadeSlider.items = fadeSlider.bonusSlider.children;
                    fadeSlider.itemsNumber = fadeSlider.items.length;
                    fadeSlider.currentItem = 1;

                    fadeSlider.bonusSlider.style.width = parseInt(fadeSlider.itemWidth * (fadeSlider.itemsNumber + 1)) + 'px';
                    fadeSlider.bonusSlider.style.left = - (parseInt(fadeSlider.itemWidth)) + 'px';
                    for(var item = 0; item < fadeSlider.items.length; item++){
                        fadeSlider.items[item].style.width = parseInt(fadeSlider.itemWidth) + 'px';
                    }

                    /**
                     * add paging for current slider
                     */
                    fadeSlider.paging(this.dataId);

                });
            }
        }
    }

}
