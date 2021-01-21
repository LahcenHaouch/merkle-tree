import { MerkleNode, MerkleNodeType } from '../models'

export function createLeafNode(value: string) {
  return {
    type: MerkleNodeType.LEAF,
    value,
  }
}

export function createInternalNode(
  leftNode: MerkleNode,
  rightNode?: MerkleNode
) {
  const { value: leftValue } = leftNode

  if (rightNode) {
    const { value: rightValue } = rightNode
    return {
      type: MerkleNodeType.INTERNAL,
      value: leftValue + rightValue,
      left: leftNode,
      right: rightNode,
    }
  }
  return {
    type: MerkleNodeType.INTERNAL,
    value: leftValue,
    left: leftNode,
  }
}
