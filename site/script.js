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
	    // Основное меню (Шаверма)
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
        description: "Куриное филе, перец халапеньо, кукуруза, соус сальса, томаты, китайская капуста, красный лук, сыр чеддер, бездрожжевой лаваш.",
        price: "290 ₽",
        proteins: 14,
        fats: 10,
        carbs: 25
    },
    "meat_shaurma": {
        name: "Мясная шаверма",
        weight: "330 г",
        description: "Говяжий стейк, грибы, соус терияки, маринованный огурец, томаты, рукола, белый соус, бездрожжевой лаваш.",
        price: "330 ₽",
        proteins: 15,
        fats: 12,
        carbs: 26
    },
    "cheese_shaurma": {
        name: "Столько сыра шаверма",
        weight: "320 г",
        description: "Куриное филе, сыр моцарелла, сыр пармезан, сыр дорблю, томаты, китайская капуста, сливочный соус, бездрожжевой лаваш.",
        price: "340 ₽",
        proteins: 16,
        fats: 14,
        carbs: 22
    },
    "zhnets_shaurma": {
        name: "Жнец шаверма",
        weight: "350 г",
        description: "Куриное филе, бекон, картофель фри, острый соус чили, томаты, лук фри, лист салата, соус ранч, бездрожжевой лаваш.",
        price: "370 ₽",
        proteins: 18,
        fats: 19,
        carbs: 29
    },
    // Шаверма авторская
    "originalnaya_shaurma": {
        name: "Оригинальная шаверма",
        weight: "300 г",
        description: "Куриное филе на гриле, свежий шпинат, маринованные огурцы, томаты черри, соус песто, сыр чеддер, бездрожжевой лаваш.",
        price: "290 ₽",
        proteins: 14, // Белки
        fats: 10,     // Жиры
        carbs: 25     // Углеводы
    },
    "ochen_originalnaya_shaurma": {
        name: "Очень оригинальная шаверма",
        weight: "330 г",
        description: "Индейка, авокадо, жареные баклажаны, кинза, томаты, йогуртовый соус с чесноком, бездрожжевой лаваш.",
        price: "330 ₽",
        proteins: 15,
        fats: 12,
        carbs: 27
    },
    "super_originalnaya_shaurma": {
        name: "Супер оригинальная шаверма",
        weight: "340 г",
        description: "Креветки, ананасы, перец болгарский, салат айсберг, сливочный сыр, соус терияки, бездрожжевой лаваш.",
        price: "340 ₽",
        proteins: 16,
        fats: 13,
        carbs: 23
    },
    "super_puper_originalnaya_shaurma": {
        name: "Супер пупер оригинальная шаверма",
        weight: "370 г",
        description: "Утиная грудка, апельсины, соус хойсин, листья салата, маринованный лук, сыр фета, бездрожжевой лаваш.",
        price: "370 ₽",
        proteins: 17,
        fats: 18,
        carbs: 29
    },

    // Закуски
    "kartoshka_free": {
        name: "Картошка фри",
        weight: "150 г",
        description: "Картофель, паприка, чесночный порошок, соль, соус на выбор",
        price: "290 ₽",
        proteins: 3,
        fats: 9,
        carbs: 37
    },
    "suharik": {
        name: "Сухарь",
        weight: "200 г",
        description: "Пшеничный хлеб, оливковое масло, чеснок, сушёные травы, соль, сыр пармезан.",
        price: "290 ₽",
        proteins: 6,
        fats: 10,
        carbs: 45
    },
    "pelmen": {
        name: "Пельмеш",
        weight: "330 г",
        description: "Тесто, свинина, говядина, лук, чеснок, зелень, соль, перец.",
        price: "330 ₽",
        proteins: 12,
        fats: 15,
        carbs: 30
    },
    "kuritsa_grill": {
        name: "Курица гриль",
        weight: "350 г",
        description: "Куриное филе, смесь специй для гриля, чеснок, паприка, лимонный сок, оливковое масло, соус тар-тар.",
        price: "330 ₽",
        proteins: 25,
        fats: 20,
        carbs: 5
    },
	 // Ланчи
    "lanch": {
        name: "Ланч",
        weight: "400 г",
        description: "Куриное филе, картофельное пюре, брокколи, морковные дольки, сливочный соус, зелень.",
        price: "290 ₽",
        proteins: 25,
        fats: 12,
        carbs: 40
    },
    "eshyo_lanch": {
        name: "Ещё какой-то ланч",
        weight: "450 г",
        description: "Говяжий стейк, рис басмати, запечённые цукини, помидоры черри, соус терияки, кунжут.",
        price: "330 ₽",
        proteins: 28,
        fats: 15,
        carbs: 45
    },
    "ocherednoy_lanch": {
        name: "Очередной ланч",
        weight: "450 г",
        description: "Лосось на гриле, булгур, шпинат, сливочный соус с укропом, лимонные дольки.",
        price: "340 ₽",
        proteins: 26,
        fats: 14,
        carbs: 50
    },

    // Детское меню
    "dolka": {
        name: "Долька",
        weight: "100 г",
        description: "Сочные яблочные дольки.",
        price: "290 ₽",
        proteins: 0.5,
        fats: 0.2,
        carbs: 15
    },
    "sok": {
        name: "Сок",
        weight: "200 мл",
        description: "Свежевыжатый апельсиновый сок.",
        price: "330 ₽",
        proteins: 1,
        fats: 0,
        carbs: 20
    },
    "blinchiki": {
        name: "Блинчики",
        weight: "300 г",
        description: "Блины с медом и фруктами.",
        price: "340 ₽",
        proteins: 8,
        fats: 10,
        carbs: 50
    },
    "konfetka": {
        name: "Конфетка",
        weight: "50 г",
        description: "Шоколадная конфета с ярким драже.",
        price: "370 ₽",
        proteins: 2,
        fats: 5,
        carbs: 40
    },
};




productCards.forEach(card => {
    card.addEventListener('click', () => {
        const productId = card.getAttribute('data-id'); // Получаем ID товара
        const product = productsData[productId]; // Достаем данные из объекта
        const productImage = card.getAttribute('data-image'); // Получаем путь к изображению из HTML

        if (product) {
            modalImage.src = productImage; // Устанавливаем изображение
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
