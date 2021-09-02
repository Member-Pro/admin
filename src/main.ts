import { createApp } from 'vue'
import { Auth } from 'aws-amplify';
import App from './App.vue'
import router from './router'
import store from './store'
import authConfig from './authConfig';

Auth.configure(authConfig);

createApp(App).use(store).use(router).mount('#app')

// Clear the console on HMR reload
// https://stackoverflow.com/a/53867503/976042
window.addEventListener('message', (e) => {
  if (e.data && typeof e.data === 'string' && e.data.match(/webpackHotUpdate/)) {
    console.log('hot reload happened')
    console.clear()
  }
});
