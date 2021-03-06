var assert = require('assert')
var ci = require('../')

/* global describe, it */

describe('+ coininfo()', function () {
  describe('iterate all coins', function () {
    var coins = [
      'blk',
      'btc', 'btc-test',
      'doge', 'doge-test',
      'gmc',
      'ltc', 'ltc-test',
      'mue',
      'nmc',
      'ppc',
      'rdd', 'rdd-test',
      'uro', 'uro-test'
    ]

    coins.forEach(function (c) {
      it('should return valid data for ' + c, function () {
        assert(ci(c).versions.scripthash)
      })
    })
  })

  describe('versions', function () {
    it('should return the version', function () {
      var v = ci('LTC').versions
      assert.equal(v.public, 0x30)
      assert.equal(v.private, 0xB0)
    })

    it('should return bip32', function () {
      var v = ci('BTC-TEST').versions.bip32
      assert.equal(v.public, 0x043587cf)
      assert.equal(v.private, 0x04358394)
    })

    describe('> when does not have bip32', function () {
      it('should return null', function () {
        var v = ci('PPC').versions.bip32
        assert(!v)
      })
    })

    describe('> when full formal coin name is passed', function () {
      it('should return coin info', function () {
        assert(ci('bitcoin'))
      })
    })
  })

  describe('> when coin not found', function () {
    it('should return null', function () {
      var info = ci('XXX')
      assert.equal(info, null)
    })
  })

  describe('> when accessing through property', function () {
    var bitcoin = ci.bitcoin
    assert.equal(bitcoin.main.versions.public, 0)
    assert.equal(bitcoin.test.versions.public, 0x6f)
  })
})
