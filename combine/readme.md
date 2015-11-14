# pasta/combine

A simple shallow object combine. 

## combine(obj1[, obj2, ...objn)

Returns a new object that combines the properties of all objects passed to it.
Properties of objects to the right shadow properties of objects to the left.
Always creates a new object, never modifies an old one.
