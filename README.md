# Git as Blockchain

Constructing a blockchain on top of Git.

## Commands

Mine for a new block.

```
git add -A
gitchain mine -target 8
```

Mine for a new commit with the staged files meeting the specified target.
The target is expressed as the number of leading bits of the SHA that should be 0.