import { createHmac } from 'crypto'

import { MerkleNode, MerkleNodeType } from '../models'

const SECRET = 'not sure what to put here'
const hasher = createHmac('sha256', SECRET)

export function createLeafNode(value: string) {
  return {
    type: MerkleNodeType.LEAF,
    value: hasher.update(value),
  }
}

export function createIntermediateNode(
  leftNode: MerkleNode,
  rightNode?: MerkleNode
) {
  const { value: leftValue } = leftNode

  if (rightNode) {
    const { value: rightValue } = rightNode
    return {
      type: MerkleNodeType.INTERMEDIATE,
      value: hasher.update(leftValue + rightValue),
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
