# Questions

## In the illustration, let’s imagine I know the whole Merkle tree. Someone gives me L2 data block but I don’t trust him. How can I check if L2 data is valid?

I can calculate hash(L2) if single node or hash(L1 + L2) and compare to to the value of the parent node

## I know only the L3 block and the Merkle root. What minimum information do I need to check that the L3 block and the Merkle root belong to the same Merkle tree?

Itterating over every node in the firstLevel and check if the hash is the same as the one for L3

## What are some Merkle tree use cases?

Versioning systems, databases, p2p systems, file systems
