import { createApp } from 'vue';
import App from './App.vue';
import router from './components/router'; // Ensure this path is correct

createApp(App).use(router).mount('#app');
