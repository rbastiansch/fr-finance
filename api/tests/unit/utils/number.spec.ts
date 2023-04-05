import { test } from '@japa/runner'
import { removeDecimal, parseAmount } from 'Utils/number.utils'

test('removeDecimal', ({ assert }) => {
  assert.equal(removeDecimal('1000.00'), '1000')
  assert.equal(removeDecimal('1000,00'), '1000')
})

test('parseAmount', ({ assert }) => {
  assert.equal(parseAmount(''), null)
  assert.equal(parseAmount('any word'), null)
  assert.equal(parseAmount('1,000'), 1000)
})
