export default class {

  constructor (dpd) {
    this.dpd = dpd
  }

  connect (col) {
    this.col = this.dpd.col(col)
  }

  get () {
    return this.col.get(...arguments)
  }

  post () {
    return this.col.post(...arguments)
  }

  put () {
    return this.col.put(...arguments)
  }

  delete () {
    return this.col.del(...arguments)
  }

  head () {
    throw new Error('Head requests not supported')
  }
}
