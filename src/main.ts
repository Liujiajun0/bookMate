import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router";
import store from "./store";
import "element-plus/dist/index.css";
import * as Icons from '@element-plus/icons-vue'
const app = createApp(App);
app.use(router).use(store).mount("#app");
// Object.keys(Icons).forEach(key => {
//     app.component(key, Icons[key as keyof typeof Icons])
// })