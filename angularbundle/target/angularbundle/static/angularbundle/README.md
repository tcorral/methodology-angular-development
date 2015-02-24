#AngularJS widget methodology
##Introduction
This guide aims to collect a set of best practices to build  Backbase powered widget based on AngularJS. A dedicated bundle is part of this guide to show basic concepts to write code that will be easily maintainable upgrading AngularJs to next versions.
##References
Most of these widgets are built taking into account different best practices suggested by AngularJS Google Team and [John Papa's style guide](https://github.com/johnpapa/angularjs-styleguide) and [Todd Motto's style guide](https://github.com/toddmotto/angularjs-styleguide)

##Table of contents
1. ControllerAs
2. An example on how to avoid watcher into a controller
3. Reduce number of scope into a controller
4. RequireJS
4. logX
5. Directives
6. Hint AngularJS

##Conventions

##Performance

##AngularJS 1.3.x...let use it when possible

#Preparing for the future of AngularJS
During NG-EUROPE AngularJS team unveiled his plans for AngularJS 2.0. A lot of things are going to change in this framework and its time to start to adapt our code to the future releases. Intent of this bundle is to show tips on how to write code that will not be too difficult to maintain with next releases of AngularJS.

## Tips
It is always a good idea to use jQuery instead of jqLite (ng is not going to use it anymore in next releases)

If you don't have to support Internet Explorer 8 and you are using a CXP Portal 5.5.1.1 (it exposes the native XMLHttpRequest method) you can upgrade your angular version to 1.3.x branch and enjoy all new features like ngAria http://angularjs.blogspot.sk/2014/11/using-ngaria.html, the new one time binding (yes, ng is supposed to taking care about syncronization between model and view but this feature is heavy) and a lot of performance improvements. AngularJS team is working on angular hint an angular version of JSHint.

ng-repeat directive how to generate less watches, you can reach this last result with bindonce.js if you are using Angular 1.2.x

##About scope

Treat scope as read-only in templates & write-only in controller
- The purpose of the scope is to refer to model not to be a model
- The model is your javascript objects

When doing bidirectional binding (ng-model) make sure you don't bind directly to scope properties
- unexpected behaviour in child scopes

to avoid any problems put always a . in your ng-model. Having a . in your models will ensure that prototypal inheritance is in play

So, use
```
<input type="text" ng-model="someObj.prop1">
```
rather than
```
<input type="text" ng-model="prop1">
```

If you really want/need to use a primitive, there are two workarounds:

Use $parent.parentScopeProperty in the child scope. This will prevent the child scope from creating its own property.
Define a function on the parent scope, and call it from the child, passing the primitive value up to the parent (not always possible)

Remove dependencies on $scope
```javascript
// Instead of doing this:
app.controller('TodoCtrl', function ($scope) {
	$scope.input = 'ex. buy milk';
});

// Do this:
app.controller('TodoCtrl', function () {
	this.input = 'ex. buy milk';
});
```
```html
<!-- Then instead of this: -->
<div ng-controller="TodoCtrl">
	<input type="text" ng-model="input" />
</div>
<!-- Do this: -->
<div ng-controller="TodoCtrl as todo">
	<input type="text" ng-model="todo.input" />
</div>
```

Rules for the Controller going forward
- Controllers should hold zero logic
- Controllers should bind references to Models only (and call methods returned from promises)
- Controllers only bring logic together
- Controller drives Model changes, and View changes. Keyword; drives, not creates/persists, it triggers them!
- Delegate updating of logic inside Factories, don't resolve data inside a Controller, only update the Controller's value with updated Factory logic, this avoids repeated code across Controllers as well as Factory tests made easier
- Use "Controller as" when you don't need to explicity use $scope, for instance when you want to use $emit, $broadcast and $on
- Keep things simple, I prefer XXXXCtrl and XXXXFactory, I know exactly what the two do, we don't need fancy names for things
- Keep method/prop names consistent across shared methods, such as this.something = MyFactory.something; otherwise it becomes confusing
- Factories hold the Model, change, get, update, and persist the Model changes
- Think about the Factory as an Object that you need to persist, rather than persisting inside a Controller
- Talk to other Factories inside your Factory, keep them out the Controller (things like success/error handling)
- Try to avoid injecting $scope into Controllers, generally there are better ways to do what you need, such as avoiding $scope.$watch(), for instance you can define a shared factory, see a example below

```html
<div ng-controller="controller1 as controller">
        <input ng-model="controller.variable1.value"/>
    </div>
    <div ng-controller="controller2 as controller3">
        <input ng-model="controller3.variable2.value"/>
    </div>
</div>
```

```javascript
var test = angular.module('test', ['factories']);

test.controller("controller1", ["mediator", function(mediator) {
        this.variable1 = mediator.obj;
    }])

    .controller("controller2", ["mediator", function(mediator) {
        this.variable2 = mediator.obj;
    }]);


angular.module('factories', []).factory("mediator", function() {
    return {
        obj: {
            value: ""
        }
    };
});
```
##About Directives

#General advices
If you don't have to rely on very specific JQuery functions don't use it, you can save almost 100KB and gain performance demystifying javascript you dont need jquery https://speakerdeck.com/toddmotto/demystifying-javascript-you-dont-need-jquery

Angular 1.3.x

Angular 1.3.x

Filters
In this release Angular handles all filters stateless by default, each filter creates a new watcher, many watchers mean reduced performance. In this last release by default, they cache the evaluated value so they don’t have to be re-evaluated all the time. So how do we tell Angular, that expressions that are stateful have to be re-evaluated? It’s easy. All we have to do is to add a $stateful property to our filter that flags it as stateful, for instance:

customFilter.$stateful = true;

Ng-model
ng-model-options allows to improve performance. Now you can define when Angular needs to run a $digest cycle, for instance:

<input
  type="text"
  ng-model="name"
  ng-model-options="{ updateOn: 'blur' }">
<p>Hello {{name}}!</p>

Angular should only update when the input fires an onBlur event.

We can also use debounce parameter, debounce defines an integer value which represents a model update delay in milliseconds

<input
  type="search"
  ng-model="searchQuery"
  ng-model-options="{ debounce: 300 }">
<p>Search results for: {{searchQuery}}</p>

and of course we can combine different parameters:

<input
  type="search"
  ng-model="searchQuery"
  ng-model-options="{ updateOn: 'default blur', debounce: { 'default': 300, 'blur': 0 } }">
<p>Search results for: {{searchQuery}}</p>

here https://docs.angularjs.org/api/ng/directive/ngModelOptions you can discover other parameters