
var slidesPerRow = 3;

var currentSlide = 0;


var slidesContainer = document.querySelector(".popular__cardcontainer");
var slides = slidesContainer.querySelectorAll(".popular__imagecard");



console.log(slides.length);

switchSlide(0);


function switchSlide(n){


    if(currentSlide + n + slidesPerRow > slides.length || currentSlide + n < 0){
        console.log("skipped, current slide was " + currentSlide + " and n was" + n);
        return;
    }

    currentSlide+=n;

    for(slide = 0; slide < slides.length; ++slide){

        if(slide >= currentSlide && slide < currentSlide + slidesPerRow)
        {
            slides[slide].style.display = "block";
        }
        else
        {
            slides[slide].style.display = "none";
        }
    }
}
