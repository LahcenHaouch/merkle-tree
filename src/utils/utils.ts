import { createHash } from 'crypto'

import { MerkleNode, MerkleNodeType } from '../models'

export function sha256(value: string): string {
  return createHash('sha256')
    .update(value)
    .digest('base64')
}

export function createLeafNode(value: string): MerkleNode {
  return {
    type: MerkleNodeType.LEAF,
    value: sha256(value),
  }
}

export function createIntermediateNode(
  leftNode: MerkleNode,
  rightNode?: MerkleNode
): MerkleNode {
  const { value: leftValue } = leftNode

  if (rightNode) {
    const { value: rightValue } = rightNode

    return {
      type: MerkleNodeType.INTERMEDIATE,
      value: sha256(leftValue + rightValue),
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
