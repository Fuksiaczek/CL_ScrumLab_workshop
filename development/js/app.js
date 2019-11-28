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
    console.log(mainPanel);
    const recipePanel = document.querySelector('.recipePanel');


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
            recipePanel.style.display = "block";
            return nameProfil.innerHTML;

        } else { // if the name doesn't exist
            nameProfil.innerHTML = defaultNameProfil;
            firstPanel.style.visibility = 'inline-block';
            mainPanel.style.display = "none";
            recipePanel.style.display = "none";
            return nameProfil.innerHTML;
        }
    }

    nameProfil.addEventListener("click", function () { // when clicking on the name, the local Storage is cleared
        if (localStorage.getItem("savedName") != null) {
            localStorage.removeItem("savedName");
            firstPanel.style.display = 'block';
            location.reload();
        } else {
            location.reload();
            localStorage.clear();
        }

    });

    checkName();


    // add_recipe & add_plan widgets

    // document.getElementById('add_recipe').addEventListener('click', function(){
    // document.querySelector('.OknaModalneDodawaniaPrzepisu').style.display = 'flex'
    // });

    document.getElementById('add_plan').addEventListener('click', function () {
        document.querySelector('.add_plan_modal').style.display = 'flex'
    });

    //closing add_new_plan window


    document.getElementById('exit_plan_button').addEventListener('click', function () {
        document.querySelector('.add_plan_modal').style.display = 'none'
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



// to show all the recipes (recipe panel)

    if (localStorage.getItem('recipes') !== undefined && localStorage.getItem('recipes') !== null) { // if recipes in localStorage exist

        const tableBody = document.querySelector('.table-content');
        const allRecipes = JSON.parse(localStorage.getItem('recipes'));     //localStorage for recipes - 'recipes'
        const recipeKeys = Object.keys(allRecipes);

        for (let i = 0; i < recipeKeys.length; i++) {
            const recipeRow = document.createElement('tr');
            const recipeId = document.createElement('td');
            const recipeName = document.createElement('td');
            const recipeDescription = document.createElement('td');
            const recipeActions = document.createElement('td');

            recipeId.innerText = i + 1;
            recipeName.innerText = recipeKeys[i];
            recipeDescription.innerText = allRecipes[recipeKeys[i]]["description"];

            // edit button
            const editButton = document.createElement("i");
            const editButtonClass = document.createAttribute("class");
            editButtonClass.value = "fas fa-edit";
            editButton.setAttributeNode(editButtonClass);

            // delete button
            const deleteButton = document.createElement("i");
            const deleteButtonClass = document.createAttribute("class");
            deleteButtonClass.value = "far fa-trash-alt";
            deleteButton.setAttributeNode(deleteButtonClass);

            deleteButton.addEventListener("click",function () {
                this.parentElement.parentElement.parentElement.removeChild(this.parentElement.parentElement);
            });

            editButton.addEventListener("click",function () {
                this.parentElement.querySelector("p").setAttribute("contenteditable","true");
            });

            recipeRow.appendChild(recipeId);
            recipeRow.appendChild(recipeName);
            recipeRow.appendChild(recipeDescription);
            recipeRow.appendChild(recipeActions);
            recipeRow.appendChild(editButton);
            recipeRow.appendChild(deleteButton);
            tableBody.appendChild(recipeRow);
        }

    }
});


