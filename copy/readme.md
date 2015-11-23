# Universal Copy

Deep copy anything. Works on Objects, Arrays, RegExp, Dates, TypedArrays,
ArrayBuffers, and more.

Part of [pasta](https://github.com/nrn/pasta).

```javascript
var universalCopy = require('universal-copy')
```
or
```javascript
var copy = require('pasta/copy')
```

## API

### universalCopy(anything)

Returns a recursive deep copy of anything. Returns the originals for things
that are passed by value instead of reference, and functions, where the meaning
of copying is ambiguous. For everything else it creates a new object with the
same values as the old one, to the best of its ability. Copies symbols and
non-enumerable properties, uses define property to keep the same status as
the property being copied.

