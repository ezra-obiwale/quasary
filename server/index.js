export default class {

  constructor (adapter) {
    this.adapter = adapter
  }

  connect () {
    return this.adapter.connect(...arguments)
  }

  get () {
    return this.adapter.get(...arguments)
  }

  post () {
    return this.adapter.post(...arguments)
  }

  put () {
    return this.adapter.put(...arguments)
  }

  delete () {
    return this.adapter.delete(...arguments)
  }

  head () {
    return this.adapter.head(...arguments)
  }
}
