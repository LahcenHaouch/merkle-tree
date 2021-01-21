# merkle-tree

A Merkle tree is a relatively simple data structure that is used to check data integrity.
It’s a binary tree where each node contains a cryptographic hash of its two children.
Hparent = hash(Hleft + Hright)

If a node has only one child, its hash is the same as its child’s.

The hash of the root node of the tree is called the Merkle root. The leaves of the tree
contain the hashes of the input data.
