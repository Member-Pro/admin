import { createApp } from 'vue';
import { Auth } from 'aws-amplify';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCopy, faPencilAlt, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import App from './App.vue';
import router from './router';
import store from './store';
import authConfig from './authConfig';
import * as filters from './helpers/filters';

Auth.configure(authConfig);

const app = createApp(App)
  .use(store)
  .use(router);

app.config.globalProperties.$filters = filters;

library.add(faCopy, faPencilAlt, faPlus, faTrash);

app.component('fa-icon', FontAwesomeIcon);

app.mount('#app');

// Clear the console on HMR reload
// https://stackoverflow.com/a/53867503/976042
window.addEventListener('message', (e) => {
  if (e.data && typeof e.data === 'string' && e.data.match(/webpackHotUpdate/)) {
    console.log('hot reload happened');
    console.clear();
  }
});
