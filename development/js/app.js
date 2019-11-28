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
    const recipeList = document.querySelector('.recipe-panel');


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
            mainPanel.style.display = "flex";
            recipeList.style.display = "flex";
            return nameProfil.innerHTML;

        } else { // if the name doesn't exist
            nameProfil.innerHTML = defaultNameProfil;
            firstPanel.style.visibility = 'inline-block';
            mainPanel.style.display = "none";
            recipeList.style.display = "none";
            return nameProfil.innerHTML;
        }
    }

    nameProfil.addEventListener("click", function () { // when clicking on the name, the local Storage is cleared
        if (localStorage.getItem("savedName") != null) {
            localStorage.removeItem("savedName");
            location.reload();
        } else {
            firstPanel.style.display = 'block';
            location.reload();
            localStorage.clear();
        }

    });

    checkName();


    // add_recipe & add_plan widgets

    document.getElementById('add_recipe').addEventListener('click', function(){
    document.querySelector('.add_recipe_modal').style.display = 'flex';
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


// to show all the recipes (recipe panel)

// to fix when there will be new recipe (logic)

    const newRecipeButton = document.querySelector('fa-plus-square');
    newRecipeButton.addEventListener('click', function () {
        document.querySelector('.add_recipe_modal').style.display = 'flex';
    });

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
            const buttons = document.createElement('td');
            buttons.innerHTML = '<i class="fas fa-edit"></i><i class="far fa-trash-alt"></i>';

            recipeId.innerText = i + 1;
            recipeName.innerText = recipeKeys[i];
            recipeDescription.innerText = allRecipes[recipeKeys[i]]["description"];

            // edit button
            const editButton = document.querySelectorAll(".fa-edit");
            editButton.addEventListener('click', function () {
                // function for editing the recipes
                //
                //
                //

            });

            // delete button
            const deleteButton = document.querySelectorAll(".fa-trash-alt");
            deleteButton.addEventListener('click', function () {

                // function for deleting the recipes
                //
                //
                //

            });

            recipeRow.appendChild(recipeId);
            recipeRow.appendChild(recipeName);
            recipeRow.appendChild(recipeDescription);
            recipeRow.appendChild(recipeActions);
            recipeRow.appendChild(buttons);
            tableBody.appendChild(recipeRow)
        }
    }
});


