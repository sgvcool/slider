window.addEventListener("DOMContentLoaded", init);

var tabs,
    oneKindSlider,
    fadeSliderContainer;


function init(){

  //adeSliderContainer = document.getElementById('fade-slider-container');



  tabs        = document.getElementsByClassName("one-tab");
  kindSliders = document.getElementsByClassName("one-kind-slider");



  
  for(var i = 0; i < tabs.length; i++){

    tabs[i].addEventListener("click", function(){

      // удалить у всех табов клас active
      for(var tab = 0; tab < tabs.length; tab++){
        tabs[tab].classList.remove("active");
      }

      // удалить со всех блоков слайдеров
      for(var oneKindBlock = 0; oneKindBlock < kindSliders.length; oneKindBlock++){
        kindSliders[oneKindBlock].classList.remove("active");
      }
      
      // текущий таб сделать активным
      this.classList.add("active");

      // текущий блок слайдера сделать активным
      var currentSlider = document.getElementById(this.getAttribute("data-id"));
      currentSlider.classList.add("active");

      // пересчитать количество слайдов в слайдере
      var numSlides =  currentSlider.getElementsByClassName('one-slide');
      if(numSlides.length > 0){
        paging(numSlides);
      }

      // вывести пейджинг для текущего слайдера

      // сделать переход в слайдере по пейджингу

    });
  }

}

/**
 * 
 * @param {number slides in the slider} slides 
 */
function paging(slides){
  var span;
  var pagesContainer = document.getElementById("paging");

  this.slides = slides;

  if(this.slides.length > 0){

    //pagesContainer.innerHTML('');

    for(var i = 0; i < slides.length; i++){
      span = document.createElement('span');
      pagesContainer.appendChild(span);
     // pagesContainer.innerHTML(span);
    }
  }

  //console.log(pagesContainer);
  document.body.appendChild(pages);
}