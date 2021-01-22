import { createHash } from 'crypto'

import { MerkleTree } from './merkle-tree'

describe('merkle-tree', () => {
  test('getRoot().value should return the correct value', () => {
    const leftValue = createHash('sha256')
      .update('1')
      .digest('base64')
    const rightValue = createHash('sha256')
      .update('2')
      .digest('base64')
    const expectedRootValue = createHash('sha256')
      .update(leftValue + rightValue)
      .digest('base64')

    const result = new MerkleTree(['1', '2'])

    expect(result.getRoot().value === expectedRootValue)
  })

  test('getHeight() should return the correct number', () => {
    const expectedHeight = 3

    const result = new MerkleTree(['1', '2', '3', '4'])

    expect(result.getHeight()).toEqual(expectedHeight)
  })

  test('getLevel() should return an array of hashes', () => {
    const leftValue = createHash('sha256')
      .update('1')
      .digest('base64')

    const rightValue = createHash('sha256')
      .update('2')
      .digest('base64')

    const result = new MerkleTree(['1', '2'])

    const level = result.getLevel(0)

    expect(level).toEqual([leftValue, rightValue])
  })
})
