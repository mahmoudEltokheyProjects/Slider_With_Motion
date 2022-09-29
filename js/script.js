    /* ++++++ container ++++++ */
const slideContainer = document.querySelector('.container');
    /* ++++++ slides container ++++++ */
const slide = document.querySelector('.slides');
    /* +++++++++ next arrow +++++++++ */
const nextBtn = document.getElementById('next-btn');
    /* +++++++++ prev arrow +++++++++ */
const prevBtn = document.getElementById('prev-btn');
    /* +++++++++ slider delay ++++++++ */
const interval = 3000;
    /* +++++++++ All Slides +++++++++ */
let slides = document.querySelectorAll('.slide');
    /* +++++++++ slide index +++++++++ */
let index = 1;
let slideId;
/* "cloneNode" :  creates a copy of a node with it's descendants , and returns the clone */
// ----------- Take "Copy or Clone" From "First Slide" of "Slider" -----------
const firstClone = slides[0].cloneNode(true);
// ----------- Take Copy From "Last Slide" of "Slider" -----------
const lastClone = slides[slides.length - 1].cloneNode(true);
// ----------- Give id to "First Slide" of "Slider" -----------
firstClone.id = 'first-clone';
lastClone.id = 'last-clone';
// ------------- append the "firstClone" to the "end" of "slider container" --------------
slide.append(firstClone);
// ------------- prepend the "lastClone" to the "start" of "slider container" --------------
slide.prepend(lastClone);
// ------------- Get "Slide Width" -------------------
const slideWidth = slides[index].clientWidth;
// ------------- "Translate" the "Slider" on "x-axis" -------------
// "slide_width" في اتجاه الشمال بمقدار يساوي x هيتحرك علي محور 
slide.style.transform = `translateX(${-slideWidth * index}px)`;

console.log(slides);
// ++++++++++++++++++++ "Start Slider" +++++++++++++++++++
const startSlide = () => {
  slideId = setInterval(() => {
    // **** moveToNextSlide() Function ****
    moveToNextSlide();
  }, interval);
};
/* ==================================== "getSlides" Function ==================================== */
const getSlides = () => document.querySelectorAll('.slide');
// +++++++++++++++++++ When "Slider" Move +++++++++++++++++++++
slide.addEventListener('transitionend', () => {
    /* +++++++++ Get All Slides +++++++++ */
  slides = getSlides();
    // if the "current slide" is the "first slide"
  if (slides[index].id === firstClone.id) 
  {
    // Stop "Smooth Transition"
    slide.style.transition = 'none';
    index = 1;
    // "slide_width" في اتجاه الشمال بمقدار يساوي x هيتحرك علي محور 
    slide.style.transform = `translateX(${-slideWidth * index}px)`;
  }
  // if the "current slide" is the "last slide"
  if (slides[index].id === lastClone.id) 
  {
    // Stop "Smooth Transition"
    slide.style.transition = 'none';
    // index of "slide" = index of "last slide"     
    index = slides.length - 2;
    // "slide_width" في اتجاه الشمال بمقدار يساوي x هيتحرك علي محور 
    slide.style.transform = `translateX(${-slideWidth * index}px)`;
  }
});
/* ==================================== "moveToNextSlide" Function ==================================== */
const moveToNextSlide = () => 
{
    /* +++++++++ Get All Slides +++++++++ */
    slides = getSlides();
    // when reach the "end copy slide" of slider , exit from function
    if (index >= slides.length - 1) return;
    /* increase "index" each " interval = 3000 milli_second"  */
    index++;
    // make "Smooth Transition"
    slide.style.transition = '.7s ease-out';
    // ++++++++++++ Move Slider on "X-axis" ++++++++++++
    // "slide_width" في اتجاه الشمال بمقدار يساوي x هيتحرك علي محور 
    slide.style.transform = `translateX(${-slideWidth * index}px)`;
};
/* ==================================== "moveToPrevSlide" Function ==================================== */
const moveToPreviousSlide = () => 
{
    // when reach the "start copy slide" of slider , exit from function
    if (index <= 0) return;
    index--;
    slide.style.transition = '.7s ease-out';
    slide.style.transform = `translateX(${-slideWidth * index}px)`;
};
/* +++++++++++++ When "Enter" Mouse To "Slider" : [Stop] Slider +++++++++++++++ */
slideContainer.addEventListener('mouseenter', () => 
{
    // Stop Slider From Working : 'Pause' "SetTimeOut()"
    clearInterval(slideId);
});
/* +++++++++++++ When "Leave" Mouse From "Slider" : [Start] Slider +++++++++++++ */
slideContainer.addEventListener('mouseleave', startSlide);
// ++++++++++++++ When Click on "Next Button" of "Slider" ++++++++++++++
nextBtn.addEventListener('click', moveToNextSlide);
// ++++++++++++++ When Click on "Previous Button" of "Slider" ++++++++++++++
prevBtn.addEventListener('click', moveToPreviousSlide);
/* ++++++++++++++ Call "startSlide()" Function ++++++++++++++ */
startSlide();