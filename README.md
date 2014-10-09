reab [![Build Status](https://secure.travis-ci.org/Horsed/reab.png)](http://travis-ci.org/Horsed/reab) [![experimental](http://hughsk.github.io/stability-badges/dist/experimental.svg)](http://github.com/hughsk/stability-badges)
====

Reab enables declarative and reactive two-way data-bindings using RxJS. The idea is to bind HTML elements to observable sequences using directives in the form of HTML attributes. It looks like this:

```html
<span rb-text="counter"></span>
```
The use of an HTML attribute as a directives is inspired by AngularJS.

This is totally in a very early stage! Pull requests are welcome!

## Example

The following example counts the clicks on a button and prints the result to an element.

```html
<html>
<head>
  <script src="lib/lodash.min.js"></script>
  <script src="lib/jquery.min.js"></script>
  <script src="lib/rx.all.min.js"></script>
  <script src="lib/rx.jquery.min.js"></script>
  <script src="reab.js"></script>
</head>
<body rb-scope="app">

<button class="btn">increment!</button>

<span rb-text="counter"></span>

<script>
var clickCounter = Rx.Observable
  .fromEvent($('.btn'), 'click');
  .select(function(clickEvent, index) {
    return index + 1; // increment for every click event
  });
reab('app' {counter: clickCounter});
</script>

</body>
</html>
```

As you can see, there is an observable sequence of click events which produces incrementing numbers. The ```rb-text``` directive binds the ```span``` to that sequence. But not before telling reab to do so by mapping the name of the binding to an actual sequence (```{counter: clickCounter}```). Now for every new value coming from ```clickCounter``` the text of the ```span``` will be updated with this value.

## Installation

NOT YET RELEASED!!

Using bower:
```shell
$ bower install reab
```

Or download this repository [as a zip](https://github.com/Horsed/reab/archive/master.zip)

## Usage/API
As the example shows, reab's impact on your JavaScript is pretty small. It just requires you to tell it which observable sequences you want to bind to which scope:
```js
reab('app' {counter: clickCounter});
```
This tells reab that there is an HTML element with the ```rb-scope="app"``` directive that you want to couple to the ```clickCounter``` observable sequence which will be referenced by the name ```counter``` inside the scope element. This is implemented by a simple function taking these two parameters:

    reab = (scopeName, sequences) ->

Here is what the parameters mean:
* ```scopeName``` (_String_): The name of the scope to limit the DOM queries to. Reab will only look for its directives among the children of the element containing the ```rb-scope``` directive with ```scopeName```
* ```sequences``` (Object): Map of sequence names to sequences. The keys have to match the values of reab's directives.


## Directives

### rb-scope="name"
This directive is used to scope DOM queries.

      $('[rb-scope=' + scopeName + ']').each(->
        scopeName = $(this).attr('rb-scope')
        $scope = $(this)

Don't use this directive on multiple nested elements - that doesn't work, yet.

Binding is done by a generic function taking the name of the directive and a handler function that is invoked whenever the corresponding observable sequence emits a new value:

        ltAttr = (ltAttr, handler) ->
          $scope.find('[' + ltAttr + ']').each(->
            attrVal = $(this).attr(ltAttr)

            bind = (seqName) ->
              if not sequences[seqName] then throw new Error('no sequence named ' + seqName + ' for binding ' + ltAttr + ' in controller ' + scopeName)
              
              sequences[seqName].subscribe((value) ->
                $scope.find('[' + ltAttr + '="' + attrVal + '"]').each(_.partial(handler, value)))
            
            if _.contains(attrVal, ',')
              _.forEach(attrVal.split(','), bind)
            else
              bind(attrVal)
          )

By having a generic binding function we are able to declaratively implement each binding directive. So let's see which directives we have so far.

### rb-text="name[,name]"
Writes every new value of the sequences to the text of an element.

        ltAttr('rb-text', (value) -> $(this).text(value))

### rb-show="name[,name]"
For every new value of the sequences makes the element visible.

        ltAttr('rb-show', (value) -> $(this).show())

### rb-hide="name[,name]"
For every new value of the sequences makes the element invisible. (how exactly - display:none?)

        ltAttr('rb-hide', (value) -> $(this).hide())

### rb-enable="name[,name]"
For every new value of the sequences enables the element.

        ltAttr('rb-enable', (value) -> $(this).prop('disabled', false))

### rb-disable="name[,name]"
For every new value of the sequences disables the element.

        ltAttr('rb-disable', (value) -> $(this).prop('disabled', true))

      )

Last but not least the ```reab``` global variable will be exposed for either Node.js or the browser environment:

    root = exports ? this
    unless root.reab
      root.reab = reab

## Limitations
* ```rb-scope``` doesn't work on multiple nested elements
* depends on lodash, jquery and rx-jquery
* the browser is currently the only actively supported environment