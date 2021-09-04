const menuBtn = document.querySelector('.menu-btn');
const closeBtn = document.querySelector('.close-menu');
const closeBlock = document.querySelector('.close-block');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const menu = document.querySelector('.header-menu_box');
const slider = document.querySelector('.slider');
const slides = Array.from(document.querySelectorAll('.slide'));

slider.style.width = `${slides.length * 100}%`

// Menu
menuBtn.addEventListener('click',()=>{
    menu.classList.add('active');
    closeBlock.style.display = `block`
})
closeBtn.addEventListener('click',()=>{
    menu.classList.remove('active');
    closeBlock.style.display = `none`   
})
closeBlock.addEventListener('click',()=>{
    menu.classList.remove('active'); 
    closeBlock.style.display = `none` 
})


// Slider
let ix = 0;
let slideWidth = slides[0].offsetWidth;

function Slide() {
    
    if (ix < 0) {
        ix = slides.length-1;
    }
    else if (ix > slides.length-1) {
        ix = 0;
    }
    
    slider.style.transform = `translateX(${ix * -slideWidth}px)`;
    
}
prevBtn.addEventListener('click',()=>{
    ix--;
    Slide();
})
nextBtn.addEventListener('click',()=>{
    ix++;
    Slide();
})


// AutoSlide
setInterval(()=>{
    ix++;
    if (ix < 0) {
        ix = slides.length-1;
    }
    else if (ix > slides.length-1) {
        ix = 0;
    }
    
    slider.style.transform = `translateX(${ix * -slideWidth}px)`;
},5000);

// Touch Slider
let isDragging = false,
    startPos = 0,
    currentTranslate = 0,
    prevTranslate = 0,
    currentIndex = 0,
    animationID = 0
    
    
    
slides.forEach((slide,index) => {
    
    
    
    // Mobile touch
    slide.addEventListener('touchstart', touchStart(index))
    slide.addEventListener('touchend', touchEnd)
    slide.addEventListener('touchmove', touchMove)
    
    // PC Drag
    slide.addEventListener('mousedown', touchStart(index))
    slide.addEventListener('mouseup', touchEnd)
    slide.addEventListener('mouseleave', touchEnd)
    slide.addEventListener('mousemove', touchMove)
    
    
});

/* window.oncontextmenu = function (event) { 
    event.preventDefault();
    event.stopPropagation();
    return false;
 } */


 function touchStart(index) {
    return function (event) {
        ix = index;
        startPos = getPositionX(event);
        isDragging = true;
        
        animationID = requestAnimationFrame(animation);
        slider.style.cursor = 'grabbing';
    }
}
function touchEnd() {
    isDragging = false;
    cancelAnimationFrame(animationID);
    slider.style.cursor = 'grab';
    
    const movedBy = currentTranslate - prevTranslate;
    
    if (movedBy < -100 && ix < slides.length-1) {
        ix++;
    }
     if (movedBy > 100 && ix > 0) {
        ix--;
    }
    
    setPositionByIndex();
}
function touchMove(event) {
    if (isDragging) {
      const currentPosition = getPositionX(event); 
      currentTranslate = prevTranslate + currentPosition - startPos; 
    }
    
    
}
function getPositionX(event) { 
    return event.type.includes('mouse') 
    ? event.pageX 
    : event.touches[0].clientX;
 }
 
 function animation() {
     
    setSliderPosition();
    if (isDragging) {
        requestAnimationFrame(animation);
    }
 }
 
 function setSliderPosition() {
    slider.style.transform = `translateX(${currentTranslate}px)`
 }
 
 function setPositionByIndex() { 
     currentTranslate = ix * -slideWidth;
     prevTranslate = currentTranslate;
     setSliderPosition()
  }
  
  
//   IMAGE SLIDER
const songs = ['Колесные экскаваторы JCB',' экскаваторы ERR','GPG экскаваторы'];
const imageslider2 = document.querySelector('.image-slider2');
const prevImg = document.querySelector('.prevImg');
const nextImg = document.querySelector('.nextImg');
const imgText = document.querySelector('.imadeSlider-text');
const listimages = Array.from(document.querySelectorAll('.list-image'));
let im = 0;
let ImgWidth = listimages[0].offsetWidth;

function ImageSlide() {
    
    if (im < 0) {
        im = listimages.length-1;
    }
    else if (im > listimages.length-1) {
        im = 0;
    }
    
    
    imgText.innerHTML = songs[im];
    imageslider2.style.transform = `translateX(${im * -ImgWidth}px)`;
    
}
prevImg.addEventListener('click',()=>{
    im--;
    ImageSlide();
})
nextImg.addEventListener('click',()=>{
    im++;
    ImageSlide();
})


// Scroll js

window.onscroll = function() {Scroll()};
var MenuBlock = document.querySelector(".header-menu_block");
var menuTel = document.querySelector(".menu-tel");
var sticky = MenuBlock.offsetTop;
function Scroll() {
  if (window.pageYOffset >= sticky) {
    MenuBlock.classList.add("sticky")
    menuTel.style.display = 'none';
  } else {
    MenuBlock.classList.remove("sticky");
    menuTel.style.display = 'flex';
  }
  
}


// Phone Mask
const $input = document.querySelector('[data-js="input"]')
$input.addEventListener('input', handleInput, false)

function handleInput (e) {
  e.target.value = phoneMask(e.target.value)
}

function phoneMask (phone) {
  return phone.replace(/\D/g, '')
    .replace(/^(\d)/, '($1')
    .replace(/^(\(\d{2})(\d)/, '$1) $2')
    .replace(/(\d{3})(\d{1,5})/, '$1-$2')
    .replace(/(-\d{4})\d+?$/, '$1');
}