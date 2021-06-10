# validate
An easy to use validation library.

```html
<script src="https://cdn.jsdelivr.net/gh/Explosion-Scratch/validate/index.js">
```
Now you can use it like this:

```js
const obj = validate({
  num: Number,
  date: Date,
  str: String,
})

obj.num = 'hehe this is a string';//Throws error.
obj.num = 123;//Works! (not in this particular example because the error stopped the script)
```
Also there are options:

- `onGet` A callback function to run when a value is accessed from the object.
- `onSet` A callback function to run when a value attempted to be set in the object.
- `transformFunction` A function to run on and values when attempting to be set. E.g. to convert strings to numbers you could set this to `(i) => i.toString()`
- `defaultValue` What to return if the property doesn't exist when getting.
- `autoConvert` Automatically convert values to their intended format (if possible).
- `startingObject` The object to start out with.
