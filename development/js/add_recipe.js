//New Recipe ADD JS
//add instructions to list
const add_inst_button = document.getElementById('add_instructions');
const text_instructions = document.getElementById('instructions');
const instructions_list = document.getElementById('instructions_list');
add_inst_button.addEventListener('click', function () {
    if (text_instructions.value === "") { alert("nie podałeś instrukcji") } else {
        var li = document.createElement("li");
        let text_value = text_instructions.value;
        li.innerHTML = text_value;
        instructions_list.appendChild(li);
        text_instructions.value = "";
    }
});
//add ingridients to list
const add_ingrid_button = document.getElementById('add_ingridients');
const text_ingridients = document.getElementById('ingridients');
const ingridients_list = document.getElementById('ingridients_list');
add_ingrid_button.addEventListener('click', function () {
    if (text_ingridients.value === "") { alert("nie podałeś składników") } else {
        var li_ing = document.createElement("li");
        let text_value_ing = text_ingridients.value;
        li_ing.innerHTML = text_value_ing;
        ingridients_list.appendChild(li_ing);
        text_ingridients.value = "";
    }
});
//save all
const saveRecipeButton = document.getElementById('exit_recipe_button');
const newRecipe = {
    localrecipeName: "",
    localrecipeDescription: "",
    instructions: [],
    ingridients: [],
};
function saveNewRecipeToLocalStorage(newObject) {
    let recipelocalStorage = [];
    if (localStorage.getItem("newRecipe") != null) {
        recipelocalStorage = JSON.parse(localStorage.getItem("newRecipe"));
        recipelocalStorage.push(newRecipe);
        localStorage.setItem("newRecipe", JSON.stringify(recipelocalStorage));
    }
    else {
        recipelocalStorage.push(newRecipe);
        localStorage.setItem("newRecipe", JSON.stringify(recipelocalStorage));
    }
    alert("Przepis został dodany do LocalStorage");
}
saveRecipeButton.addEventListener("click", function (e) {
    e.preventDefault();
    const recipeName = document.getElementById('recipe_name');
    const recipeDescription = document.getElementById('recipe_description');
    const ingridients_list = document.getElementById('ingridients_list');
    const instructions_list = document.getElementById('instructions_list');
    const selectList = document.querySelectorAll("select");
    const recipe_modal = document.querySelector('.add_recipe_modal');
    document.querySelector('.add_recipe_modal').style.display = 'none'
    for (let i = 0; i < selectList.length; i++) {
        var option = document.createElement("option");
        option.innerHTML = recipeName.value;
        selectList[i].appendChild(option);
    }
    newRecipe.localrecipeName = recipeName.value;
    newRecipe.localrecipeDescription = recipeDescription.value;
    newRecipe.instructions = ingridients_list;
    newRecipe.ingridients = ingridients_list;
    recipeName.value = "";
    recipeDescription.value = "";
    const nonValid = [];
    if (newRecipe.localrecipeName === "") {
        nonValid.push("nie podałeś nazwy przepisu");
    }
    else if (newRecipe.localrecipeDescription === "") {
        nonValid.push("nie podałeś opisu przepisu");
    }
    else if (instructions_list.innerHTML === "") {
        nonValid.push("nie dodałeś instrukcji do przepisu");
    }
    else if (ingridients_list.innerHTML === "") {
        nonValid.push("nie dodałeś składników do przepisu");
    }
    else {
        saveNewRecipeToLocalStorage(newRecipe);
    }
    if (nonValid.length > 0) {
        alert(nonValid);
    }
    instructions_list.innerHTML = '';
    ingridients_list.innerHTML = '';
});