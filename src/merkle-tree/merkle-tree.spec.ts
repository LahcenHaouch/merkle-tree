import { MerkleTree } from './merkle-tree'

describe('merkle-tree', () => {
  test('creation of a merkle-tree', async () => {
    const expectedHeight = 3
    const result = new MerkleTree()
    await result.build(['1', '2', '3', '4'])

    const root = result.getRoot()

    console.log(root.value)

    expect(result.getHeight()).toEqual(expectedHeight)
  })
})
