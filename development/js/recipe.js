document.addEventListener("DOMContentLoaded", function () {

    const nameProfil = document.querySelector('.name');
    const defaultNameProfil = nameProfil.innerHTML;
    const firstPanel = document.querySelector('.firstvisit_form');
    const recipePanel = document.querySelector('.recipe-panel');

    function checkName() {
        if (localStorage.getItem("savedName") != null) { // if the name exists
            nameProfil.innerHTML = localStorage.savedName;
            firstPanel.style.display = "none";
            recipePanel.style.display = "block";
            return nameProfil.innerHTML;

        } else { // if the name doesn't exist
            nameProfil.innerHTML = defaultNameProfil;
            firstPanel.style.visibility = 'inline-block';
            recipePanel.style.display = "none";
            return nameProfil.innerHTML;
        }
    }

    checkName();

    // Add recipe button
    const buttonAddRecipe = document.querySelector('.fa-plus-square');

    buttonAddRecipe.addEventListener('click', function(){
        document.querySelector('.add_recipe_modal').style.display = 'flex';
    });

    document.getElementById('exit_recipe_button').addEventListener('click', function () {
        document.querySelector('.add_recipe_modal').style.display = 'none'
    });

// to show all the recipes (recipe panel)

// DO UZUPEŁNIENIA JAK BĘDZIE NOWY PRZEPIS LOGIKA

    if (localStorage.getItem('recipes') !== undefined && localStorage.getItem('recipes') !== null) {

        const allRecipes = JSON.parse(localStorage.getItem('recipes'));     //localStorage for recipes - 'recipes'
        const recipeKeys = Object.keys(allRecipes);

        for (let i = 0; i < recipeKeys.length; i++) {
            const recipeRow = document.createElement('tr');
            const recipeId = document.createElement('td');
            const recipeName = document.createElement('td');
            const recipeDescription = document.createElement('td');
            const recipeActions = document.createElement('td');
            const buttons = document.createElement('td');
            const tableBody = document.querySelector('.table-content');

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

            // function for deleting the recipes

            // for (let i = 0; i < deleteButton.length; i++) {
            //     deleteButton[i].addEventListener('click', function () {
            //         // function for deleting the recipes
            //         const closestTr = this.closest('tr');
            //         const trCounter = tableBody.children.length;
            //         console.log(allId); // nope
            //         if (closestTr) {
            //             closestTr.parentElement.removeChild(closestTr);
            //         }
            //     });


            recipeRow.appendChild(recipeId);
            recipeRow.appendChild(recipeName);
            recipeRow.appendChild(recipeDescription);
            recipeRow.appendChild(recipeActions);
            recipeRow.appendChild(buttons);
            tableBody.appendChild(recipeRow)
        }
    }
});