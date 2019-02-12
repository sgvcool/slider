
var tabs,
    oneKindSlider,
    fadeSliderContainer;

class FadeSlider{

  constructor(currentSliderItem = 'kind-1'){

    /**
     * current slider
     */
    this.currentSliderItem = currentSliderItem;
    this.paging(this.currentSliderItem);

    this.pages = document.getElementById(this.currentSliderItem).querySelector(".paging").children;
  
    this.tabs        = document.getElementsByClassName("one-tab");
    this.kindSliders = document.getElementsByClassName("one-kind-slider");

    /**
     * get slides foe active slider
     */
    this.slides = document.getElementById(this.currentSliderItem).getElementsByClassName("one-slide");

    /**
     * rarr click duraction and move
     */
    this.item = 0;

    this.leftRarr   = document.getElementById("left");
    this.leftRarr.addEventListener("click", function(){
      this.duraction = 'left';
      fadeSlider.slideDuraction(this.duraction);
    });

    this.rightRarr  = document.getElementById("right");
    this.rightRarr.addEventListener("click", function(){
      this.duraction = 'right';
      fadeSlider.slideDuraction(this.duraction);
    });

    this.leftRarrClass  = 'active';
    this.rightRarrClass = 'no-active';
  }

  /**
   * remove active Tab
   */
  removeActiveTab(){
    for(var tab = 0; tab < this.tabs.length; tab++){
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
   * remove active slide
   */
  removeActiveSlides(sliderConteinerId){
    this.sliderConteinerId = sliderConteinerId;

    this.slides = document.getElementById(this.sliderConteinerId).getElementsByClassName("one-slide");
    for(var i = 0; i < this.slides.length; i++){
      this.slides[i].classList.remove("active");
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
             * add active slide and remove active difference
             */
            fadeSlider.removeActiveSlides(sliderItem);
            this.dataId = this.getAttribute("page-data-id");
            document.getElementById(this.dataId).classList.add("active");
            

            /**
             * add active for bullet
             */
            this.classList.add("active");
          });
        }
      }

    }
  }

  /**
   * click rarrs
   */
  slideDuraction(duraction){
    this.duraction = duraction;

    switch(this.duraction){
      case 'left':

        fadeSlider.item++;

        if( fadeSlider.item >= fadeSlider.slides.length){ 
          fadeSlider.item = (fadeSlider.slides.length -1);
        }

        if( fadeSlider.item < fadeSlider.slides.length){
          fadeSlider.setActiveSlide(fadeSlider.item, this.duraction);
        }
        break;

      case 'right':

        fadeSlider.item--;

        if( fadeSlider.item <= 0 ){ 
          fadeSlider.item = 0;
          fadeSlider.rightRarrClass = 'no-active';
        };

        fadeSlider.setActiveSlide(fadeSlider.item, this.duraction);
        break;
    }
  }

  /**
   * Set active slide by rarr click
   */
  setActiveSlide(index,duraction){
    if( (index >=0) && duraction){

      this.index      = index;
      this.duraction  = duraction;

      if(fadeSlider.slides.length > 0){
        
        for(var i = 1; i < fadeSlider.slides.length; i++){

          if( this.index < fadeSlider.slides.length){

            /**
             * add active slide
             */
            fadeSlider.removeActiveSlides(fadeSlider.currentSliderItem);
            fadeSlider.slides[fadeSlider.index].classList.add("active");

            /**
             * remove active for bullets in click to rarr
            */ 
            for(var j = 0; j < fadeSlider.pages.length; j++){
              fadeSlider.pages[j].classList.remove("active");
            }

            /** 
             * add active status for bullet with click to rarr
             */
            fadeSlider.pages[fadeSlider.index].classList.add("active");
        
          }
      
        }
        
      }

    }
  }

  /**
   * Init slider function
   */
  init(){

    for(var i = 0; i < this.tabs.length; i++){

      if( this.tabs[i].classList.contains('active')){

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
           * add paging for current slider
           */
          fadeSlider.paging(this.dataId);

          /**
           * sat current slider
           */
          fadeSlider.currentSliderItem = this.dataId;
          fadeSlider.slides = document.getElementById(this.dataId).getElementsByClassName("one-slide");

        });
      }
    }
  }

}

fadeSlider = new FadeSlider();
window.addEventListener("DOMContentLoaded", fadeSlider.init() );