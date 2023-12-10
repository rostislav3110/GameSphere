import games from '../assets/games.json';
import popularCardTemplate from '../partials/section_main/popular_card.hbs';

let total = 3;

window.addEventListener("load", (event) => {
    const loadMore =  document.querySelector('.popular-btn');

    if (!loadMore) return;

    showGames();

    loadMore.addEventListener("click", () => {
        total += 3;
        showGames();

        if (total >= games.length) {
            loadMore.style.display = 'none'
        }
    })
});

const showGames = () => {
    const popularGamesWrapper =  document.getElementById('popular_games');
    let inner = '';

    for (let index in games) {
        if (parseInt(index) + 1 > total) {
            break
        };

        inner += popularCardTemplate(games[index]);
    }

    popularGamesWrapper.innerHTML = inner;
}