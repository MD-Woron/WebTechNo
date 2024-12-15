// Выбор города
const citySelect = document.getElementById('city-select');
const selectedCitySpan = document.getElementById('selected-city');
citySelect.addEventListener('change', () => {
    selectedCitySpan.textContent = citySelect.value;
});

// Поиск (пока просто выводим в консоль)
const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');
searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if(query){
        console.log("Поиск по запросу:", query);
    }
});

//слайдер напитков
const sliderTrack = document.getElementById('slider-track');
const nextButton = document.getElementById('next-slide');
const prevButton = document.getElementById('prev-slide');
const slides = document.querySelectorAll('.slide');

let slideIndex = 0;
const slideWidth = slides[0].offsetWidth;

sliderTrack.innerHTML += sliderTrack.innerHTML;
sliderTrack.innerHTML += sliderTrack.innerHTML;
const allSlides = document.querySelectorAll('.slide'); 

slideIndex = slides.length;
sliderTrack.style.transform = `translateX(-${slideIndex * slideWidth}px)`;

nextButton.addEventListener('click', () => {
    slideIndex++;
    sliderTrack.style.transition = 'transform 0.3s ease';
    sliderTrack.style.transform = `translateX(-${slideIndex * slideWidth}px)`;

    if (slideIndex >= allSlides.length - slides.length) {
        setTimeout(() => {
            sliderTrack.style.transition = 'none';
            slideIndex = slides.length; 
            sliderTrack.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
        }, 300); 
    }
});

prevButton.addEventListener('click', () => {
    slideIndex--;
    sliderTrack.style.transition = 'transform 0.3s ease';
    sliderTrack.style.transform = `translateX(-${slideIndex * slideWidth}px)`;

    if (slideIndex < slides.length) {
        setTimeout(() => {
            sliderTrack.style.transition = 'none'; 
            slideIndex = allSlides.length - 2 * slides.length; 
            sliderTrack.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
        }, 300); 
    }
});

// Корзина
const cartInfo = document.getElementById('cart-info');
const cartDropdown = document.getElementById('cart-dropdown');
const cartCount = document.getElementById('cart-count');
let cartItems = [];

function updateCartUI() {
    cartDropdown.innerHTML = '';
    if (cartItems.length === 0) {
        cartCount.textContent = '(0)';
        const emptyDiv = document.createElement('div');
        emptyDiv.classList.add('empty-cart');
        emptyDiv.textContent = 'В корзине пусто';
        cartDropdown.appendChild(emptyDiv);
    } else {
        cartCount.textContent = `(${cartItems.length})`;
        cartItems.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item');
            itemDiv.innerHTML = `
                <span>${item.name}</span>
                <button data-index="${index}">Удалить</button>
            `;
            cartDropdown.appendChild(itemDiv);
        });
    }
}

cartDropdown.addEventListener('click', (e) => {
    if (e.target.tagName.toLowerCase() === 'button') {
        const idx = e.target.getAttribute('data-index');
        cartItems.splice(idx, 1);
        updateCartUI();
    }
});

cartInfo.addEventListener('click', (e) => {
    if (cartItems.length > 0) {
        alert('Страница корзины: Здесь будут товары и кнопка "Оформить заказ"');
    }
});

updateCartUI();


// Модальное окно при клике на карточку
const productCards = document.querySelectorAll('.product-card');
const modalOverlay = document.getElementById('modal-overlay');
const modal = document.getElementById('modal');
const modalClose = document.getElementById('modal-close');
const modalImage = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalWeight = document.getElementById('modal-weight');
const modalDescription = document.getElementById('modal-description');
const modalPrice = document.getElementById('modal-price');
const addToCartBtn = document.getElementById('add-to-cart-btn');
const minusBtn = document.getElementById('minus-btn');
const plusBtn = document.getElementById('plus-btn');
const quantitySpan = document.getElementById('quantity');

let currentProduct = null;
let quantity = 1;

productCards.forEach(card => {
    card.addEventListener('click', () => {
        const name = card.getAttribute('data-name');
        const price = card.getAttribute('data-price');
        const image = card.getAttribute('data-image');
        const description = card.getAttribute('data-description');
        const weight = card.getAttribute('data-weight');

        currentProduct = { name, price, image, description, weight };
        quantity = 1;
        quantitySpan.textContent = quantity;

        modalImage.src = image;
        modalTitle.textContent = name;
        modalWeight.textContent = weight;
        modalDescription.textContent = description;
        modalPrice.textContent = price;

        modalOverlay.style.display = 'flex';
    });
});

modalClose.addEventListener('click', () => {
    modalOverlay.style.display = 'none';
});

minusBtn.addEventListener('click', () => {
    if (quantity > 1) {
        quantity--;
        quantitySpan.textContent = quantity;
    }
});

plusBtn.addEventListener('click', () => {
    quantity++;
    quantitySpan.textContent = quantity;
});

addToCartBtn.addEventListener('click', () => {
    if (currentProduct) {
        for (let i=0; i<quantity; i++) {
            cartItems.push({name: currentProduct.name, price: currentProduct.price});
        }
        updateCartUI();
        modalOverlay.style.display = 'none';
    }
});

// Закрытие модалки по клику вне её
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        modalOverlay.style.display = 'none';
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
anchor.addEventListener('click', function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
    });
});
});

//БЖУ

const productsData = {
    "klassicheskaya_shaurma": {
        name: "Классическая шаверма",
        weight: "300 г",
        description: "Куриное филе, огурец, томат, капуста китайская, свежая, лук красный, соус белый, лаваш бездрожжевой.",
        price: "290 ₽",
        proteins: 14, // Белки
        fats: 10,     // Жиры
        carbs: 25     // Углеводы
    },
    "firmennaya_shaurma": {
        name: "Фирменная шаверма",
        weight: "330 г",
        description: "Куриное филе, корнишоны, морковь по-корейски, томаты, капуста, соусы.",
        price: "330 ₽",
        proteins: 15,
        fats: 12,
        carbs: 27
    },
    "motsarella_shaurma": {
        name: "Моцарелла шаверма",
        weight: "320 г",
        description: "Куриное филе, томат, капуста китайская, лук красный, соус белый, сыр моцарелла, лаваш бездрожжевой.",
        price: "340 ₽",
        proteins: 16,
        fats: 14,
        carbs: 22
    },
    "barbecue_shaurma": {
        name: "Барбекю шаверма",
        weight: "350 г",
        description: "Куриное филе, бекон, картофель фри, огурец, томат, лук красный, капуста китайская, соус Барбекю.",
        price: "370 ₽",
        proteins: 17,
        fats: 18,
        carbs: 28
    },
    "mexican_shaurma": {
        name: "Мексиканская шаверма",
        weight: "300 г",
        description: "Куриное филе, огурец, томат, капуста китайская, свежая, лук красный, соус белый, лаваш бездрожжевой.",
        price: "290 ₽",
        proteins: 14,
        fats: 10,
        carbs: 25
    },
    "meat_shaurma": {
        name: "Мясная шаверма",
        weight: "330 г",
        description: "Куриное филе, корнишоны маринованные, морковь по-корейски, огурец, томат, капуста китайская, соусы.",
        price: "330 ₽",
        proteins: 15,
        fats: 12,
        carbs: 26
    },
    "cheese_shaurma": {
        name: "Столько сыра шаверма",
        weight: "320 г",
        description: "Куриное филе, томат, капуста китайская, лук красный, соус белый, сыр моцарелла, лаваш бездрожжевой.",
        price: "340 ₽",
        proteins: 16,
        fats: 14,
        carbs: 22
    },
    "zhnets_shaurma": {
        name: "Жнец шаверма",
        weight: "350 г",
        description: "Куриное филе, бекон, картофель фри, огурец, томат, лук красный, капуста китайская, соус Барбекю.",
        price: "370 ₽",
        proteins: 18,
        fats: 19,
        carbs: 29
    }
};



productCards.forEach(card => {
    card.addEventListener('click', () => {
        const productId = card.getAttribute('data-id'); // Получаем ID товара
        const product = productsData[productId]; // Достаем данные из объекта

        if (product) {
            modalImage.src = product.image;
            modalTitle.textContent = product.name;
            modalWeight.textContent = product.weight;
            modalDescription.textContent = product.description;
            modalPrice.textContent = product.price;

            // Заполняем БЖУ
            document.getElementById('modal-proteins').textContent = product.proteins;
            document.getElementById('modal-fats').textContent = product.fats;
            document.getElementById('modal-carbs').textContent = product.carbs;

            modalOverlay.style.display = 'flex';
        }
    });
});

