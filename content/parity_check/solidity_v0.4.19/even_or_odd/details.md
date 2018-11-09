## Left Padded Bytes32 Array

The left-padded `bytes32` array will contain some integer value padded on its left by a string of zeroes for every unused bit. For instance the value `15` would be:

In Hexidecimal:
```
000000000000000000000000000000000000000000000000000000000000000f
```

In Binary:
```
0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001111
```

> Solidity has built-in [explicit conversion](https://solidity.readthedocs.io/en/v0.4.19/types.html#explicit-conversions) that will be useful for this challenge. 