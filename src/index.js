import './styles/main.scss';

import games from './assets/games.json'

import template from './pages/main.hbs';

const data = { games };

const render = (template, data, targetElement) => {
  const renderedHTML = template(data);
  targetElement.innerHTML = renderedHTML;
};

const targetElement = document.getElementById('app');
render(template, data, targetElement);