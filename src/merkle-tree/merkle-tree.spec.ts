import { MerkleTree } from './merkle-tree'

describe('merkle-tree', () => {
  test('creation of a merkle-tree', () => {
    const expectedHeight = 3
    const result = new MerkleTree(['1', '2', '3', '4'])

    expect(result.getHeight()).toEqual(expectedHeight)
  })
})
