
var tabs,
    oneKindSlider,
    //currentSliderItem = '#kind-1',
    fadeSliderContainer;

class FadeSlider{

  constructor(currentSliderItem = 'kind-1'){

    /**
     * current slider
     */
    this.currentSliderItem = currentSliderItem;
    this.paging(this.currentSliderItem);

    this.tabs        = document.getElementsByClassName("one-tab");
    this.kindSliders = document.getElementsByClassName("one-kind-slider");

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
   * Init slider function
   */
  init(){

    for(var i = 0; i < this.tabs.length; i++){

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

      });
      
    }

  }

}

fadeSlider = new FadeSlider();

window.addEventListener("DOMContentLoaded", fadeSlider.init() );









/*
function init(){

  









  for(var i = 0; i < tabs.length; i++){

    tabs[i].addEventListener("click", function(){



      addPaging(this.getAttribute("data-id"));
      

      




      // пересчитать количество слайдов в слайдере
      // var numSlides =  currentSlider.getElementsByClassName('one-slide');
      // if(numSlides.length > 0){
      //   paging(numSlides);
      // }

      // вывести пейджинг для текущего слайдера

      // сделать переход в слайдере по пейджингу

    });
  }

}

/**
 * 
 * @param {number slides in the slider} slides 
 */
// function paging(slides){
//   var span;
//   var pagesContainer = document.getElementById("paging");

//   this.slides = slides;

//   if(this.slides.length > 0){

//     //pagesContainer.innerHTML('');

//     for(var i = 0; i < slides.length; i++){
//       span = document.createElement('span');
//       pagesContainer.appendChild(span);
//      // pagesContainer.innerHTML(span);
//     }
//   }

//   //console.log(pagesContainer);
//   document.body.appendChild(pages);
// }


// function addPaging(id='#kind-1'){

//   console.log(id);


//   // Пейджинг
//   // var currentPageContainer = document.getElementById(this.getAttribute("data-id")).querySelector(".paging");

//   // if(currentPageContainer){
//   //   var pages = currentPageContainer.children;
//   //   if(pages.length > 0){
//   //     for(var j = 0; j < pages.length; j++){

//   //       //pages[j].classList.remove("active");

//   //       pages[j].addEventListener("click", function(){
//   //         // console.log(this);

//   //         this.classList.add("active");
//   //       });
//   //     }
//   //   }
//   // }
// }