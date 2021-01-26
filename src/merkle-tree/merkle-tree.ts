/* eslint-disable class-methods-use-this */
import { MerkleNode } from '../models'
import { createLeafNode, createIntermediateNode } from '../utils'

export class MerkleTree {
  private levels: Array<Array<MerkleNode>>

  constructor(data: string[]) {
    this.levels = []
    let parents = this.createLeafLevel(data)

    while (parents.length > 1) {
      parents = this.createIntermediateLevel(parents)
    }
  }

  private addToLevels(data: Array<MerkleNode>) {
    this.levels.push(data)
  }

  private createLeafLevel(data: string[]): Array<MerkleNode> {
    if (data.length < 2) {
      throw new Error(
        'You need at least two elements to construct a Merkle Tree'
      )
    }

    const leafLevel = data.map(value => createLeafNode(value))
    this.addToLevels(leafLevel)

    return leafLevel
  }

  private createIntermediateLevel(data: Array<MerkleNode>): Array<MerkleNode> {
    const length = data.length

    const parents: Array<MerkleNode> = []

    for (let i = 0; i < length - 1; i += 2) {
      const leftNode = data[i]
      const rightNode = data[i + 1]

      const parent = createIntermediateNode(leftNode, rightNode)

      parents.push(parent)
    }

    if (length % 2 !== 0) {
      const lastNode = data[length - 1]

      const parent = createIntermediateNode(lastNode)

      parents.push(parent)
    }

    this.addToLevels(parents)

    return parents
  }

  public getRoot(): MerkleNode {
    const [root] = this.levels[this.levels.length - 1]

    return root
  }

  public getHeight(): number {
    return this.levels.length
  }

  public getLevel(level: number): Array<string> | undefined {
    const result = this.levels[level]

    if (result) {
      return result.map(({ value }) => value)
    }

    return undefined
  }
}
