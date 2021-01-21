import { createHash } from 'crypto'

import { MerkleNode, MerkleNodeType } from '../models'

export async function createLeafNode(value: string) {
  const hash = createHash('sha256')
    .update(value)
    .digest('base64')

  return {
    type: MerkleNodeType.LEAF,
    value: hash,
  }
}

export async function createIntermediateNode(
  leftNode: MerkleNode,
  rightNode?: MerkleNode
) {
  const { value: leftValue } = leftNode

  if (rightNode) {
    const { value: rightValue } = rightNode

    const hash = createHash('sha256')
      .update(leftValue + rightValue)
      .digest('base64')
    return {
      type: MerkleNodeType.INTERMEDIATE,
      value: hash,
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
