const b4a = require('b4a')

module.exports = class TinyBufferMap {
  constructor (o) {
    this.m = o ? [...o] : []
  }

  get size () {
    return this.m.length
  }

  get (key) {
    for (let i = 0; i < this.m.length; i++) {
      const w = this.m[i]
      const k = w[0]
      if (equals(k, key)) return w[1]
    }

    return undefined
  }

  set (key, value) {
    for (let i = 0; i < this.m.length; i++) {
      const w = this.m[i]
      const k = w[0]
      if (equals(k, key)) {
        w[1] = value
        return
      }
    }

    this.m.push([key, value])
  }

  delete (key) {
    for (let i = 0; i < this.m.length; i++) {
      const w = this.m[i]
      const k = w[0]
      if (equals(k, key)) {
        this.m.splice(i, 1)
        return
      }
    }
  }

  has (key) {
    return this.get(key) !== undefined
  }

  * [Symbol.iterator] () {
    for (let i = 0; i < this.m.length; i++) {
      yield this.m[i]
    }
  }

  * keys () {
    for (let i = 0; i < this.m.length; i++) {
      yield this.m[i][0]
    }
  }

  * values () {
    for (let i = 0; i < this.m.length; i++) {
      yield this.m[i][1]
    }
  }

  clear () {
    this.m = []
  }
}

function equals (a, b) {
  return a.equals ? a.equals(b) : b4a.equals(a, b)
}
