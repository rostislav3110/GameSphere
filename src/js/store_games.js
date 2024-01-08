import games from "../assets/store_game.json";
import storeGameCard from "../partials/section_store/game.hbs";

window.addEventListener("load", (event) => {
  prepareStore()
});

window.addEventListener('hashchange', function () {
  prepareStore()
});

const prepareStore = () => {
  showGames();

  const filters = document.querySelectorAll("[data-filter-type]");

  filters.forEach(function (filter) {
    filter.addEventListener("click", function () {
      const filterType = this.getAttribute("data-filter-type");
      window.history.pushState({}, "", "?type=" + filterType);

      showGames();
    });
  });
}

const prepareGameButtons = () => {
  const buttons = document.querySelectorAll('.game_list .btn-sale')

  buttons.forEach(button => {
    button.addEventListener("click", function(e) {
      e.preventDefault();

      const { gameId } = this.dataset;

      window.dispatchEvent(new Event(`add-to-shopping-cart`, { gameId }));
      console.log(gameId)
    });
  })
}

const showGames = () => {
  const gamesWrapper = document.getElementsByClassName("game_list")[0];
  const urlParams = new URLSearchParams(window.location.search);
  const type = urlParams.get("type");

  if (!gamesWrapper) return;

  let inner = "";

  for (let index in games) {
    if (type && games[index].type !== type) {
      continue;
    }

    inner += storeGameCard(games[index]);
  }

  gamesWrapper.innerHTML = inner;
  prepareGameButtons();
};
