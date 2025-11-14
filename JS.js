const cards = [
    { id: 1, name: "Voltarax", faction: "lightning", type: "creature", rarity: "legendary", edition: "1/1", attack: 10, defense: 8, speed: 9, price: 10000, image: "/images/4.png", description: "The ancient guardian of storms, master of thunder and lightning" },
    { id: 2, name: "Ignothar", faction: "fire", type: "creature", rarity: "legendary", edition: "1/1", attack: 12, defense: 7, speed: 6, price: 12000, image: "/images/fire1.png", description: "The incandescent titan, embodiment of rage and destruction" },
    { id: 3, name: "Glacior", faction: "ice", type: "creature", rarity: "legendary", edition: "1/1", attack: 8, defense: 12, speed: 7, price: 11000, image: "/images/ice1.png", description: "The eternal paladin, guardian of frozen eternity" },
    { id: 4, name: "Storm Assassin", faction: "lightning", type: "creature", rarity: "epic", edition: "1/10", attack: 7, defense: 4, speed: 10, price: 2500, image: "images/light1.jpg", description: "Silent as shadow, fast as lightning" },
    { id: 5, name: "Lava Colossus", faction: "fire", type: "creature", rarity: "epic", edition: "1/10", attack: 9, defense: 6, speed: 4, price: 2800, image: "images/fire2.png", description: "Walking volcano of pure destruction" },
    { id: 6, name: "Crystalline", faction: "ice", type: "creature", rarity: "epic", edition: "1/10", attack: 6, defense: 9, speed: 5, price: 2600, image: "images/ice2.png", description: "Impenetrable guardian of the frozen realm" },
    { id: 7, name: "Thunder Dragon", faction: "lightning", type: "creature", rarity: "epic", edition: "1/10", attack: 8, defense: 5, speed: 9, price: 2700, image: "images/light2.jpg", description: "Soaring through storms with devastating power" },
    { id: 8, name: "Inferno Beast", faction: "fire", type: "creature", rarity: "epic", edition: "1/10", attack: 10, defense: 5, speed: 5, price: 2900, image: "images/fire3.png", description: "Unleashed fury from the depths of hell" },
    { id: 9, name: "Spark Mage", faction: "lightning", type: "creature", rarity: "rare", edition: "1/100", attack: 5, defense: 3, speed: 8, price: 800, image: "images/light3.png", description: "Master of electrical manipulation" },
    { id: 10, name: "Flame Warrior", faction: "fire", type: "creature", rarity: "rare", edition: "1/100", attack: 6, defense: 4, speed: 5, price: 850, image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=250&fit=crop", description: "Forged in the heart of volcanoes" },
    { id: 11, name: "Frost Knight", faction: "ice", type: "creature", rarity: "rare", edition: "1/100", attack: 4, defense: 7, speed: 6, price: 820, image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=250&fit=crop", description: "Noble protector of the frozen wastes" },
    { id: 12, name: "Lightning Strike", faction: "lightning", type: "spell", rarity: "rare", edition: "1/100", attack: 0, defense: 0, speed: 0, price: 600, image: "https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?w=400&h=250&fit=crop", description: "Deal 5 damage to any target" }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let current = 'all';
let filter_cards = cards;
let cuurent_index;
const cartslider = document.getElementById('cartslider');
const totalContainer = document.getElementById('totalContainer');
const panier = document.getElementById('panier');
const btn_cart = document.getElementById('cart');
const container = document.getElementById("cardcontainer");
const checkoutBtn = document.getElementById('checkoutBtn');
const menu_btn = document.querySelector('.menu-btn')
const menu_slider = document.querySelector('.menu_slider')


menu_btn.addEventListener('click', () => { 
    menu_slider.classList.toggle('translate-x-full') 
    menu_slider.classList.toggle('translate-x-0')   
    })


function add_cart(show_cards = cards, index = 0) {
    container.innerHTML = '';
    for (let i = index; i < index + 8 && i < show_cards.length; i++) {
        const card = show_cards[i];
        const card_container = document.createElement('div');
        const card_elemnt = document.createElement('div');
        card_elemnt.className = `market-card card-${card.faction}`;
        card_elemnt.innerHTML = `
            <div class="card-image" style="background-image: url('${card.image}');">
                <div class="rarity ${card.rarity}">${card.edition}</div>
            </div>
            <div class="px-4 py-2 bg-[#0E0E22]">
                <h3 class="text-2xl font-bold mb-2 text-${card.faction === "lightning" ? "purple" : card.faction === "fire" ? "orange" : "ciel"}">${card.name}</h3>
                <p class="text-xs text-gray-500 mb-2">${card.rarity}</p>
                <p class="text-xs text-gray-300 mb-6">${card.description}</p>
                <div class="flex justify-between text-gray-400">
                    <div><span>${card.price} 💎</span></div>
                    <div><span>⚔️ ${card.attack}</span><span>🛡️ ${card.defense}</span><span>⚡ ${card.speed}</span></div>
                </div>
            </div>
        `;
        const card_button = document.createElement('div');
        card_button.className = 'flex justify-between items-center';
        card_button.innerHTML = `
            <button class="btn-add-cart mt-4 ml-4" onclick="update_cart(${card.id})">Add To Cart</button>
            <button class="btn-add-favorite mt-4 mr-4" onclick="favorite_card(${card.id})">❤️</button>
        `;
        card_container.append(card_elemnt, card_button);
        container.appendChild(card_container);
    }
}

function filter_faction(x) {
    filter_cards = x === 'all' ? cards : cards.filter(c => c.faction === x);
    cuurent_index = 0;
    displayCards(filter_cards);
}

function filter_rarity(x) {
    filter_cards = x === 'all' ? cards : cards.filter(c => c.rarity === x);
    cuurent_index = 0;
    displayCards(filter_cards);
}

function update_cart(id) {
    let card = cards.find(c => c.id === id);
    if (!cart.some(x => x.id === id)) {
        cart.push({ ...card, quantity: 1 });
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Added To Cart');
        panieradder();
    } else {
        alert("Already Added !!");
    }
}

function panieradder() {
    panier.innerHTML = '';
    let total = 0;
    cart.forEach((c, i) => {
        total += c.price * c.quantity;
        panier.innerHTML += `
            <div class="flex flex-col bg-black rounded-lg mb-4 p-3">
                <div class="flex justify-between items-center">
                    <div class="flex items-center gap-3">
                        <img src="${c.image}" alt="${c.name}" class="w-30 h-24 rounded-md object-cover border border-gray-700">
                        <div>
                            <h3 class="font-bold text-sm">${c.name}</h3>
                            <p class="text-gray-400 text-xs">${(c.price * c.quantity).toFixed(2)} 💎</p>
                        </div>
                    </div>
                    <button class="text-gray-400 hover:text-red-500 transition" onclick="removeFromCart(${i})">X</button>
                </div>
                <div class="flex justify-center items-center gap-4 mt-3">
                    <button class="text-xl font-bold text-white hover:text-cyan-400 transition" onclick="changeQuantity(${i}, -1)">−</button>
                    <span class="text-lg font-semibold">${c.quantity}</span>
                    <button class="text-xl font-bold text-white hover:text-cyan-400 transition" onclick="changeQuantity(${i}, 1)">+</button>
                </div>
            </div>
        `;
    });
    document.getElementById('totalPrice').textContent = `${total.toFixed(2)} 💎`;
}

function changeQuantity(index, delta) {
    if (!cart[index]) return;
    cart[index].quantity = (cart[index].quantity || 1) + delta;
    if (cart[index].quantity <= 0) cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    panieradder();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    panieradder();
}

checkoutBtn.addEventListener('click', () => {
    if (!cart.length) return alert("Votre panier est vide !");
    let deck = JSON.parse(localStorage.getItem('deck')) || [];
    cart.forEach(item => {
        let existCard = deck.find(f => f.id === item.id);
        if (existCard) existCard.quantity += item.quantity;
        else deck.push({ ...item });
    });
    localStorage.setItem('deck', JSON.stringify(deck));
    cart.length = 0;
    localStorage.removeItem('cart');
    panieradder();
    alert("Purchase successful! The cards have been added to your deck ✅");
    if (window.location.pathname === "/deck.html") {
        window.deck = deck; 
        showDeckCards(deck);
    }
});

btn_cart.addEventListener('click', () => {
    cartslider.classList.toggle('translate-x-full');
    cartslider.classList.toggle('translate-x-0');
});

let favorite_cards = JSON.parse(localStorage.getItem('favorite_card')) || [];

function favorite_card(id) {
    let card = cards.find(c => c.id === id);
    if (!favorite_cards.some(c => c.id === id)) {
        favorite_cards.push(card);
        localStorage.setItem('favorite_card', JSON.stringify(favorite_cards));
    }
}

function display_favorite(array) {
    const container = document.getElementById("cardcontainer_favorite");
    container.innerHTML = '';
    array.forEach(c => {
        const card_container = document.createElement('div');
        const card_elemnt = document.createElement('div');
        card_elemnt.className = `market-card card-${c.faction}`;
        card_elemnt.innerHTML = `
            <div class="card-image" style="background-image: url('${c.image}');">
                <div class="rarity ${c.rarity}">${c.edition}</div>
            </div>
            <div class="px-4 py-2 bg-[#0E0E22]">
                <h3 class="text-2xl font-bold mb-2 text-${c.faction === "lightning" ? "purple" : c.faction === "fire" ? "orange" : "ciel"}">${c.name}</h3>
                <p class="text-xs text-gray-500 mb-2">${c.rarity}</p>
                <p class="text-xs text-gray-300 mb-6">${c.description}</p>
                <div class="flex justify-between text-gray-400">
                    <div><span>${c.price} 💎</span></div>
                    <div><span>⚔️ ${c.attack}</span><span>🛡️ ${c.defense}</span><span>⚡ ${c.speed}</span></div>
                </div>
            </div>
        `;
        const card_button = document.createElement('div');
        card_button.innerHTML = `<button class="btn-add-favorite mt-4 ml-2" onclick="remove_favorite(${c.id})">💔</button>`;
        card_container.append(card_elemnt, card_button);
        container.appendChild(card_container);
    });
}

function remove_favorite(id) {
    favorite_cards = favorite_cards.filter(c => c.id !== id);
    if (!favorite_cards.length) localStorage.removeItem("favorite_card");
    else localStorage.setItem('favorite_card', JSON.stringify(favorite_cards));
    display_favorite(favorite_cards);
}

let deck = JSON.parse(localStorage.getItem('deck')) || [];

 function showDeckCards(deckCards = deck) {
       const deckContainer = document.getElementById('deckcontainer');

        deckContainer.innerHTML = '';
        deckCards.forEach(card => {
            // const cardContainer = document.createElement('div');
            const cardElement = document.createElement('div');
            cardElement.className = `market-card card-${card.faction}`;
            cardElement.innerHTML = `
                <div class="card-image" style="background-image: url('${card.image}');">
                    <div class="rarity ${card.rarity}">${card.edition}</div>
                </div>
                <div class="px-4 py-2 bg-[#0E0E22]">
                    <h3 class="text-2xl font-bold mb-2 text-${card.faction === "lightning" ? "purple" : card.faction === "fire" ? "orange" : "ciel"}">${card.name} (${card.quantity})</h3>
                    <p class="text-xs text-gray-500 mb-2">${card.rarity}</p>
                    <p class="text-xs text-gray-300 mb-6">${card.description}</p>
                    <div class="flex justify-between text-gray-400">
                        <div><span>${card.price} 💎</span></div>
                        <div><span>⚔️ ${card.attack}</span><span>🛡️ ${card.defense}</span><span>⚡ ${card.speed}</span></div>
                    </div>
                </div>
            `;
            // cardContainer.appendChild(cardElement);
            deckContainer.appendChild(cardElement);
        });
    }

function displayCards(list){
    if (window.location.pathname.includes("/market.html")) add_cart(list, 0);
    if (window.location.pathname === "/deck.html") {
    showDeckCards(list);
    }
    if (window.location.pathname === "/favorite.html") display_favorite(list);

}
if(window.location.pathname === "/deck.html") {
    displayCards(deck); 
}else if (window.location.pathname.includes("/market.html")) {
    displayCards(cards); 
}else if (window.location.pathname === "/favorite.html") {
    displayCards(favorite_cards);
}

