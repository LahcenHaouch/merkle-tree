import { createHash } from 'crypto'

import { MerkleNode, MerkleNodeType } from '../models'

export function createLeafNode(value: string): MerkleNode {
  return {
    type: MerkleNodeType.LEAF,
    value: createHash('sha256')
      .update(value)
      .digest('base64'),
  }
}

export function createIntermediateNode(
  leftNode: MerkleNode,
  rightNode?: MerkleNode
): MerkleNode {
  const { value: leftValue } = leftNode

  if (rightNode) {
    const { value: rightValue } = rightNode

    const value = createHash('sha256')
      .update(leftValue + rightValue)
      .digest('base64')

    return {
      type: MerkleNodeType.INTERMEDIATE,
      value,
      left: leftNode,
      right: rightNode,
    }
  }
  return {
    type: MerkleNodeType.INTERMEDIATE,
    value: leftValue,
    left: leftNode,
  }
}
