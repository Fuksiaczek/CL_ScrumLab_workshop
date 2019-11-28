const firstPanel = document.querySelector('.firstvisit_form');
const recipePanel = document.querySelector('.recipe-panel');
const nameProfil = document.querySelector('.name');
const defaultNameProfil = nameProfil.innerHTML;

if(localStorage.savedName != null){
    nameProfil.innerHTML = localStorage.savedName;
    firstPanel.style.display = "none";
    recipePanel.style.display = "block";
} else {
    nameProfil.innerHTML = defaultNameProfil;
    firstPanel.style.visibility = 'inline-block';
    recipePanel.style.display = "none";
}

nameProfil.addEventListener("click", function () {
    if (localStorage.getItem("savedName") != null) {
        localStorage.removeItem("savedName");
        firstPanel.style.display = 'block';
        location.reload();
    } else {
        location.reload();
        localStorage.clear();
    }
});


// to show all the recipes (recipe panel)

// const na button i imię by się pokazywało zalogowanie


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
        tableBody.appendChild(recipeRow);
    }
}
