/* eslint-disable no-await-in-loop */
/* eslint-disable class-methods-use-this */
import { MerkleNode } from '../models'
import { createLeafNode, createIntermediateNode } from '../utils'

export class MerkleTree {
  private root: MerkleNode
  private height: number
  private dictionary: Array<Array<MerkleNode>>

  constructor() {
    this.height = 0
    this.dictionary = []
  }

  private incrementHeight() {
    this.height += 1
  }

  private addToDictionary(data: Array<MerkleNode>) {
    this.dictionary.push(data)
  }

  private async createLeafLevel(data: string[]) {
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

      const leftLeafNode = await createLeafNode(leftLeafValue)
      const rightLeafNode = await createLeafNode(rightLeafValue)
      const parent = await createIntermediateNode(leftLeafNode, rightLeafNode)

      leafLevel.push(parent)
    }

    if (length % 2 !== 0) {
      const lastValue = data[length - 1]

      const lastNode = await createLeafNode(lastValue)
      const parent = await createIntermediateNode(lastNode)

      leafLevel.push(parent)
    }

    this.incrementHeight()
    this.addToDictionary(leafLevel)

    return leafLevel
  }

  private async createIntermediateLevel(data: Array<MerkleNode>) {
    const length = data.length

    const parents: Array<MerkleNode> = []

    for (let i = 0; i < length - 1; i += 2) {
      const leftNode = data[i]
      const rightNode = data[i + 1]

      const parent = await createIntermediateNode(leftNode, rightNode)

      parents.push(parent)
    }

    if (length % 2 !== 0) {
      const lastNode = data[length - 1]

      const parent = await createIntermediateNode(lastNode)

      parents.push(parent)
    }

    this.incrementHeight()
    this.addToDictionary(parents)

    return parents
  }

  public async build(data: string[]) {
    let parents = await this.createLeafLevel(data)

    while (parents.length > 1) {
      parents = await this.createIntermediateLevel(parents)
    }

    this.incrementHeight()
    this.root = parents[0]
  }

  public getRoot(): MerkleNode {
    return this.root
  }

  public getHeight(): number {
    return this.height
  }
}
