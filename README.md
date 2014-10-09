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

Using NPM:

    $ npm install reab

Or download this repository [as a zip](https://github.com/Horsed/reab/archive/master.zip)

## Directives

### rb-scope="name"
This is used to scope DOM queries. Don't use this directive on multiple nested elements.

### rb-text="name[,name]"
Writes every new value of the sequences to the text of an element.

### rb-show="name[,name]"
For every new value of the sequences makes the element visible.

### rb-hide="name[,name]"
For every new value of the sequences makes the element invisible. (how exactly - display:none?)

### rb-enable="name[,name]"
For every new value of the sequences enables the element.

### rb-disable="name[,name]"
For every new value of the sequences disables the element.

## API
````js
reab(scopeName, sequences)
```

* ```scopeName``` (_String_): The name of the scope to limit the DOM queries to. Reab will only look for its directives among the children of the element containing the ```rb-scope``` directive with ```scopeName```
* ```sequences``` (Object): Map of sequence names to sequences. The keys have to match the values of reab's directives.

## Limitations
* ```rb-scope``` doesn't work on multiple nested elements
* depends on jquery and rx-jquery
* the browser is currently the only actively supported environment
