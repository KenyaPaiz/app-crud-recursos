import { renderHome } from './views/home.js';
import { renderForm } from './views/form.js';
import { renderList } from './views/list.js';
import { setActiveLink } from './components/navbar.js';

export const routes = {
  '#/': renderHome,
  '#/recursos': renderList,
  '#/nuevo': renderForm
};

export function initRouter(app) {
  function handleRoute() {
    const hash = window.location.hash;
    const route = routes[hash] ? hash : '#/';
    const renderView = routes[route];

    renderView(app);
    setActiveLink(route);
  }

  window.addEventListener('hashchange', handleRoute);
  window.addEventListener('load', handleRoute);

  handleRoute();
}
