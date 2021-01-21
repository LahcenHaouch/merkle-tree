/* eslint-disable no-await-in-loop */
/* eslint-disable class-methods-use-this */
import { MerkleNode } from '../models'
import { createLeafNode, createIntermediateNode } from '../utils'

export class MerkleTree {
  private root: MerkleNode
  private height: number
  private dictionary: Array<Array<MerkleNode>>

  constructor(data: string[]) {
    this.height = 0
    this.dictionary = []
    let parents = this.createLeafLevel(data)

    while (parents.length > 1) {
      parents = this.createIntermediateLevel(parents)
    }

    this.incrementHeight()
    this.root = parents[0]
  }

  private incrementHeight() {
    this.height += 1
  }

  private addToDictionary(data: Array<MerkleNode>) {
    this.dictionary.push(data)
  }

  private createLeafLevel(data: string[]) {
    const length = data.length

    if (length < 2) {
      throw new Error(
        'You need at least two elements to construct a Merkle Tree'
      )
    }
    const leafLevel: Array<MerkleNode> = []

    for (let i = 0; i < length - 1; i += 2) {
      const leftLeafValue = data[i]
      const rightLeafValue = data[i + 1]

      const leftLeafNode = createLeafNode(leftLeafValue)
      const rightLeafNode = createLeafNode(rightLeafValue)
      const parent = createIntermediateNode(leftLeafNode, rightLeafNode)

      leafLevel.push(parent)
    }

    if (length % 2 !== 0) {
      const lastValue = data[length - 1]

      const lastNode = createLeafNode(lastValue)
      const parent = createIntermediateNode(lastNode)

      leafLevel.push(parent)
    }

    this.incrementHeight()
    this.addToDictionary(leafLevel)

    return leafLevel
  }

  private createIntermediateLevel(data: Array<MerkleNode>) {
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

    this.incrementHeight()
    this.addToDictionary(parents)

    return parents
  }

  public getRoot(): MerkleNode {
    return this.root
  }

  public getHeight(): number {
    return this.height
  }
}
