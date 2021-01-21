import { Hmac } from 'crypto'

export enum MerkleNodeType {
  INTERMEDIATE = 'INTERMEDIATE',
  LEAF = 'LEAF',
}

export interface MerkleNode {
  type: MerkleNodeType
  value: Hmac
  left?: MerkleNode
  right?: MerkleNode
}
