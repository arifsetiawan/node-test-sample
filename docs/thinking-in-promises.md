# Thinking in promises and generators

See http://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html for great reference on how to promise.

### Callback

Call function, it does things. At some point in the future it will call callback at the end to exit the function and pass the result to caller

```
function func1(params, callback) {
    // do something
    // when done or have error
    return callback(err, result)
}
```

### Promise

Call function, it will return promise. At some point in the future promise might be resolved with result or rejected with error

```
function func1(params) {
    return Promise.resolve().then(function(){

    })
}
```

### Generators and promise

Generator can be used wrap sequences of promises executions so we get nice sync like code. 

```
function func1(params) {
    return Promise.resolve(...)
}

function func2(params) {
    return Promise.resolve(...)
}

// http://pag.forbeslindesay.co.uk/#/22
function async(makeGenerator) {
    return function() {
        var generator = makeGenerator.apply(this, arguments);

        function handle(result) {
            // result => { done: [Boolean], value: [Object] }
            if (result.done) return Promise.resolve(result.value);

            return Promise.resolve(result.value).then(function(res) {
                return handle(generator.next(res));
            }, function(err) {

                return handle(generator.throw(err));
            });
        }

        try {
            return handle(generator.next());
        } catch (ex) {
            return Promise.reject(ex);
        }
    };
};

(async(function*() {
    try {
        // first yield will call func1 and return promise
        var res1 = yield func1(filename);

        // when it complete, it resolve the value, return it and calling next yield with generator.next()

        // res1 (value resolved from func1 promise) is passed to func2. 
        var res2 = yield func2(res1);
    }
    catch (ex) {
        console.error('error', ex);
    }
}))();
```
