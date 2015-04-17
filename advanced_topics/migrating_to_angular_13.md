## Angular 1.3

### About

The objective of this article is to address things to take in consideration when migrating from Angular 1.2 to Angular 1.3 for Baclbase widget development.

### When to use ?

If you don't have to support Internet Explorer 8, and you are using a CXP Portal 5.5.1.1 (at least), you can upgrade AngularJS to 1.3.x branch and enjoy all new features and performance improvements!

### New features

 - **[One-time bindings](https://docs.angularjs.org/guide/expression#one-time-binding)** – one time bindings are now built in AngularJS 1.3! by prefixing an expression with `::`, it will only be interpolated once, and then no longer watched
 - **[ngAria](https://docs.angularjs.org/api/ngAria)** – a new module that helps make custom components in Angular more accessible by default
 - **[ngMessages](https://docs.angularjs.org/api/ngMessages)** – a new directive that simplifies writing and coordinating feedback for on form validity
 - **[ngModelOptions](https://docs.angularjs.org/api/ng/directive/ngModelOptions)** – a directive that makes it easy to customise the behavior of bound models. For instance: _debouncing_, _getter-setter-style models_, _update-on-blur_, and more...
 - **[Strict DI](https://docs.angularjs.org/error/$injector/strictdi)** – an option for finding places in your application that will not minify due to use of short-hand DI syntax
 - **[Angular Hint](http://blog.thoughtram.io/angularjs/2014/11/06/exploring-angular-1.3-angular-hint.html)** - now fully supported in AngularJS 1.3!

### Performance improvements

AngularJS 1.3.x has substantial performance improvements that reduce memory consumption, increase the speed of common DOM operations, and improve overall latency of Angular apps. You can take a look at the [benchmarks in the AngularJS source code](https://github.com/angular/angular.js/tree/master/benchmarks) on GitHub for more information.

#### One-time bindings

An expression that starts with `::` is considered a one-time expression. One-time expressions will stop recalculating once they are stable, which happens after the first digest if the expression result is a non-undefined value (see value stabilisation algorithm below).

The main purpose of one-time binding expression is to provide a way to create a binding that gets deregistered and frees up resources once the binding is stabilised. Reducing the number of expressions being watched makes the digest loop faster and allows more information to be displayed at the same time.

```html
<div ng-controller="EventController">
  <button ng-click="clickMe($event)">Click Me</button>
  <p id="one-time-binding-example">One time binding: {{::name}}</p>
  <p id="normal-binding-example">Normal binding: {{name}}</p>
</div>
```

#### ngModelOptions

**ngModelOptions** allows us to control how `ngModel` updates are done. This includes things like updating the model only after certain events are triggered or a debouncing delay, so that the view value is reflected back to the model only after a timer expires.

 - updateOn:

```html
<input type="text" ng-model="name" ng-model-options="{ updateOn: 'blur' }">
<p>Hello {{name}}!</p>
```

 - debounce:

```html
<input type="search" ng-model="searchQuery" ng-model-options="{ debounce: 300 }">
<p>Search results for: {{searchQuery}}</p>
```

 - using both debounce and updateOn:

```html
<input type="search" ng-model="searchQuery" ng-model-options="{ updateOn: 'default blur', debounce: { 'default': 300, 'blur': 0 } }">
<p>Search results for: {{searchQuery}}</p>
```

#### Stateless filters

For performance reasons, the Angular team introduced a new concept in AngularJS 1.3: **stateless filters**. This means that by default, filters cache the evaluated value so they don't have to be re-evaluated all the time.

In order to bypass this behavior, you will need to set the `$stateful` property of your filter to `true`, as such:

```javascript
var module = angular.module('MyApp', [])

module.filter('customFilter', ['SomeService', function (SomeService) {
    function customFilter(input) {
        // manipulate input with someService
        input += someService.getData();
        return input;
    }

    customFilter.$stateful = true; // this is how you set your filter's stateful property to 'true'

    return customFilter;
}]);
```
