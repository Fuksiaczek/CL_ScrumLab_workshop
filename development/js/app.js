// main-app-view

const liList = document.querySelectorAll(".aside-menu li");

for (let i = 0; i < liList.length; i++)
{



    liList[i].querySelector("a").addEventListener("click", function ()
    {
        for (let j = 0; j < liList.length ; j++) {
            liList[j].querySelector("i").classList.remove("fas");
            liList[j].querySelector("i").classList.remove("fa-chevron-right");
            liList[j].querySelector("a").classList.remove("border-left");
        }

        liList[i].querySelector("i").classList.add("fas");
        liList[i].querySelector("i").classList.add("fa-chevron-right");
        liList[i].querySelector("a").classList.add("border-left");


    });


}

