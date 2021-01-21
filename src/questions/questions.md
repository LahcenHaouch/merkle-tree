# Questions

## In the illustration, let’s imagine I know the whole Merkle tree. Someone gives me L2 data block but I don’t trust him. How can I check if L2 data is valid?

I can calculate hash(L2) if single node or hash(L1 + L2) and compare to to the value of the parent node

## I know only the L3 block and the Merkle root. What minimum information do I need to check that the L3 block and the Merkle root belong to the same Merkle tree?

I need to know the hash of the data contained in the L3 block

## What are some Merkle tree use cases?

Versioning systems, databases, p2p system
