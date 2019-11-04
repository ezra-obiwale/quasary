import Store from './store'
import Server from './server'

export default {
  install: function (Vue, store, httpAdapter) {
    store.registerModule('quasary', Store)
    Vue.prototype.$server = new Server(httpAdapter)
  }
}
