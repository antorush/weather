const swiper = new Swiper('.bessellers-goods', {
    // Optional parameters
    direction: 'horizontal',
    slidesPerView: 4,
    spaceBetween: 30,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints:{
        1035:{
          slidesPerView:3,
          spaceBetween:20,
        },
        720:{
          slidesPerView:2,
          spaceBetween:10,
           autoplay: {
              delay:4000,
              disableOnInteraction: false,
              },
        },
        320:{
          slidesPerView:1,
          spaceBetween:5,
          autoplay: {
            delay:4000,
            disableOnInteraction: false,
            },
        },
        128:{
          slidesPerView:1,
          spaceBetween:5,
          autoplay: {
            delay:4000,
            disableOnInteraction: false,
            },
        }
      }
  });

  ymaps.ready(init);
  function init(){
      // Создание карты.
      var myMap = new ymaps.Map("map", {
          // Координаты центра карты.
          // Порядок по умолчанию: «широта, долгота».
          // Чтобы не определять координаты центра карты вручную,
          // воспользуйтесь инструментом Определение координат.
          center: [59.938477, 30.321797],
          // Уровень масштабирования. Допустимые значения:
          // от 0 (весь мир) до 19.
          zoom: 14
      });
  }
  SmoothScroll({
    // Время скролла 400 = 0.4 секунды
    animationTime    : 1000,
    // Размер шага в пикселях 
    stepSize         : 100,

    // Дополнительные настройки:
    
    // Ускорение 
    accelerationDelta : 40,  
    // Максимальное ускорение
    accelerationMax   : 2,   

    // Поддержка клавиатуры
    keyboardSupport   : true,  
    // Шаг скролла стрелками на клавиатуре в пикселях
    arrowScroll       : 50,

    // Pulse (less tweakable)
    // ratio of "tail" to "acceleration"
    pulseAlgorithm   : true,
    pulseScale       : 4,
    pulseNormalize   : 1,

    // Поддержка тачпада
    touchpadSupport   : true,
})

const header=document.querySelector('.header');
const open=document.querySelector('.open');
const burger=document.querySelector('.burger-menu');
const links=document.querySelectorAll('.menu-list__link')
const body=document.querySelector('body')

burger.addEventListener('click', ()=>{
  header.classList.toggle('open');
  if(header.classList.contains('open','fixed')===true || header.classList.contains('open'))
  {
    body.classList.add('scroll-hidden');
  }
  else{
    body.classList.remove('scroll-hidden');
  }
})

links.forEach(link => {
  link.addEventListener('click', ()=> {
    link.classList.add('link--active');
  })
})


links.forEach(link => {
  link.addEventListener('click', ()=>{
    header.classList.remove('open');
    body.classList.remove('scroll-hidden');
  })
});


// Обработчик событий клика для кнопок на DOM
const btns=document.querySelectorAll('.btn');
btns.forEach(btn =>{
  btn.addEventListener('click', ()=>{
    btn.classList.add('btn--active');
  })
})


// Обработчик событий скрола для фиксированной шапки
const hero=document.querySelector('.hero');
const catalog=document.querySelector('.catalog__filter-block');

window.addEventListener('scroll', scrollTopMain())
function scrollTopMain(){
  let height=window.scrollY;
  if(height > header.clientHeight+200)
  {
    header.classList.add('fixed');
  }
  else{
    header.classList.remove('fixed');
  }

  return  scrollTopMain
  
}

const filterOpen=document.querySelector('.catalog-title-box__btn');
const filterBlock=document.querySelector('.filter-block__wrapper');
const filterClose=document.querySelector('.catalog-title-box__btn-close');
const activeclass = document.querySelectorAll('.filter-btn');
   for (var i = 0; i < activeclass.length; i++) {
    activeclass[i].addEventListener('click', activateClass);
   }
function activateClass(e) {
    for (var i = 0; i < activeclass.length; i++) {
      
        activeclass[i].classList.remove('filter-btn--active');
    }
    e.target.classList.add('filter-btn--active');
}

filterBlock.classList.add('filter-hidden');
if(filterOpen){
  filterOpen.addEventListener('click', ()=>{
  filterBlock.classList.remove('filter-hidden');
  filterOpen.style="display:none";
  filterClose.style="display:block";
  })
}
if(filterClose){
    filterClose.addEventListener('click', ()=>{
      filterBlock.classList.add('filter-hidden')
      filterOpen.style="display:inline-block";
      filterClose.style="display:none";
      activeclass.forEach(item =>{
        item.classList.remove('filter-btn--active');
      })
    })
}


const accordeonSlides = Array.from(document.querySelectorAll(".accordeon-slide")); // считываем все элементы аккордеона в массив

accordeonSlides.forEach((slide) => {
  slide.addEventListener("click", boxHandler); // при нажатии на бокс вызываем ф-ию boxHanlder
});

function boxHandler(e) {
  e.preventDefault(); // сбрасываем стандартное поведение
  let currentBox = e.target.closest(".accordeon-slide"); // определяем текущий бокс
  let currentContent = e.target.nextElementSibling; // находим скрытый контент
  currentBox.classList.toggle("accordeon-active"); // присваиваем ему активный класс
  if (currentBox.classList.contains("accordeon-active")) {
    // если класс активный ..
    currentContent.style.maxHeight = currentContent.scrollHeight + "px"; // открываем контент
  } else {
    // в противном случае
    currentContent.style.maxHeight = 0; // скрываем контент
  }
}












const CatalogItems=document.querySelectorAll('.catalog-grid__item');
const carts=document.querySelectorAll('.cart__wrapper');

const grid=document.querySelector('.catalog');

// Перебираем все заголовки табов
for (let item of CatalogItems) {

    // Вешаем на них click
    item.addEventListener('click', function() {

        // Добавляем всем main__content класс hidden, который скрывает содержимое!
        for (let element of carts) {
            element.classList.add('cart-hidden')
        }
        
        // Находим конкретный main__content, который соответствует нажатому заголовку табов
        // и удаляем у него класс hidden, чтобы показать содержимое!
        const content = document.querySelector('#' + item.dataset.name);
        content.classList.remove('cart-hidden')
        grid.classList.add('cart-hidden')
    })
}
