export enum MerkleNodeType {
  INTERMEDIATE = 'INTERMEDIATE',
  LEAF = 'LEAF',
}

export interface MerkleNode {
  type: MerkleNodeType
  value: string
  left?: MerkleNode
  right?: MerkleNode
}
