// Данные приложения
let cart = [];
let wishlist = [];
let userData = {
    name: "Иван Петров",
    email: "ivan.petrov@example.com",
    totalOrders: 5,
    bonusPoints: 1250
};

// Элементы DOM
const userBtn = document.getElementById('userBtn');
const accountPanel = document.getElementById('accountPanel');
const closeAccount = document.getElementById('closeAccount');
const cartBtn = document.getElementById('cartBtn');
const wishlistBtn = document.getElementById('wishlistBtn');
const cartSidebar = document.getElementById('cartSidebar');
const wishlistSidebar = document.getElementById('wishlistSidebar');
const overlay = document.getElementById('overlay');
const closeCart = document.getElementById('closeCart');
const closeWishlist = document.getElementById('closeWishlist');
const cartCount = document.getElementById('cartCount');
const wishlistCount = document.getElementById('wishlistCount');
const cartItems = document.getElementById('cartItems');
const wishlistItems = document.getElementById('wishlistItems');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const productCards = document.querySelectorAll('.product-card');

// Элементы личного кабинета
const userProfileName = document.getElementById('userProfileName');
const userProfileEmail = document.getElementById('userProfileEmail');
const totalOrdersEl = document.getElementById('totalOrders');
const bonusPointsEl = document.getElementById('bonusPoints');
const wishlistCountStat = document.getElementById('wishlistCountStat');
const cartCountStat = document.getElementById('cartCountStat');
const profileBtn = document.getElementById('profileBtn');
const ordersBtn = document.getElementById('ordersBtn');
const addressesBtn = document.getElementById('addressesBtn');
const notificationsBtn = document.getElementById('notificationsBtn');
const settingsBtn = document.getElementById('settingsBtn');

// Функции для работы с корзиной
function addToCart(productId, productName, productPrice, productImg) {
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: productPrice,
            img: productImg,
            quantity: 1
        });
    }
    
    updateCartDisplay();
    updateAccountStats();
    showNotification(`Товар "${productName}" добавлен в корзину!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
    updateAccountStats();
}

function updateCartDisplay() {
    // Обновляем счетчик
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Обновляем отображение корзины
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-message">Ваша корзина пуста</div>';
        cartTotal.textContent = '0 ₽';
        return;
    }
    
    let cartHTML = '';
    let totalPrice = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;
        
        cartHTML += `
            <div class="cart-item">
                <img src="${item.img}" alt="${item.name}">
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <div class="item-price">${item.price} ₽ x ${item.quantity} = ${itemTotal} ₽</div>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">Удалить</button>
                </div>
            </div>
        `;
    });
    
    cartItems.innerHTML = cartHTML;
    cartTotal.textContent = `${totalPrice} ₽`;
}

// Функции для работы с избранным
function toggleWishlist(productId, productName, productPrice, productImg) {
    const existingIndex = wishlist.findIndex(item => item.id === productId);
    
    if (existingIndex !== -1) {
        wishlist.splice(existingIndex, 1);
        showNotification(`Товар "${productName}" удален из избранного`);
    } else {
        wishlist.push({
            id: productId,
            name: productName,
            price: productPrice,
            img: productImg
        });
        showNotification(`Товар "${productName}" добавлен в избранное!`);
    }
    
    updateWishlistDisplay();
    updateAccountStats();
}

function removeFromWishlist(productId) {
    wishlist = wishlist.filter(item => item.id !== productId);
    updateWishlistDisplay();
    updateAccountStats();
}

function updateWishlistDisplay() {
    // Обновляем счетчик
    wishlistCount.textContent = wishlist.length;
    
    // Обновляем отображение избранного
    if (wishlist.length === 0) {
        wishlistItems.innerHTML = '<div class="empty-message">В избранном пока ничего нет</div>';
        return;
    }
    
    let wishlistHTML = '';
    
    wishlist.forEach(item => {
        wishlistHTML += `
            <div class="wishlist-item">
                <img src="${item.img}" alt="${item.name}">
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <div class="item-price">${item.price} ₽</div>
                    <button class="remove-btn" onclick="removeFromWishlist(${item.id})">Удалить</button>
                </div>
            </div>
        `;
    });
    
    wishlistItems.innerHTML = wishlistHTML;
}

// Функции для личного кабинета
function updateAccountStats() {
    // Обновляем статистику в личном кабинете
    const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    userProfileName.textContent = userData.name;
    userProfileEmail.textContent = userData.email;
    totalOrdersEl.textContent = userData.totalOrders;
    bonusPointsEl.textContent = userData.bonusPoints;
    wishlistCountStat.textContent = wishlist.length;
    cartCountStat.textContent = totalCartItems;
}

function openAccountPanel() {
    accountPanel.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    updateAccountStats();
}

function closeAccountPanel() {
    accountPanel.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Уведомления
function showNotification(message) {
    // Создаем элемент уведомления
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: #4a9f8e;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        font-weight: 500;
        animation: slideIn 0.3s ease, fadeOut 0.3s ease 2.7s forwards;
    `;
    
    // Добавляем стили для анимации
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Удаляем уведомление через 3 секунды
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 3000);
}

// Открытие/закрытие боковых панелей
function openCart() {
    cartSidebar.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCartSidebar() {
    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function openWishlist() {
    wishlistSidebar.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeWishlistSidebar() {
    wishlistSidebar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Обработчики событий для товаров
productCards.forEach(card => {
    card.addEventListener('click', function(e) {
        // Проверяем, не нажали ли мы на кнопку удаления
        if (e.target.classList.contains('remove-btn')) {
            return;
        }
        
        const productId = this.getAttribute('data-id');
        const productName = this.getAttribute('data-name');
        const productPrice = parseInt(this.getAttribute('data-price'));
        const productImg = this.getAttribute('data-img');
        
        // Показываем меню выбора действия
        const action = confirm(`Выберите действие для "${productName}":\n\nOK - Добавить в корзину\nОтмена - Добавить в избранное`);
        
        if (action) {
            addToCart(productId, productName, productPrice, productImg);
        } else {
            toggleWishlist(productId, productName, productPrice, productImg);
        }
    });
});

// Обработчики событий для кнопок
userBtn.addEventListener('click', openAccountPanel);
cartBtn.addEventListener('click', openCart);
wishlistBtn.addEventListener('click', openWishlist);
closeAccount.addEventListener('click', closeAccountPanel);
closeCart.addEventListener('click', closeCartSidebar);
closeWishlist.addEventListener('click', closeWishlistSidebar);
overlay.addEventListener('click', function() {
    closeAccountPanel();
    closeCartSidebar();
    closeWishlistSidebar();
});

// Функциональность личного кабинета
profileBtn.addEventListener('click', function() {
    const newName = prompt('Введите ваше имя:', userData.name);
    if (newName && newName.trim() !== '') {
        userData.name = newName.trim();
        updateAccountStats();
        showNotification('Имя профиля обновлено!');
    }
});

ordersBtn.addEventListener('click', function() {
    alert(`История заказов:\n\nУ вас ${userData.totalOrders} заказов на общую сумму 24 850 ₽\n\n1. Заказ #001 - 5 997 ₽ (Доставлен)\n2. Заказ #002 - 8 450 ₽ (Доставлен)\n3. Заказ #003 - 3 299 ₽ (В обработке)\n4. Заказ #004 - 4 099 ₽ (Доставлен)\n5. Заказ #005 - 3 005 ₽ (Доставлен)`);
});

addressesBtn.addEventListener('click', function() {
    alert('Адреса доставки:\n\n1. г. Москва, ул. Пушкинская, д. 15 (Основной)\n2. г. Москва, пр. Ленина, д. 42, кв. 12\n\nДля добавления нового адреса свяжитесь с поддержкой.');
});

notificationsBtn.addEventListener('click', function() {
    const enable = confirm('Включить уведомления о новых товарах и акциях?');
    if (enable) {
        showNotification('Уведомления включены!');
    } else {
        showNotification('Уведомления отключены.');
    }
});

settingsBtn.addEventListener('click', function() {
    alert('Настройки:\n\n• Язык: Русский\n• Валюта: Рубли (₽)\n• Тема: Светлая\n• Уведомления: Включены\n\nДля изменения других настроек обратитесь в поддержку.');
});

// Оформление заказа
checkoutBtn.addEventListener('click', function() {
    if (cart.length === 0) {
        alert('Ваша корзина пуста!');
        return;
    }
    
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const bonusEarned = Math.floor(totalPrice / 100);
    userData.bonusPoints += bonusEarned;
    userData.totalOrders += 1;
    
    alert(`Заказ оформлен!\n\nОбщая сумма: ${totalPrice} ₽\nНачислено бонусов: ${bonusEarned}\nОбщее количество бонусов: ${userData.bonusPoints}\n\nСпасибо за покупку!`);
    
    // Очищаем корзину
    cart = [];
    updateCartDisplay();
    updateAccountStats();
    closeCartSidebar();
});

// Инициализация отображения
updateCartDisplay();
updateWishlistDisplay();
updateAccountStats();

// Обработка ошибок загрузки изображений
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.log('Ошибка загрузки изображения: ' + this.src);
            // Замена на резервное изображение
            this.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%234a9f8e"/><text x="50%" y="50%" font-family="Arial" font-size="20" fill="white" text-anchor="middle" dy=".3em">Товар для животных</text></svg>';
            this.alt = 'Изображение временно недоступно';
        });
    });
});