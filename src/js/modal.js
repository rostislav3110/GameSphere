import modalTpl from "../partials/components/shopping-cart-modal.hbs";

const prepareModalButtons = () => {
  const buttons = document.querySelectorAll('[data-modal-name]');
  
  buttons.forEach(button => {
    button.addEventListener("click", function() {
      const { action, modalName } = this.dataset;

      window.dispatchEvent(new Event(`${action}-${modalName}`));
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

  modalWrapper.innerHTML = modalTpl();
};

const showModal = () => {
  const wrapper = document.getElementsByClassName('shopping-cart-modal-wrapper')?.[0];
  const modal = document.getElementsByClassName('shopping-cart-modal')?.[0];

  if (!modal || !wrapper) return;

  modal.classList.add('show-modal');
  wrapper.style.display = 'block';
}

const hideModal = () => {
  const wrapper = document.getElementsByClassName('shopping-cart-modal-wrapper')?.[0];
  const modal = document.getElementsByClassName('shopping-cart-modal')?.[0];

  if (!modal || !wrapper) return;

  modal.classList.remove('show-modal');
  wrapper.style.display = 'none';
}

window.addEventListener('hashchange', function () {
  prepareModal()
  prepareModalButtons()
});

window.addEventListener('show-shopping-cart-modal', function () {
  showModal();
});

window.addEventListener('hide-shopping-cart-modal', function () {
  hideModal()
});
