// main-app-view

const liList = document.querySelectorAll(".aside-menu li");

for (let i = 0; i < liList.length; i++) {

    liList[i].querySelector("a").addEventListener("click", function () {
        for (let j = 0; j < liList.length; j++) {
            liList[j].querySelector("i").classList.remove("fas");
            liList[j].querySelector("i").classList.remove("fa-chevron-right");
            liList[j].querySelector("a").classList.remove("border-left");
        }

        liList[i].querySelector("i").classList.add("fas");
        liList[i].querySelector("i").classList.add("fa-chevron-right");
        liList[i].querySelector("a").classList.add("border-left");
    });

}

// saving name

document.addEventListener("DOMContentLoaded", function () {

    const nameInput = document.querySelector('input[name="lastname"]');
    const readyButton = document.querySelector('#name_button');
    const nameProfil = document.querySelector('.name');
    const defaultNameProfil = nameProfil.innerHTML;
    const firstPanel = document.querySelector('.firstvisit_form');
    const mainPanel = document.querySelector('.main-panel');


    readyButton.addEventListener('click', function storeName() {

        let nameValue = nameInput.value; // wartość inputa (Imię)

        if (nameValue.length > 0) {
            localStorage.setItem("savedName", nameValue);
            return localStorage.savedName;

        } else if (nameValue.length === 0 && localStorage.getItem("savedName") != null) {
            return "Name exists or invalid name"
        }
    });

    function checkName() {
        if (localStorage.getItem("savedName") != null) { // if the name exists
            nameProfil.innerHTML = localStorage.savedName;
            firstPanel.style.display = "none";
            mainPanel.style.display = "block";

            return nameProfil.innerHTML;

        } else { // if the name doesn't exist
            nameProfil.innerHTML = defaultNameProfil;
            firstPanel.style.visibility = 'inline-block';
            mainPanel.style.display = "none";

            return nameProfil.innerHTML;
        }
    }

    nameProfil.addEventListener("click", function () { // when clicking on the name, the local Storage is cleared
        if (localStorage.getItem("savedName") != null) {
            localStorage.removeItem("savedName");
            location.reload();
        } else {
            location.reload();
            localStorage.clear();
        }

    });

    checkName();


    // add_recipe & add_plan widgets

    document.getElementById('add_recipe').addEventListener('click', function(){
    document.querySelector('.add_recipe_modal').style.display = 'flex'
    });

    document.getElementById('add_plan').addEventListener('click', function () {
        document.querySelector('.add_plan_modal').style.display = 'flex'
    });

    //closing add_new_plan and add_new_recipe window


    document.getElementById('exit_plan_button').addEventListener('click', function () {
        document.querySelector('.add_plan_modal').style.display = 'none'
    });

    document.getElementById('exit_recipe_button').addEventListener('click', function () {
        document.querySelector('.add_recipe_modal').style.display = 'none'
    });


    // closing the widgets notifications

    const exitFirst = document.querySelector(".exit-first");
    const exitSecond = document.querySelector(".exit-second");
    const exitThird = document.querySelector(".exit-third");

    function closeInfoOne() {
        exitFirst.addEventListener("click", function (e) {
            this.parentNode.classList.add('close');
        })
    }
    function closeInfoTwo() {
        exitSecond.addEventListener("click", function (e) {
            this.parentNode.classList.add('close');
        })
    }
    function closeInfoThree() {
        exitThird.addEventListener("click", function (e) {
            this.parentNode.classList.add('close');
        })
    }
    closeInfoOne();
    closeInfoTwo();
    closeInfoThree();

});

// new plan save

const savePlanButton = document.querySelector("#exit_plan_button"); //przycisk zapisz i zamknij

const newWeekPlan = {
    id: null,
    weekPlanName: "",
    weekPlanDescription: "",
    weekPlanByDay: [],
};


function saveNewWeekPlanToLocalStorage(newObject)
{
    let dataFromLocalStorage = [];

    if(localStorage.getItem("weekPlan") != null)
    {
        dataFromLocalStorage = JSON.parse(localStorage.getItem("weekPlan"));
        dataFromLocalStorage.push(newWeekPlan);

        localStorage.setItem("weekPlan", JSON.stringify(dataFromLocalStorage));
    }
    else
    {
        dataFromLocalStorage.push(newWeekPlan);

        localStorage.setItem("weekPlan", JSON.stringify(dataFromLocalStorage));
    }

    alert("Plan został dodany do LocalStorage");
}


savePlanButton.addEventListener("click", function (e)
{
    e.preventDefault();

    const planName = document.querySelector("#plan_name");
    const planDescription = document.querySelector("#plan_description");
    const weekNumber = document.querySelector("#week_number");

    const dishesList = document.querySelectorAll("option"); //lista wybranych opcji z tabeli z posiłkami

    const weekPlanArray = [];  //tablica zawierająca tablice dishArray
    const dailyDishesArray = [];  //tablica z posiłkami na dany dzień


    // for (let i = 0; i < dishesList.length; i+5)
    // {
    //     for (let j = i; j < 5; j++)
    //     {
    //         dailyDishesArray.push(dishesList[j])
    //     }
    //     weekPlanArray.push(dailyDishesArray);
    // }

    weekPlanArray.push(1); // do testów
    weekPlanArray.push(2); // do testów

    newWeekPlan.id = weekNumber.value;
    newWeekPlan.weekPlanName = planName.value;
    newWeekPlan.weekPlanDescription = planDescription.value;
    newWeekPlan.weekPlanByDay = weekPlanArray;

    const errors = [];

    if (newWeekPlan.id === null)
    {
        errors.push("nie podałeś numeru tygodnia");
    }
    else if (JSON.parse(localStorage.getItem("weekPlan")).id === newWeekPlan.id)
    {
        errors.push("plan na podany numer tygodnia już istnieje");
    }
    else if (weekPlanArray.length < 1)
    {
        errors.push("nie wybrałeś żadnych przepisów");
    }
    else if (newWeekPlan.weekPlanName === "")
    {
        errors.push("nie podałeś nazwy planu");
    }
    else if (newWeekPlan.weekPlanDescription === "")
    {
        errors.push("nie podałeś opisu do planu");
    }
    else
    {
        saveNewWeekPlanToLocalStorage(newWeekPlan);
    }

    if (errors.length > 0)
    {
        alert(errors);
    }



});


