import modalTpl from "../partials/components/shopping-cart-modal.hbs";
import games from "../assets/store_game.json";

const prepareModalButtons = () => {
  const buttons = document.querySelectorAll('[data-modal-name]');
  
  buttons.forEach(button => {
    button.addEventListener("click", function() {
      const { action, modalName } = this.dataset;

      window.dispatchEvent(new Event(`${action}-${modalName}`));
    });
  });

  const cartActions = document.querySelectorAll('.shopping-cart-modal-wrapper [data-action]');
  
  cartActions.forEach(button => {
    button.addEventListener("click", function() {
      const { action } = this.dataset;

      window.dispatchEvent(new CustomEvent(action, { detail: this.dataset}));
    });
  });
}

const prepareModal = () => {
  let modalWrapper = document.getElementsByClassName('shopping-cart-modal-wrapper')?.[0];

  if (!modalWrapper) {
    modalWrapper = document.createElement('div');
    modalWrapper.classList.add('shopping-cart-modal-wrapper');
    document.body.appendChild(modalWrapper)
  }

  const items = getCurrentCartItems()

  modalWrapper.innerHTML = modalTpl({ items });
  prepareModalButtons();
};

const showModal = () => {
  const wrapper = document.getElementsByClassName('shopping-cart-modal-wrapper')?.[0];

  if (!wrapper) return;

  wrapper.classList.add('show-modal');
}

const hideModal = () => {
  const wrapper = document.getElementsByClassName('shopping-cart-modal-wrapper')?.[0];

  if (!wrapper) return;

  wrapper.classList.remove('show-modal');
}

window.addEventListener('hashchange', function () {
  prepareModal()
});

window.addEventListener('show-shopping-cart-modal', function () {
  showModal();
});

window.addEventListener('hide-shopping-cart-modal', function () {
  hideModal()
});

const getGameById = (id) => {
  return games.find(it => it.id == id);
}

const addGameToCart = (game) => {
  const items = getCurrentCartItems()
  const exist = items.some(it => it.id == game.id);

  if (exist) return;

  items.push(game);
  localStorage.setItem("cart-items", JSON.stringify(items));
}

const removeGameFromCart = (game) => {
  const items = getCurrentCartItems().filter(it => it.id != game.id);
  localStorage.setItem("cart-items", JSON.stringify(items));
}

const clearShoppingCart = (game) => {
  localStorage.setItem("cart-items", JSON.stringify([]));
}

const getCurrentCartItems = () => {
  const items = localStorage.getItem("cart-items");

  if (!items) return [];

  return JSON.parse(items);
}

window.addEventListener('add-to-shopping-cart', function (e) {
  const { gameId } = e.detail;
  const game = getGameById(gameId);

  addGameToCart(game);
  prepareModal()
});

window.addEventListener('remove-from-shopping-cart', function(e) {
  const { gameId } = e.detail;
  const game = getGameById(gameId);

  removeGameFromCart(game);
  prepareModal()
});

window.addEventListener('clear-shopping-cart', function(e) {
  clearShoppingCart();
  hideModal()
  prepareModal()
});

window.addEventListener('complete-order', function(e) {
  const items = getCurrentCartItems();

  if (!items.length) return;

  alert('Your order completed!')

  clearShoppingCart();
  hideModal()
  prepareModal()
});
