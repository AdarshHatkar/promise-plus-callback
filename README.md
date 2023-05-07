# promise-plus-callback
Make a callback-based or promise-based functions to support both promises and callbacks.  Uses the native promise implementation. with typescript support.

[![npm Package](https://img.shields.io/npm/v/promise-plus-callback.svg)](https://www.npmjs.org/package/promise-plus-callback)
[![License](https://img.shields.io/npm/l/promise-plus-callback.svg)](https://github.com/AdarshHatkar/promise-plus-callback/blob/main/LICENSE)


Installation
------------

    npm i promise-plus-callback


Import or Require
-----------------
    import ppc from "promise-plus-callback";
    OR
    import {fromCallback,fromPromise} from "promise-plus-callback";
    OR
    const ppc = require("promise-plus-callback");
    OR
    const fromCallback = require("promise-plus-callback");
    OR
    const fromPromise = require("promise-plus-callback");

## Here is an example usage of fromCallback function:

Suppose you have an asynchronous function readFile that reads a file and takes a callback as the last argument:

```js
function readFile(filename, callback) {
  // Asynchronous operation to read file
}
```
You can convert this function to return a Promise with fromCallback function as follows:
```js
import {fromCallback} from "promise-plus-callback";

const readFilePromise = fromCallback(readFile);

// You can now call the function with a Promise:
readFilePromise(filename)
  .then((data) => console.log(data))
  .catch((err) => console.error(err));

// Or with a callback:
readFilePromise(filename, (err, data) => {
  if (err) {
    console.error(err);
  } else {
    console.log(data);
  }
});
```
This allows you to use the same function in either Promise-based or callback-based code.


## Here is an example usage of fromPromise function:

Suppose we have a function getUser that returns a promise:
```js
function getUser(userId) {
  return new Promise((resolve, reject) => {
    // some async operation to fetch user
    setTimeout(() => {
      if (userId === '123') {
        resolve({ id: '123', name: 'John Doe' });
      } else {
        reject(new Error('User not found'));
      }
    }, 100);
  });
}
```
We can use fromPromise to create a function that can be called with a callback:
```js
import {fromPromise} from "promise-plus-callback";

const getUserCallback = fromPromise(getUser);

getUserCallback('123', (err, user) => {
  if (err) {
    console.error(err);
  } else {
    console.log(user); // { id: '123', name: 'John Doe' }
  }
});
```
In the above example, the getUserCallback function accepts a callback as its last argument. If a callback is provided, it calls the original getUser function with the provided arguments and passes the result or error to the callback. If no callback is provided, it returns a promise.

We can also call getUserCallback without a callback to get a promise:
```js
getUserCallback('123')
  .then(user => console.log(user)) // { id: '123', name: 'John Doe' }
  .catch(err => console.error(err));
```

# License
promise-plus-callback is licensed under the MIT License.