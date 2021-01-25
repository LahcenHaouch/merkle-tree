import { sha256 } from '../utils'
import { MerkleTree } from './merkle-tree'

describe('merkle-tree', () => {
  const leftValue = sha256('1')
  const rightValue = sha256('2')
  test('getRoot().value should return the correct value', () => {
    const expectedRootValue = sha256(leftValue + rightValue)

    const result = new MerkleTree(['1', '2'])

    expect(result.getRoot().value === expectedRootValue)
  })

  test('getRoot().value for odd number of elements should return the correct value', () => {
    const lastElementValue = sha256('3')

    const intermediateNodeValue = sha256(leftValue + rightValue)

    const expectedRootValue = sha256(intermediateNodeValue + lastElementValue)

    const result = new MerkleTree(['1', '2', '3'])

    expect(result.getRoot().value === expectedRootValue)
  })

  test('getHeight() should return the correct number', () => {
    const expectedHeight = 3

    const result = new MerkleTree(['1', '2', '3', '4'])

    expect(result.getHeight()).toEqual(expectedHeight)
  })

  test('getLevel() should return an array of hashes', () => {
    const result = new MerkleTree(['1', '2'])

    const level = result.getLevel(0)

    expect(level).toEqual([leftValue, rightValue])
  })
})
