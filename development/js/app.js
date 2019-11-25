document.addEventListener("DOMContentLoaded", function() {

    const nameInput = document.querySelector('.name-input'); //input
    const readyButton = document.querySelector('.send'); // submit button
    const nameProfil = document.querySelector('.name'); // text to change to name
    const defaultNameProfil = nameProfil.innerHTML;
    const firstPanel = document.querySelector('.first-panel'); // panel z powitaniem
    const mainPanel = document.querySelector('.main-panel'); // panel główny


    // event na przycisk submit
    readyButton.addEventListener('click', function storeName() {

        let nameValue = nameInput.value; // wartość inputa (Imię)

        if (nameValue.length > 0) {
            localStorage.setItem("savedName", nameValue);
            return localStorage.savedName;

        } else if (nameValue.length === 0 && localStorage.getItem("savedName") != null) {
            return "Name exists or invalid name"
        }
    });

    //sprawdzanie czy imię już istnieje w bazie i zmiana imienia w nagłówku na to wpisane

    function checkName() {
        if (localStorage.getItem("savedName") != null) {
            nameProfil.innerHTML = localStorage.savedName;
            firstPanel.style.display = "none";
            mainPanel.style.display = "flex";

            return nameProfil.innerHTML;

        } else {
            nameProfil.innerHTML = defaultNameProfil;
            firstPanel.style.display = "flex";
            mainPanel.style.display = "none";

            return nameProfil.innerHTML;
        }
    }

    nameProfil.addEventListener("click", function () {
        if (localStorage.getItem("savedName") != null) {
            localStorage.removeItem("savedName");
            location.reload();
        } else {
            location.reload();
            localStorage.clear();
        }

    });

    checkName();

});