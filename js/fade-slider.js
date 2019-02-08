window.addEventListener("DOMContentLoaded", init);

var tabs,
    oneKindSlider,
    fadeSliderContainer;


function init(){

  //adeSliderContainer = document.getElementById('fade-slider-container');



  tabs          = document.getElementsByClassName("one-tab");
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
      currentSlider = document.getElementById(this.getAttribute("data-id"));
      currentSlider.classList.add("active");

      // пересчитать количество слайдов в слайдере
      // вывести пейджинг для текущего слайдера
      // сделать переход в слайдере по пейджингу

    });
  }

}