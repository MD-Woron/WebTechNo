

// Поиск (пока просто выводим в консоль)

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
    cartDropdown.innerHTML = ''; // Очищаем содержимое корзины
    let totalPrice = 0; // Переменная для хранения итоговой стоимости

    if (cartItems.length === 0) {
        cartCount.textContent = '(0)';
        const emptyDiv = document.createElement('div');
        emptyDiv.classList.add('empty-cart');
        emptyDiv.textContent = 'В корзине пусто';
        cartDropdown.appendChild(emptyDiv);
    } else {
        cartCount.textContent = `(${cartItems.length})`;

        // Создаём элементы для каждого товара
        cartItems.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item');
            itemDiv.innerHTML = `
                <div class="cart-item-details">
                    <span class="cart-item-number">${index + 1}.</span>
                    <span class="cart-item-name">${item.name}</span>
                    <span class="cart-item-price">${item.price} ₽</span>
                </div>
                <button data-index="${index}" class="cart-item-remove">Удалить</button>
            `;
            cartDropdown.appendChild(itemDiv);

            // Добавляем цену товара к итоговой стоимости
            totalPrice += parseFloat(item.price);
        });

        // Добавляем итоговую стоимость и кнопку "Оплатить"
        const totalDiv = document.createElement('div');
        totalDiv.classList.add('cart-total');
        totalDiv.innerHTML = `
            <div class="cart-total-details">
                <span class="cart-total-label">Итого:</span>
                <span class="cart-total-price">${totalPrice.toFixed(2)} ₽</span>
                <button id="pay-button" class="pay-btn">Оплатить</button>
            </div>
        `;
        cartDropdown.appendChild(totalDiv);

        // Добавляем обработчик для кнопки "Оплатить"
        const payButton = totalDiv.querySelector('#pay-button');
        payButton.addEventListener('click', () => {
            paymentModal.style.display = 'flex'; // Открываем модальное окно оплаты
        });
    }

    // Добавляем обработчик для удаления товара
    cartDropdown.querySelectorAll('.cart-item-remove').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = parseInt(e.target.getAttribute('data-index'), 10);
            cartItems.splice(index, 1); // Удаляем товар из массива
            updateCartUI(); // Обновляем UI корзины
        });
    });
}

const paymentModal = document.getElementById('payment-modal');
const closePaymentModal = document.getElementById('close-payment-modal');

// Закрытие модального окна оплаты
closePaymentModal.addEventListener('click', () => {
    paymentModal.style.display = 'none';
});

// Закрытие модального окна при клике вне его
paymentModal.addEventListener('click', (event) => {
    if (event.target === paymentModal) {
        paymentModal.style.display = 'none';
    }
});


let cartHideTimeout; // Таймер для задержки скрытия

// Показать корзину, если курсор наведен
cartInfo.addEventListener('mouseover', () => {
    clearTimeout(cartHideTimeout); // Останавливаем таймер, если он активен
    cartDropdown.classList.add('show'); // Добавляем класс для плавного появления
});

// Скрыть корзину, если курсор ушёл
cartInfo.addEventListener('mouseleave', () => {
    cartHideTimeout = setTimeout(() => {
        cartDropdown.classList.remove('show'); // Убираем класс для плавного исчезновения
    }, 2000); // 2000 миллисекунд = 2 секунды
});

// Если курсор снова наведен на меню корзины, оно не убирается
cartDropdown.addEventListener('mouseover', () => {
    clearTimeout(cartHideTimeout); // Останавливаем таймер
    cartDropdown.classList.add('show'); // Гарантируем, что корзина остаётся видимой
});

// Если курсор уходит с меню корзины, запускается таймер на скрытие
cartDropdown.addEventListener('mouseleave', () => {
    cartHideTimeout = setTimeout(() => {
        cartDropdown.classList.remove('show'); // Убираем класс для плавного исчезновения
    }, 2000);
});







// Стилизация иконок товара
const cartStyle = document.createElement('style');
cartStyle.textContent = `
    .cart-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        margin-bottom: 10px;
    }
    .cart-item-image {
        width: 40px;
        height: 40px;
        border-radius: 4px;
        object-fit: cover;
    }
    .cart-item-name {
        font-size: 14px;
        font-weight: 500;
        flex: 1;
    }
    .cart-item-price {
        font-size: 14px;
        font-weight: 700;
    }
    .cart-item-remove {
        background: rgb(180, 50, 50);
        color: white;
        border: none;
        padding: 5px 10px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 12px;
    }
`;
document.head.appendChild(cartStyle);


cartDropdown.querySelectorAll('.cart-item-remove').forEach(button => {
    button.addEventListener('click', (e) => {
        const index = parseInt(e.target.getAttribute('data-index'), 10);
        cartItems.splice(index, 1); // Удаляем товар из массива
        updateCartUI(); // Обновляем UI корзины
    });
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

// Кнопка увеличения количества
plusBtn.addEventListener('click', () => {
    quantity++;
    quantitySpan.textContent = quantity;

    // Обновляем цену в модальном окне
    if (currentProduct) {
        const basePrice = parseFloat(currentProduct.price); // Цена за единицу товара
        const newPrice = basePrice * quantity; // Общая цена
        modalPrice.textContent = `${newPrice} `; // Обновление цены в модалке
    }
});

// Кнопка уменьшения количества
minusBtn.addEventListener('click', () => {
    if (quantity > 1) {
        quantity--;
        quantitySpan.textContent = quantity;

        // Обновляем цену в модальном окне
        if (currentProduct) {
            const basePrice = parseFloat(currentProduct.price);
            const newPrice = basePrice * quantity;
            modalPrice.textContent = `${newPrice} `; // Обновление цены в модалке
        }
    }
});


addToCartBtn.addEventListener('click', () => {
    if (currentProduct) {
        for (let i = 0; i < quantity; i++) {
            cartItems.push({
                name: currentProduct.name,
                price: currentProduct.price,
            });
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
        const productImage = card.getAttribute('data-image'); // Извлекаем URL изображения
        let quantity = 1; // Начальное количество товара

        if (product) {
            // Добавляем изображение в объект продукта
            product.image = productImage;

            if (productId.includes('shaurma')) {
                // Модальное окно для шавермы
                modalImage.src = productImage; // Устанавливаем изображение в модальном окне
                modalTitle.textContent = product.name;
                modalWeight.textContent = product.weight;
                modalDescription.textContent = product.description;
                modalPrice.textContent = `${product.price} `; // Установка базовой цены

                document.getElementById('modal-proteins').textContent = product.proteins;
                document.getElementById('modal-fats').textContent = product.fats;
                document.getElementById('modal-carbs').textContent = product.carbs;

                modalOverlay.style.display = 'flex';

                // Обработчики кнопок + и -
                const updatePrice = () => {
                    const basePrice = parseFloat(product.price); // Цена за единицу
                    const newPrice = basePrice * quantity; // Общая цена
                    modalPrice.textContent = `${newPrice} `;
                };

                plusBtn.addEventListener('click', () => {
                    quantity++;
                    quantitySpan.textContent = quantity;
                    updatePrice();
                });

                minusBtn.addEventListener('click', () => {
                    if (quantity > 1) {
                        quantity--;
                        quantitySpan.textContent = quantity;
                        updatePrice();
                    }
                });

                // Сбрасываем количество при каждом открытии модального окна
                quantity = 1;
                quantitySpan.textContent = quantity;
                updatePrice();
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
                generalModalPrice.textContent = `${product.price} `;

                document.getElementById('general-modal-proteins').textContent = product.proteins;
                document.getElementById('general-modal-fats').textContent = product.fats;
                document.getElementById('general-modal-carbs').textContent = product.carbs;

                generalQuantitySpan.textContent = '1';

                generalModalOverlay.style.display = 'flex';

                // Аналогичная логика обновления цены для общего модального окна
                let generalQuantity = 1;

                const updateGeneralPrice = () => {
                    const basePrice = parseFloat(product.price);
                    const newPrice = basePrice * generalQuantity;
                    generalModalPrice.textContent = `${newPrice} `;
                };

                document.getElementById('general-plus-btn').addEventListener('click', () => {
                    generalQuantity++;
                    generalQuantitySpan.textContent = generalQuantity;
                    updateGeneralPrice();
                });

                document.getElementById('general-minus-btn').addEventListener('click', () => {
                    if (generalQuantity > 1) {
                        generalQuantity--;
                        generalQuantitySpan.textContent = generalQuantity;
                        updateGeneralPrice();
                    }
                });

                // Сбрасываем количество при каждом открытии общего модального окна
                generalQuantity = 1;
                generalQuantitySpan.textContent = generalQuantity;
                updateGeneralPrice();
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


// Открытие модального окна "Доставка и оплата"
const deliveryLink = document.querySelector('a[href="#delivery"]'); // Ссылка "Доставка и оплата"
const deliveryModal = document.getElementById('delivery-payment-modal'); // Модальное окно доставки
const closeDeliveryModal = document.getElementById('close-delivery-modal'); // Крестик для закрытия
const doneButton = document.getElementById('delivery-done-btn'); // Кнопка "Готово"
const deliveryAddress = document.getElementById('delivery-address'); // Поле ввода адреса

// Открытие модального окна при клике на "Доставка и оплата"
deliveryLink.addEventListener('click', (event) => {
    event.preventDefault(); // Предотвращаем переход по ссылке
    deliveryModal.style.display = 'flex'; // Отображаем модальное окно
});

// Закрытие модального окна при клике на крестик
closeDeliveryModal.addEventListener('click', () => {
    deliveryModal.style.display = 'none'; // Скрываем модальное окно
    clearDeliveryAddress(); // Очищаем поле адреса
});

// Закрытие модального окна при клике на кнопку "Готово"
doneButton.addEventListener('click', () => {
    deliveryModal.style.display = 'none'; // Скрываем модальное окно
    clearDeliveryAddress(); // Очищаем поле адреса
});

// Закрытие модального окна при клике вне контента
deliveryModal.addEventListener('click', (event) => {
    if (event.target === deliveryModal) {
        deliveryModal.style.display = 'none';
        clearDeliveryAddress();
    }
});

// Функция очистки адреса
function clearDeliveryAddress() {
    if (deliveryAddress) {
        deliveryAddress.value = ''; // Очищаем поле адреса
    }
}








