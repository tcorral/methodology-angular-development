# Angular Cookbook for Backbase Widget Development

### About

This styleguide is aimed at front-end developers interested in developing widgets for the Backbase CXP platform using the [AngularJS](https://angularjs.org/) framework. The objective is to:

 1. Present the best practices for Backbase Widget development using Angular
 2. Address things to take in consideration when migrating from Angular 1.2 to Angular 1.3

### References

Most of the contents of this styleguide were inspired by various external resources:
 - [The AngularJS Developer Guide](https://docs.angularjs.org/guide)
 - [John Papa's styleguide](https://github.com/johnpapa/angularjs-styleguide)
 - [Todd Motto's style guide](https://github.com/toddmotto/angularjs-styleguide)

Furthermore, knowledge of [Backbase's Widget Development Methodology](https://github.com/Backbase/methodology-widget-development) is recommended.

### Table of Contents

 - [Coding Conventions](#coding-conventions)
 - [Performance](#performance)
    - [Controllers & $scope](#controllers--scope)
    - [Factories](#factories)
    - [Directives](#directives)
    - [Filters](#filters)
 - [Example widgets](#example-widgets)
    - [Using Angular with Require.js](#use-angular-with-requirejs)
    - [Use 'ControllerAs'](#use-controlleras)
    - [Avoiding $watchers in controllers](#avoiding-watchers-in-controllers)
    - [Avoiding $scope references in controllers](#avoiding-scope-references-in-controllers)
    - [$log](#log)
    - [Directives](#directives-1)
    - [Bind Once](#bind-once)
    - [Angular Hint](#angular-hint)
 - [Advanced Topics](#advanced-topics)

## Coding Conventions

 - Keep naming of controllers and factories simple and consistent. For example, let's say we are building a todo app, naming should be as follows:
    - `TodoCtrl` for a controller
    - `TodoFactory` for a factory
 - Also keep methods and properties names consistent across shared methods, such as `this.something = MyFactory.something`

The value of these first two points is to simplify collaboration amongst developers, making it easy for other developers in your team to pick up and understand your code. Furthermore, you should:

 - If there is **only one controller** for your widget, instantiate the controller on the body tag of your widget definition, .i.e: `<body ng-controller="TodoCtrl">`
 - Always use the `ng-cloak` class on the body tag of your widget definition to avoid FOUC problems when loading the widget
 - Avoid using Angular's `$on`, `$broadcast` and `$emit` methods. Instead, use backbase's own PubSub library for [inter-widget communication](https://my.backbase.com/resources/how-to-guides/inter-widget-communication)
 - Do not chain modules, controllers, factories and directives. Instead, create an Angular module and cache it in a variable for faster access
 - Explicitly inject your dependencies. This will avoid problems when minifying your JavaScript code for production:

```javascript
// good practice
module.controller('TodoCtrl', ['$http', function($http) {
    ...
}]);

// bad practice
module.controller('TodoCtrl', function($http) {
    ...
});
```

## Performance

There are a few key points to pay attention to when developing widgets using Angular which can greatly impact the overall performance of your application.

### Controllers & $scope

 - Treat Angular's $scope as **read-only in templates & write-only in controllers**. The purpose of the $scope is to refer to a model, not to be a model (models should be handled in factories)

 - When doing bidirectional binding (ng-model) make sure you don't bind directly to scope properties, for this will have unexpected behavior in child scopes. To avoid any problems, put always a `.` in your ng-model. Having a `.` in your models will ensure that prototypal inheritance is in play:

```html
<!-- good practice -->
<input type="text" ng-model="someObj.prop1">
```
```html
<!-- bad practice -->
<input type="text" ng-model="prop1">
```

 - If you really want/need to use a primitive, there are two workarounds:
    1. Use `$parent.parentScopeProperty` in the child scope. This will prevent the child scope from creating its own property.
    2. Define a function on the parent scope, and call it from the child, passing the primitive value up to the parent (not always possible)

A few important points to remember about controller:
 - Controllers should hold zero logic
 - Controllers should never handle DOM manipulation! Use directives for this
 - Controllers should bind references to Models only (and call methods returned from promises)
 - Controllers drive Model changes, and View changes. Keyword: **drives**, not creates/persists, it triggers them!
 - Use "Controller as" when you don't need to explicitly use $scope
 - Try to avoid injecting $scope into Controllers, generally there are better ways to do what you need, such as avoiding $scope.$watch(), for instance you can define a shared factory, like this:

```html
<!-- use 'controller as' to access controller properties -->
<div ng-controller="FirstCtrl as ctrl">
        <input ng-model="ctrl.variable1.value"/>
    </div>
    <div ng-controller="SecondCtrl as ctrl2">
        <input ng-model="ctrl2.variable2.value"/>
    </div>
</div>
```

```javascript
// define a module to hold your data
var data = angular.module('factories', []);

// create a mediator factory which will persist the data
data.factory("MediatorFactory", function() {
    return {
        obj: {
            value: ""
        }
    };
});

// create an app, lading the data module as a dependency
var app = angular.module('test', ['factories']);

// create two controllers, and inject the mediator as a dependency of each controller
app.controller("FirstCtrl", ["MediatorFactory", function(mediator) {
    this.variable1 = mediator.obj;
}])
app.controller("SecondCtrl", ["MediatorFactory", function(mediator) {
    this.variable2 = mediator.obj; // this.variable2 = this.variable1 in the controller1
}]);
```

### Factories

 - Delegate updating of logic inside Factories, don't resolve data inside a Controller, only update the Controller's value with updated Factory logic, this avoids repeated code across Controllers as well as Factory tests made easier
 - Factories hold the Model, change, get, update, and persist the Model changes
 - Think about the Factory as an Object that you need to persist, rather than persisting inside a Controller
 - Talk to other Factories inside your Factory, keep them out the Controller (things like success/error handling)

### Directives

 - Directives are meant to handle DOM manipulation
 - Avoid using jQuery if you don't explicitly need to, this will save you about ~100Kb and an extra HTTP request
    - Angular comes bundled with `jqLite`, which is more than enough to handle most common DOM manipulation and event binding operations
    - If you need to do AJAX calls, use Angular's built-in `$http` service instead of `$.ajax`
 - Directives can access the $scope of the controller it lives in; however, the scope should be considered read-only in a directive, so you should never update a scope value from a directive! Alternatively, you can use [directive's isolated scopes](http://weblogs.asp.net/dwahlin/creating-custom-angularjs-directives-part-2-isolate-scope)

### Filters

Filters are extremely expensive performance-wise. Each filter creates a watcher, which get ran twice whenever the model is modified. Therefore, you should be cautious about using Angular's built-in filters, and you should avoid to build your own filters at all cost.

## Example Widgets

### Use Angular with Require.js

In this simple example, we show you how to load and use AngularJS in a Require.js module. [[View Code]](angularbundle/src/main/webapp/static/angularbundle/widgets/angular-widget)

### Use 'ControllerAs'

In this example, we show you how to use the "controller as" feature to remove dependency on the $scope. [[View Code]](angularbundle/src/main/webapp/static/angularbundle/widgets/angular-controller-as)

### Avoiding $watchers in controllers

In this example, we show you how to avoid using $watchers in your controller by making use of a mediator factory. [[View Code]](angularbundle/src/main/webapp/static/angularbundle/widgets/angular-avoid-watcher)

### Avoiding $scope references in controllers

In this example, we show you how avoid $scope references in your controller by pulling data from a factory.  [[View Code]](angularbundle/src/main/webapp/static/angularbundle/widgets/angular-consume-data-factory)

### $log

In this example, we show you how to use Angular's built-in $log for better reporting in the console. [[View Code]](angularbundle/src/main/webapp/static/angularbundle/widgets/angular-log)

### Directives

In this example, we show you how to use directives. [[View Code]](angularbundle/src/main/webapp/static/angularbundle/widgets/angular-directives)

### Bind Once

In this example, we show you how to use the one-time binding feature from angular 1.3 in 1.2. [[View Code]](angularbundle/src/main/webapp/static/angularbundle/widgets/angular-bindonce)

### Angular Hint

In this example, we show you how to use Angular's hint feature in 1.2. [[View Code]](angularbundle/src/main/webapp/static/angularbundle/widgets/angular-hint)

## Advanced Topics

Below is a list of articles about specific topics such as: migration options, advanced usage tips, etc...

 - [Migrating To Angular 1.3](advanced_topics/migrating_to_angular_13.md)
