// carousel - start
const prevButtonEl = document.querySelector(".preview-slide-button");
const nextButtonEl = document.querySelector(".next-slide-button");
const liList = document.querySelectorAll(".carousel li");

console.log(prevButtonEl);
console.log(nextButtonEl);

const liArrayList = [];
for (let i = 0; i < liList.length; i++)
{
    liArrayList.push(liList[i]);
}
console.log(liArrayList);

let countSlide = 0;

for (let i = 0; i < liArrayList.length; i++)
{
    if (liArrayList[i].className === "visible")
    {
        countSlide = i;
    }
}

liArrayList[countSlide].classList.add("visible");

nextButtonEl.addEventListener("click", function ()
{
    console.log("click next");
    if(countSlide === liArrayList.length-1)
    {
        liArrayList[countSlide].classList.remove("visible");
        countSlide = 0;
        liArrayList[countSlide].classList.add("visible");
    }
    else if(0 < countSlide < liArrayList.length-1)
    {
        liArrayList[countSlide].classList.remove("visible");
        countSlide++;
        liArrayList[countSlide].classList.add("visible");
    }
});

prevButtonEl.addEventListener("click", function ()
{
    console.log("click prev");

    if(countSlide === 0)
    {
        liArrayList[countSlide].classList.remove("visible");
        countSlide = liArrayList.length-1;
        liArrayList[countSlide].classList.add("visible");
    }
    else if(liArrayList.length-1 >= countSlide > 0)
    {
        liArrayList[countSlide].classList.remove("visible");
        countSlide--;
        liArrayList[countSlide].classList.add("visible");
    }

});

// carousel - end
