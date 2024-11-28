// Открытие модального окна
function openModal() {
    document.getElementById("modal").style.display = "block";
}

// Закрытие модального окна
function closeModal() {
    document.getElementById("modal").style.display = "none";
}

// Функция для обработки покупки
function buyItem() {
    const selectedIngredients = Array.from(document.querySelectorAll('input[name="ingredient"]:checked'))
        .map(checkbox => checkbox.value);
    alert("Вы выбрали: " + selectedIngredients.join(", ") + ". Покупка оформлена!");
    closeModal();
}

// Закрытие окна при клике вне модального окна
window.onclick = function(event) {
    const modal = document.getElementById("modal");
    if (event.target == modal) {
        closeModal();
    }
}
