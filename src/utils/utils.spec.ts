import { createHash } from 'crypto'

import { MerkleNode, MerkleNodeType } from '../models'
import { createLeafNode, createIntermediateNode } from './utils'

describe('utils', () => {
  test('createLeafNode() should return a valid leaf node', () => {
    const expectedResult: MerkleNode = {
      type: MerkleNodeType.LEAF,
      value: createHash('sha256')
        .update('1')
        .digest('base64'),
    }

    const { type, value } = createLeafNode('1')

    expect(type).toEqual(expectedResult.type)
    expect(value).toEqual(expectedResult.value)
  })

  test('createIntermediateNode() should return a valid intermediate node', () => {
    const leftNode: MerkleNode = {
      type: MerkleNodeType.LEAF,
      value: createHash('sha256')
        .update('1')
        .digest('base64'),
    }
    const rightNode: MerkleNode = {
      type: MerkleNodeType.LEAF,
      value: createHash('sha256')
        .update('1')
        .digest('base64'),
    }
    const expectedIntermediateNode: MerkleNode = {
      type: MerkleNodeType.INTERMEDIATE,
      value: createHash('sha256')
        .update(leftNode.value + rightNode.value)
        .digest('base64'),
      left: leftNode,
      right: rightNode,
    }

    const { type, value, left, right } = createIntermediateNode(
      leftNode,
      rightNode
    )

    expect(type).toEqual(MerkleNodeType.INTERMEDIATE)
    expect(value).toEqual(expectedIntermediateNode.value)
    expect(left).toEqual(expectedIntermediateNode.left)
    expect(right).toEqual(expectedIntermediateNode.right)
  })
})
