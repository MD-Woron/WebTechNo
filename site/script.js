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
    "latte_caramel_orange": {
        name: "Латте Карамельный Апельсин",
        weight: "250 мл",
        description: "Нежный латте с добавлением карамельного и апельсинового сиропов, создающий тёплый и сладкий вкус с лёгкой цитрусовой ноткой.",
        price: "270",
        proteins: 4,
        fats: 5,
        carbs: 16
    },
    "latte_spicy_cookie": {
        name: "Латте Пряное Печенье",
        weight: "250 мл",
        description: "Ароматный латте с добавлением специй и сиропа с вкусом пряного печенья, создающий уютное настроение.",
        price: "280",
        proteins: 4,
        fats: 6,
        carbs: 18
    },
    "latte_gingerbread": {
        name: "Латте Имбирный Пряник",
        weight: "250 мл",
        description: "Кофейный напиток с добавлением имбирного сиропа и пряностей, напоминающий вкус классического рождественского пряника.",
        price: "290",
        proteins: 4,
        fats: 5,
        carbs: 17
    },
    "latte_santa_claus": {
        name: "Латте Дед Мороз",
        weight: "250 мл",
        description: "Уникальный праздничный латте с добавлением сливочного сиропа, корицы и шоколадного декора, создающий волшебное настроение.",
        price: "300",
        proteins: 4,
        fats: 6,
        carbs: 19
    },
    "klassicheskaya_shaurma": {
        name: "Классическая шаверма",
        weight: "300 г",
        description: "Куриное филе, огурец, томат, капуста китайская, свежая, лук красный, соус белый, лаваш бездрожжевой.",
        price: "290 ",
        proteins: 14, // Белки
        fats: 10,     // Жиры
        carbs: 25     // Углеводы
    },
    "firmennaya_shaurma": {
        name: "Фирменная шаверма",
        weight: "330 г",
        description: "Куриное филе, корнишоны, морковь по-корейски, томаты, капуста, соусы.",
        price: "330 ",
        proteins: 15,
        fats: 12,
        carbs: 27
    },
    "motsarella_shaurma": {
        name: "Моцарелла шаверма",
        weight: "320 г",
        description: "Куриное филе, томат, капуста китайская, лук красный, соус белый, сыр моцарелла, лаваш бездрожжевой.",
        price: "340 ",
        proteins: 16,
        fats: 14,
        carbs: 22
    },
    "barbecue_shaurma": {
        name: "Барбекю шаверма",
        weight: "350 г",
        description: "Куриное филе, бекон, картофель фри, огурец, томат, лук красный, капуста китайская, соус Барбекю.",
        price: "370 ",
        proteins: 17,
        fats: 18,
        carbs: 28
    },
    "mexican_shaurma": {
        name: "Мексиканская шаверма",
        weight: "300 г",
        description: "Куриное филе, перец халапеньо, кукуруза, соус сальса, томаты, китайская капуста, красный лук, сыр чеддер, бездрожжевой лаваш.",
        price: "290 ",
        proteins: 14,
        fats: 10,
        carbs: 25
    },
    "meat_shaurma": {
        name: "Мясная шаверма",
        weight: "330 г",
        description: "Говяжий стейк, грибы, соус терияки, маринованный огурец, томаты, рукола, белый соус, бездрожжевой лаваш.",
        price: "330 ",
        proteins: 15,
        fats: 12,
        carbs: 26
    },
    "cheese_shaurma": {
        name: "Столько сыра шаверма",
        weight: "320 г",
        description: "Куриное филе, сыр моцарелла, сыр пармезан, сыр дорблю, томаты, китайская капуста, сливочный соус, бездрожжевой лаваш.",
        price: "340 ",
        proteins: 16,
        fats: 14,
        carbs: 22
    },
    "zhnets_shaurma": {
        name: "Жнец шаверма",
        weight: "350 г",
        description: "Куриное филе, бекон, картофель фри, острый соус чили, томаты, лук фри, лист салата, соус ранч, бездрожжевой лаваш.",
        price: "370 ",
        proteins: 18,
        fats: 19,
        carbs: 29
    },
    // Шаверма авторская
    "originalnaya_shaurma": {
        name: "Оригинальная шаверма",
        weight: "300 г",
        description: "Куриное филе на гриле, свежий шпинат, маринованные огурцы, томаты черри, соус песто, сыр чеддер, бездрожжевой лаваш.",
        price: "290 ",
        proteins: 14, // Белки
        fats: 10,     // Жиры
        carbs: 25     // Углеводы
    },
    "ochen_originalnaya_shaurma": {
        name: "Очень оригинальная шаверма",
        weight: "330 г",
        description: "Индейка, авокадо, жареные баклажаны, кинза, томаты, йогуртовый соус с чесноком, бездрожжевой лаваш.",
        price: "330 ",
        proteins: 15,
        fats: 12,
        carbs: 27
    },
    "super_originalnaya_shaurma": {
        name: "Супер оригинальная шаверма",
        weight: "340 г",
        description: "Креветки, ананасы, перец болгарский, салат айсберг, сливочный сыр, соус терияки, бездрожжевой лаваш.",
        price: "340 ",
        proteins: 16,
        fats: 13,
        carbs: 23
    },
    "super_puper_originalnaya_shaurma": {
        name: "Супер пупер оригинальная шаверма",
        weight: "370 г",
        description: "Утиная грудка, апельсины, соус хойсин, листья салата, маринованный лук, сыр фета, бездрожжевой лаваш.",
        price: "370 ",
        proteins: 17,
        fats: 18,
        carbs: 29
    },

    // Закуски
    "kartoshka_free": {
        name: "Картошка фри",
        weight: "150 г",
        description: "Картофель, паприка, чесночный порошок, соль, соус на выбор",
        price: "290 ",
        proteins: 3,
        fats: 9,
        carbs: 37
    },
    "suharik": {
        name: "Сухарь",
        weight: "200 г",
        description: "Пшеничный хлеб, оливковое масло, чеснок, сушёные травы, соль, сыр пармезан.",
        price: "290 ",
        proteins: 6,
        fats: 10,
        carbs: 45
    },
    "pelmen": {
        name: "Пельмеш",
        weight: "330 г",
        description: "Тесто, свинина, говядина, лук, чеснок, зелень, соль, перец.",
        price: "330 ",
        proteins: 12,
        fats: 15,
        carbs: 30
    },
    "kuritsa_grill": {
        name: "Курица гриль",
        weight: "350 г",
        description: "Куриное филе, смесь специй для гриля, чеснок, паприка, лимонный сок, оливковое масло, соус тар-тар.",
        price: "330 ",
        proteins: 25,
        fats: 20,
        carbs: 5
    },
	 // Ланчи
    "lanch": {
        name: "Ланч",
        weight: "400 г",
        description: "Куриное филе, картофельное пюре, брокколи, морковные дольки, сливочный соус, зелень.",
        price: "290 ",
        proteins: 25,
        fats: 12,
        carbs: 40
    },
    "eshyo_lanch": {
        name: "Ещё какой-то ланч",
        weight: "450 г",
        description: "Говяжий стейк, рис басмати, запечённые цукини, помидоры черри, соус терияки, кунжут.",
        price: "330 ",
        proteins: 28,
        fats: 15,
        carbs: 45
    },
    "ocherednoy_lanch": {
        name: "Очередной ланч",
        weight: "450 г",
        description: "Лосось на гриле, булгур, шпинат, сливочный соус с укропом, лимонные дольки.",
        price: "340 ",
        proteins: 26,
        fats: 14,
        carbs: 50
    },

    // Детское меню
    "dolka": {
        name: "Долька",
        weight: "100 г",
        description: "Сочные яблочные дольки.",
        price: "290 ",
        proteins: 0.5,
        fats: 0.2,
        carbs: 15
    },
    "sok": {
        name: "Сок",
        weight: "200 мл",
        description: "Свежевыжатый апельсиновый сок.",
        price: "330 ",
        proteins: 1,
        fats: 0,
        carbs: 20
    },
    "blinchiki": {
        name: "Блинчики",
        weight: "300 г",
        description: "Блины с медом и фруктами.",
        price: "340 ",
        proteins: 8,
        fats: 10,
        carbs: 50
    },
    "konfetka": {
        name: "Конфетка",
        weight: "50 г",
        description: "Шоколадная конфета с ярким драже.",
        price: "370 ",
        proteins: 2,
        fats: 5,
        carbs: 40
    },
};

const optionsGrid = document.querySelector('.options-grid');
const selectedOptions = new Set(); // Хранение выбранных опций

optionsGrid.addEventListener('click', (e) => {
    if (e.target.classList.contains('option-item')) {
        const option = e.target.getAttribute('data-option');
        if (selectedOptions.has(option)) {
            selectedOptions.delete(option); // Удалить из выбранных
            e.target.classList.remove('active'); // Убрать выделение
        } else {
            selectedOptions.add(option); // Добавить в выбранные
            e.target.classList.add('active'); // Выделить
        }
        console.log('Выбранные опции:', Array.from(selectedOptions)); // Для отладки
    }
});

// Пример использования выбранных опций при добавлении в корзину
document.getElementById('add-to-cart-btn').addEventListener('click', () => {
    const productName = document.getElementById('modal-title').textContent;
    const productPrice = document.getElementById('modal-price').textContent;
    const quantity = parseInt(document.getElementById('quantity').textContent);

    const cartItem = {
        name: productName,
        price: productPrice,
        quantity: quantity,
        options: Array.from(selectedOptions), // Передача выбранных опций
    };

    console.log('Добавлено в корзину:', cartItem); // Для отладки
    cartItems.push(cartItem);
    updateCartUI();
    modalOverlay.style.display = 'none';
    selectedOptions.clear(); // Сброс выбранных опций
    document.querySelectorAll('.option-item.active').forEach(option => option.classList.remove('active'));
});

productCards.forEach(card => {
    card.addEventListener('click', () => {
        const productId = card.getAttribute('data-id');
        const product = productsData[productId];
        const productImage = card.getAttribute('data-image');

        if (product) {
            if (productId.includes('shaurma')) {
                // Модальное окно для шавермы
                modalImage.src = productImage;
                modalTitle.textContent = product.name;
                modalWeight.textContent = product.weight;
                modalDescription.textContent = product.description;
                modalPrice.textContent = product.price;

                document.getElementById('modal-proteins').textContent = product.proteins;
                document.getElementById('modal-fats').textContent = product.fats;
                document.getElementById('modal-carbs').textContent = product.carbs;

                modalOverlay.style.display = 'flex';
            } else {
                // Модальное окно для других товаров
                const generalModalOverlay = document.getElementById('general-modal-overlay');
                const generalModalImage = document.getElementById('general-modal-image');
                const generalModalTitle = document.getElementById('general-modal-title');
                const generalModalWeight = document.getElementById('general-modal-weight');
                const generalModalDescription = document.getElementById('general-modal-description');
                const generalModalPrice = document.getElementById('general-modal-price');
                const generalQuantitySpan = document.getElementById('general-quantity');

                generalModalImage.src = productImage;
                generalModalTitle.textContent = product.name;
                generalModalWeight.textContent = product.weight;
                generalModalDescription.textContent = product.description;
                generalModalPrice.textContent = product.price;

                document.getElementById('general-modal-proteins').textContent = product.proteins;
                document.getElementById('general-modal-fats').textContent = product.fats;
                document.getElementById('general-modal-carbs').textContent = product.carbs;

                generalQuantitySpan.textContent = '1';

                generalModalOverlay.style.display = 'flex';
            }
        }
    });
});

// Закрытие модального окна для шавермы
document.getElementById('modal-close').addEventListener('click', () => {
    modalOverlay.style.display = 'none';
});

// Закрытие модального окна для остальных товаров
document.getElementById('general-modal-close').addEventListener('click', () => {
    document.getElementById('general-modal-overlay').style.display = 'none';
});

// Закрытие модального окна при клике на фон
document.getElementById('general-modal-overlay').addEventListener('click', (e) => {
    if (e.target === document.getElementById('general-modal-overlay')) {
        document.getElementById('general-modal-overlay').style.display = 'none';
    }
});

// Логика изменения количества товара для универсального модального окна
document.getElementById('general-minus-btn').addEventListener('click', () => {
    const quantitySpan = document.getElementById('general-quantity');
    let quantity = parseInt(quantitySpan.textContent);
    if (quantity > 1) {
        quantitySpan.textContent = --quantity;
    }
});

document.getElementById('general-plus-btn').addEventListener('click', () => {
    const quantitySpan = document.getElementById('general-quantity');
    let quantity = parseInt(quantitySpan.textContent);
    quantitySpan.textContent = ++quantity;
});

// Логика добавления в корзину
document.getElementById('general-add-to-cart-btn').addEventListener('click', () => {
    const productName = document.getElementById('general-modal-title').textContent;
    const productPrice = document.getElementById('general-modal-price').textContent;
    const quantity = parseInt(document.getElementById('general-quantity').textContent);

    for (let i = 0; i < quantity; i++) {
        cartItems.push({ name: productName, price: productPrice });
    }
    updateCartUI();
    document.getElementById('general-modal-overlay').style.display = 'none';
});


