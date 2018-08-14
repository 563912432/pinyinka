// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import 'muse-ui/dist/muse-ui.css'

import { Dialog , Button } from 'muse-ui'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Dialog)
Vue.use(Button)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  methods: {
    open () {
      this.$alert('Hello world', 'Alert')
      this.$confirm('Hello world ?', 'Confirm')
      this.$prompt('Input Some I', 'Prompt')
    }
  }
})
