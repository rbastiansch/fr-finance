import { test } from '@japa/runner'
import { parseAmount, removeDecimal } from '#utils/number'

test('removeDecimal', ({ assert }) => {
  assert.equal(removeDecimal('1000.00'), '1000')
  assert.equal(removeDecimal('1000,00'), '1000')
})

test('parseAmount', ({ assert }) => {
  assert.isNull(parseAmount(''))
  assert.isNull(parseAmount('any word'))
  assert.equal(parseAmount('1,000'), 1000)
})
