## What would be an efficient way to modelize this? (models and database)

![Alt text](./SorareDiagram.png?raw=true "relational schema")

I would have used a relational database since the relation between the different entities is pretty clear and is not constantly changing.
(PostgreSQL like)

## What is your strategy to update rankings in real time?

Store rankings in a cache system
Update rankings at the end of each day (Friday to Monday)

## What are the trade-offs?

Recent data isn't persisted, and there is some risk to lose it if we're using non fault tolerent systems

I think the usage of two databases could be interesting and would benifit the project,
One performant for writes
And one for reads.
