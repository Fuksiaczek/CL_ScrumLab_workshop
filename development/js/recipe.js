document.addEventListener("DOMContentLoaded", function ()
{
// main app view aside menu

    const $liList = document.querySelectorAll(".aside-menu li");

    for (let i = 0; i < $liList.length; i++) {
        $liList[i].querySelector("i").classList.remove("fas");
        $liList[i].querySelector("i").classList.remove("fa-chevron-right");
        $liList[i].querySelector("a").classList.remove("border-left");
    }
    $liList[1].querySelector("i").classList.add("fas");
    $liList[1].querySelector("i").classList.add("fa-chevron-right");
    $liList[1].querySelector("a").classList.add("border-left");

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

    // const $recipeName = document.getElementById('recipe-name');
    // const $recipeDescription = document.getElementById('recipe-description');
    //
    // const $recipeIngredientsText = document.getElementById('ingredients');
    // const $recipeIngredientsButton = document.getElementById('add-ingredients');
    // const $recipeIngredientsList = document.getElementById('ingredients-list');
    //
    // const $recipeInstructionsText = document.getElementById('instructions');
    // const $recipeInstructionsButton = document.getElementById('add-instructions');
    // const $recipeInstructionsList = document.getElementById('instructions-list');
    //
    // const $savingButton = document.getElementById('exit-recipe-button');
    const $allRecipesContainer = document.querySelector('.table-content');

    document.getElementById('add-recipe').addEventListener('click', function(){
        let addRecipe = true;
        localStorage.setItem("addRecipe", JSON.stringify(addRecipe));
    });


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
