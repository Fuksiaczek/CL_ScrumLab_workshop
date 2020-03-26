document.addEventListener("DOMContentLoaded", function ()
{

// main app view aside menu

    const $liList = document.querySelectorAll(".aside-menu li");

    for (let i = 0; i < $liList.length; i++) {

        $liList[i].querySelector("a").addEventListener("mouseenter", function () {
            for (let j = 0; j < $liList.length; j++) {
                $liList[j].querySelector("i").classList.remove("fas");
                $liList[j].querySelector("i").classList.remove("fa-chevron-right");
                $liList[j].querySelector("a").classList.remove("border-left");
            }

            $liList[i].querySelector("i").classList.add("fas");
            $liList[i].querySelector("i").classList.add("fa-chevron-right");
            $liList[i].querySelector("a").classList.add("border-left");
        });

    }

// saving name

    const $nameOutput = document.querySelector('.name');
    const $loginIcon =  document.querySelector(".login-name").querySelector("i");
    const $defaultNameOutput = "Imię";
    const $firstVisitPanel = document.querySelector('.first-visit');
    const $mainPanel = document.querySelector('.main-panel');

    const $logOutDiv = document.querySelector(".login-name").querySelector(".logout");
    const $resetLocalStorage = document.querySelector(".login-name").querySelector(".reset-localStorage");

    let currentNameIndex;

    function checkingCurrentIndex() {
        if(localStorage.getItem("currentNameIndex") !== null)
        {
            currentNameIndex = localStorage.getItem("currentNameIndex");
        }
        else
        {
            currentNameIndex = -1
        }
    }

    function setName() {

        checkingCurrentIndex();
        if(currentNameIndex >= 0)
        {
            let users = JSON.parse(localStorage.getItem("users"));
            $nameOutput.innerText = users[currentNameIndex].name;
        }
    }

    setName();

    $logOutDiv.style.display = "none";
    $resetLocalStorage.style.display = "none";

    $nameOutput.addEventListener("mouseenter", function ()
    {
        $resetLocalStorage.style.display = "block";
    });
    $nameOutput.addEventListener("mouseleave", function ()
    {
        $resetLocalStorage.style.display = "none";
    });

    console.log(localStorage);

    const $recipeName = document.getElementById('recipe-name');
    const $recipeDescription = document.getElementById('recipe-description');

    const $recipeIngredientsText = document.getElementById('ingredients');
    const $recipeIngredientsButton = document.getElementById('add-ingredients');
    const $recipeIngredientsList = document.getElementById('ingredients-list');

    const $recipeInstructionsText = document.getElementById('instructions');
    const $recipeInstructionsButton = document.getElementById('add-instructions');
    const $recipeInstructionsList = document.getElementById('instructions-list');

    const $savingButton = document.getElementById('exit-recipe-button');
    const $allRecipesContainer = document.querySelector('.table-content');

    const newRecipe = {
        id: "",
        title: "",
        description: "",
        instructions: [],
        ingredients: []
    };

    // ingredients

    function addIngredient(ingredient) {
        const $newLi = document.createElement("li");
        const $buttons = `<button type="button" class="edit-ingredients">
                            <i class="far fa-edit"></i></i> 
                          </button>
                          <button type="button" class="remove-ingredients">
                            <i class="far fa-trash-alt"></i> 
                          </button>`;

        $newLi.innerHTML = ingredient + $buttons;

        $recipeIngredientsList.appendChild($newLi);
    }

    $recipeIngredientsButton.addEventListener("click", function (e) {
        e.preventDefault();

        newRecipe.ingredients.push($recipeIngredientsText.value);
        addIngredient($recipeIngredientsText.value);

        $recipeIngredientsText.value = "";
    });

    //add instructions

    function addInstruction(instruction) {
        const $newLi = document.createElement("li");
        const $buttons = `<button type="button" class="edit-instructions">
                            <i class="far fa-edit"></i>
                          </button>
                          <button type="button" class="remove-instructions">
                            <i class="far fa-trash-alt"></i>
                          </button>`;

        $newLi.innerHTML = instruction + $buttons;
        $recipeInstructionsList.appendChild($newLi);
    }

    $recipeInstructionsButton.addEventListener("click", function (e) {
        e.preventDefault();

        newRecipe.instructions.push($recipeInstructionsText.value);
        addInstruction($recipeInstructionsText.value);

        $recipeInstructionsText.value = "";
    });

    // saving the recipes

    $savingButton.addEventListener("click", function (e) {
        e.preventDefault();

        newRecipe.title = $recipeName.value;
        newRecipe.description = $recipeDescription.value;
        saveRecipeToLocalStorage(newRecipe);

        document.querySelector('.add-recipe-modal').style.display = 'none';
        $mainPanel.style.display = 'flex';

    });

    $savingButton.addEventListener("click", renderAllRecipes);

// saving recipes to local storage

    function saveRecipeToLocalStorage(newObject)
    {
        let users = JSON.parse(localStorage.getItem("users"));

        if (users[currentNameIndex].recipes !== undefined) {
            newObject.id = users[currentNameIndex].recipes.length + 1;
            users[currentNameIndex].recipes.push(newObject);
        }
        else
        {
            newObject.id = 1;
            users[currentNameIndex].recipes = [];
            users[currentNameIndex].recipes.push(newObject);
        }

        localStorage.setItem("users", JSON.stringify(users));

        alert("Przepis zapisany");
        clearNewRecipeData();
    }

    function clearNewRecipeData()
    {
        $recipeInstructionsList.innerHTML = '';
        $recipeIngredientsList.innerHTML = '';
        $recipeDescription.value = '';
        $recipeName.value = '';
    }

// recipe list

    function renderAllRecipes()
    {
        let users = JSON.parse(localStorage.getItem("users"));

        if(parseInt(currentNameIndex) !== -1 && typeof(users[currentNameIndex].recipes) !== "undefined")
        {
            const $allRecipes = users[currentNameIndex].recipes;

            $allRecipes.forEach(function (singleRecipe)
            {
                const $recipeRow = document.createElement('tr');

                const $recipeId = document.createElement('td');
                $recipeId.innerText = singleRecipe.id;

                const $recipeName = document.createElement('td');
                $recipeName.innerText = singleRecipe.title;

                const $recipeDescription = document.createElement('td');
                $recipeDescription.innerText = singleRecipe.description;

                const $buttons = document.createElement('td');
                $buttons.innerHTML = `<i class="fas fa-edit"></i>
                                  <i class="far fa-trash-alt"></i>`;

                $allRecipesContainer.appendChild($recipeRow);
                $recipeRow.appendChild($recipeId);
                $recipeRow.appendChild($recipeName);
                $recipeRow.appendChild($recipeDescription);
                $recipeRow.appendChild($buttons);

            });
        }

    }

    renderAllRecipes();

// cleaning the localStorage

    $nameOutput.addEventListener("click", function () { // when clicking on the name, the local Storage is cleared

        if (localStorage.getItem("savedName") != null)
        {
            localStorage.removeItem("savedName");
            location.reload();
            localStorage.clear();
            $allRecipesContainer.innerHTML = "";
        }
        else
        {
            //$firstVisitPanel.style.display = 'block';
            location.reload();
            localStorage.clear();
        }
    });

// "log out"

    $loginIcon.addEventListener("click", function () { // when clicking on the name, the local Storage is cleared

        $nameOutput.innerHTML = $defaultNameOutput;

        for (let i = 0; i < $liList.length; i++)
        {
            $liList[i].querySelector("i").classList.remove("fas");
            $liList[i].querySelector("i").classList.remove("fa-chevron-right");
            $liList[i].querySelector("a").classList.remove("border-left");
        }
        $liList[0].querySelector("i").classList.add("fas");
        $liList[0].querySelector("i").classList.add("fa-chevron-right");
        $liList[0].querySelector("a").classList.add("border-left");
    });

});
