# Angular Development Methodology

### About

This styleguide is aimed at front-end developers interested in developing for the Backbase CXP platform using the [AngularJS](https://angularjs.org/) framework. The objective is to present the best practices for Backbase Widget and Portal development using Angular


### References

Most of the contents of this styleguide were inspired by various external resources:
 - [The AngularJS Developer Guide](https://docs.angularjs.org/guide)
 - [John Papa's styleguide](https://github.com/johnpapa/angularjs-styleguide)
 - [Todd Motto's style guide](https://github.com/toddmotto/angularjs-styleguide)

Furthermore, knowledge of [Backbase's Widget Development Methodology](https://github.com/Backbase/methodology-widget-development) is recommended.

### Table of Contents

 - [Coding Conventions](#coding-conventions)
    - [Naming Conventions](#naming-conventions)
        - [Variables](#variables)
        - [Controllers & Factories](#modules-controllers--factories)
        - [Directives](#directives)
        - [Methods](#methods)
    - [Overall Conventions](#overall-conventions)
 - [Performance](#performance)
    - [Controllers & $scope](#controllers--scope)
    - [Factories](#factories)
    - [Directives](#directives-1)
    - [Filters](#filters)
 - [Example widgets](#example-widgets)
    - [Using Angular with Require.js](#using-angular-with-requirejs)
    - [Using 'ControllerAs'](#using-controlleras)
    - [Avoiding $watchers in controllers](#avoiding-watchers-in-controllers)
    - [Avoiding $scope references in controllers](#avoiding-scope-references-in-controllers)
    - [$log](#log)
    - [Directives](#directives-2)
    - [Bind Once](#bind-once)
    - [Angular Hint](#angular-hint)
 - [Advanced Topics](#advanced-topics)

## Coding Conventions

### Naming Conventions

The value of naming conventions is to simplify collaboration amongst developers, making it easy for other developers in your team to pick up and understand your code. As a general rule, be explicit with your naming, **do not use single letters or abbreviations to reference variables or methods**, be as verbose as you need to be. This will have no impact on the performance of your code once optimised for production, and it will improve collaboration amongst developers.

#### Variables

Variable names should be camel-cased, as such:

```javascript 
var viewModel = this;
```

#### Modules, Controllers & Factories

Keep naming of modules, controllers and factories consistent. 
For example, let's say we are building a "todo" app, naming should be as follows:

```javascript
// Module - main.js
define( function (require, exports, module) {
    'use strict';
    module.name = 'Todo';
    var base = require('base');
    var deps = [];
    
    /**
     * @ngInject
     */
    function run() {
        // Module is Bootstrapped
    }

    module.exports = base.createModule(module.name, deps)
        .constant('WIDGET_NAME', module.name )
        .controller( require('./controllers') )
        .service( require('./services') )
        .run( run );
});
```

```javascript
// Controller - controllers.js
define(function (require, exports) {
    'use strict';
    /**
     * Main controller
     * @ngInject
     * @constructor
     */
    function TodoController(lpCoreUtils, lpWidget, lpCoreError) {
        this.utils = lpCoreUtils;
        this.error = lpCoreError;
        this.widget = lpWidget;
    }
    
    /**
     * Export Controllers
     */
    exports.TodoController = TodoController;
});
```

```javascript
// Service - services.js
define( function (require, exports, module) {
    'use strict';

    // @ngInject
    var TodoService = function($http, lpCoreError) {
        this.config = {};
        this.error = lpCoreError;
        this.http = $http;
    };

    TodoService.prototype = {
        loadTasks: function() {
            /* Code implementation*/
        }
    };

    exports.TodoService = TodoService;
});
````

#### Directives

Directives Names should be camel-cased, and prepended with the bundle's initials. 
For example, let's say your bundle is called "angularbundle":

```javascript
// Directives Module- components/ab-components/main.js
define( function (require, exports, module) {
    'use strict';

    module.name = 'ab-components';
    var base = require('base');
    var deps = [];


    module.exports = base.createModule(module.name, deps)
        .directive(require('./directives'));
});
```

```javascript
// Directive - components/ab-components/directives.js
define(function(require, exports, module) {
    'use strict';

    // @ngInject
    exports.abFormatAmount = function(lpCoreI18n, widget) {
        return {
            restrict: 'A',
            scope: {},
            link: function(scope, element, attrs) {
                // Code
            }
        };
    };
});
```
Then, you can use your directive as such:

```html
<ab-format-amount></ab-format-amount>
```

#### Methods

Methods names should be camel-cased. Also, keep methods and properties names consistent across shared methods, for example:

```javascript
// Controller - controllers.js
    /* Code */
    /**
     * Main controller
     * @ngInject
     * @constructor
     */
    function TodoController(lpCoreUtils, lpWidget, lpCoreError, TodoService) {
        this.utils = lpCoreUtils;
        this.error = lpCoreError;
        this.widget = lpWidget;
        this.loadTasks = TodoService.loadTasks;
        this.someMethod = function () {
            console.log('Some method');
        };
    }
    /* More code */
```

### Overall Conventions

#### Instantiate the controller of your widget in the body tag. 
To instantiate the controller of your widget you should add the ng-controller directive in the body tag of your widget definition.

```html
<body ng-controller="TodoController as todoCtrl">`
```

#### Rid off the FOUC problems when loading the widget.
Always use the `ng-cloak` class on the body tag of your widget definition to avoid FOUC problems when loading the widget.

 ```html
 <body [...] class="ng-cloak" />
 ```
#### How to communicate between AngularJS components.
 Avoid using Angular's `$on`, `$broadcast` and `$emit` methods. 
 Instead, use backbase's own PubSub library for [inter-widget communication](https://my.backbase.com/resources/how-to-guides/inter-widget-communication)
 
```javascript
// Controller - controllers.js
    /* Code */
    /**
     * Main controller
     * @ngInject
     * @constructor
     */
    function TodoController(lpCoreUtils, lpWidget, lpCoreError, TodoService, lpCoreBus) {
        /* Code */
        this.loadTasks = TodoService.loadTasks;
        this.loadTasks()
            .then(function (data) {
                lpCoreBus.publish('tasks:loaded', data.tasks);
            });
        /* More code */
    }
    /* More code */
```
#### Create one module per each AngularJS component.
 Do not chain modules, controllers, factories and directives. Instead, create an Angular module and cache it in a variable for faster access.
 
 ```javascript
 // Directives Module- components/ab-components/main.js
 define( function (require, exports, module) {
     'use strict';
 
     module.name = 'ab-components';
     var base = require('base');
     var deps = [];
 
 
     module.exports = base.createModule(module.name, deps)
         .directive(require('./directives'));
 });
 ```
 
 ```javascript
 // Directive - components/ab-components/directives.js
 define(function(require, exports, module) {
     'use strict';
 
     // @ngInject
     exports.abFormatAmount = function(lpCoreI18n, widget) {
         return {
             restrict: 'A',
             scope: {},
             link: function(scope, element, attrs) {
                 // Code
             }
         };
     };
 });
 ```
 
 ```javascript
 // Module - main.js
 define( function (require, exports, module) {
     'use strict';
     module.name = 'Todo';
     var base = require('base');
     var core = require('core');
     var ui = require('ui');
     var abDirectives = require('components/ab-components/main');
     var deps = [
        abDirectives.name
     ];
     
     /**
      * @ngInject
      */
     function run() {
         // Module is Bootstrapped
     }
 
     module.exports = base.createModule(module.name, deps)
         .constant('WIDGET_NAME', module.name )
         .controller( require('./controllers') )
         .service( require('./services') )
         .run( run );
 });
 ```
 
 #### Injecting your dependencies.
 Launchpad uses [ng-annotate](https://github.com/olov/ng-annotate) to inject automatically the dependencies during the build
 process. 
 **Mind to add the @ngInject JSDoc attribute**
 ```javascript
 // Controller - controllers.js
     /* Code */
     /**
      * Main controller
      * @ngInject
      * @constructor
      */
     function TodoController(lpCoreUtils, lpWidget, lpCoreError, TodoService, lpCoreBus) {
         /* Code */
         this.loadTasks = TodoService.loadTasks;
         this.loadTasks()
             .then(function (data) {
                 lpCoreBus.publish('tasks:loaded', data.tasks);
             });
         /* More code */
     }
     /* More code */
 ```

## Performance

There are a few key points to pay attention when developing widgets using Angular which can greatly impact the overall performance of your application.

### $scope
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

 - ~~If you really want/need to use a primitive, there are two workarounds:~~
    1. ~~Use `$parent.parentScopeProperty` in the child scope. This will prevent the child scope from creating its own property.~~
    2. ~~Define a function on the parent scope, and call it from the child, passing the primitive value up to the parent (not always possible)~~

### Controllers

#### Zero Logic
Controllers should hold zero logic

```javascript
// bad practice
// Controller - controllers.js
    /* Code */
    /**
    * Main controller
    * @ngInject
    * @constructor
    */
    function TodoController(lpCoreUtils, lpWidget, lpCoreError, lpCoreBus, $http) {
        /* Code */
        this.loadTasks = function () {
            return $http.get('http://my/url/to/my/rest/api');
        };
        this.loadTasks()
            .then(function (data) {
                /* More code */
            });
        /* More code */
    }
    /* More code */
```

```javascript
// good practice
// Controller - controllers.js
    /* Code */
    /**
    * Main controller
    * @ngInject
    * @constructor
    */
    function TodoController(lpCoreUtils, lpWidget, lpCoreError, TodoService) {
         /* Code */
         this.loadTasks = TodoService.loadTasks;
         this.loadTasks()
             .then(function (data) {
                 /* More code */
             });
         /* More code */
     }
    /* More code */
```

#### Zero DOM manipulation
Controllers should never handle DOM manipulation! Use directives for this.

```javascript
// bad practice
// Controller - controllers.js
    /* Code */
    var angular = require('base').ng;
    /**
    * Main controller
    * @ngInject
    * @constructor
    */
    function TodoController(lpCoreUtils, lpWidget, lpCoreError, lpCoreBus, $http) {
        /* Code */
        var ngDocument = angular.element(document);
        ngDocument.ready(function () {
            var elementsToChangeBackgroundColor = ngDocument.find('.change-background-color-on-ready');
            elementsToChangeBackgroundColor.addClass('blue-background');
            elementsToChangeBackgroundColor.html('My new background color is blue');
        });
        /* More code */
    }
    /* More code */
```

```html
<!-- bad practice -->
<div class="change-background-color-on-ready">My background color is white by default</div>
```

```javascript
 // good practice
 // Directive - components/ab-components/directives.js
    /* Code */

     // @ngInject
     exports.abChangeBackgroundColorOnReady = function($document) {
         return {
             restrict: 'A',
             scope: {},
             link: function(scope, element, attrs) {
                 $document.ready(function () {
                    element.addClass('blue-background');
                    element.html('My new background color is blue');
                 });
             }
         };
     };
 });
 ```

```html
<!-- good practice -->
<div ab-change-background-color-on-ready>My background color is white by default</div>
```
#### Return promises
Don't use callbacks to react on any call to method should return promises. 
All the methods should return a promises in all the cases especially those that makes use of services, factories or 
any other provider. As you should know the $http method returns a promise when it's executed.
In any other case you should use the $q object as a dependency to set your own promises in your functions.

```javascript
// bad practice using services
// Service - services.js
define( function (require, exports, module) {
    'use strict';

    // @ngInject
    var TodoService = function($http, lpCoreError) {
        this.config = {};
        this.error = lpCoreError;
        this.http = $http;
    };

    TodoService.prototype = {
        loadTasks: function(url, callback) {
            this.http
            .get(url)
            .then(callback);
        }
    };

    exports.TodoService = TodoService;
});
````

```javascript
// bad practice using services
// Controller - controllers.js
    /* Code */
    /**
    * Main controller
    * @ngInject
    * @constructor
    */
    function TodoController(lpCoreUtils, lpWidget, lpCoreError, TodoService) {
         /* Code */
         this.loadTasks = function (url) {
            return TodoService.loadTasks(url, function (data) {
                /* More code */
            });
         };
         this.loadTasks(lpWidget.getPreference('fetchTasksEndpoint'))
         /* More code */
     }
    /* More code */
```

```javascript
// good practice using services
// Service - services.js
define( function (require, exports, module) {
    'use strict';

    // @ngInject
    var TodoService = function($http, lpCoreError) {
        this.loadUrl = '';
        this.config = {};
        this.error = lpCoreError;
        this.http = $http;
    };

    TodoService.prototype = {
        setupLoadUrl: function (loadUrl) {
            this.loadUrl = loadUrl;
        } 
        loadTasks: function() {
            return this.http.get(this.loadUrl);
        }
    };

    exports.TodoService = TodoService;
});
````

```javascript
// good practice using services
// Controller - controllers.js
    /* Code */
    /**
    * Main controller
    * @ngInject
    * @constructor
    */
    function TodoController(lpCoreUtils, lpWidget, lpCoreError, TodoService) {
         /* Code */
         var loadUrl = lpWidget.getPreference('fetchTasksEndpoint');
         TodoService.setupLoadUrl(loadUrl); // This is better if can be done in the config or run methods.
         this.loadTasks = function () {
            return TodoService.loadTasks();
         };
         this.loadTasks()
             .then(function (data) {
                 /* More code */
             });
         /* More code */
     }
    /* More code */
```

```javascript
// bad practice - without promises
// Service - services.js
define( function (require, exports, module) {
    'use strict';
    // Given  : key is a string of the 26 letters in arbitrary order,
    //          message is the string to be encoded using the key
    // Returns: the coded version of message using the substitution key 
    function Encode(key, message)
    {
        var alphabet, coded, i, ch, index;

        alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        coded = "";                                      
        for (i = 0; i < message.length; i++) {        // for as many letters as there are
            ch = message.charAt(i);                   //   access the letter in the message
            index = alphabet.indexOf(ch);             //   find its position in alphabet
            if (index == -1) {                        //   if it's not a letter,
                coded = coded + ch;                   //     then leave it as is & add
            }                                         //   otherwise,
            else {                                    //     find the corresponding
                coded = coded + key.charAt(index);    //     letter in the key & add
            }
        }
        return coded;
    }
    // @ngInject
    var EncodeService = function(lpCoreError) {
        this.config = {};
        this.error = lpCoreError;
    };

    EncodeService.prototype = {
        getEncodedItems: function (key, array, callback) {
            var encodedItems = [];
            for(var i = 0, len = array.length; i < len; i++) {
                encodedItems[i] = Encode(key, array[i]);
            }
            callback();
        },
        getEncoded: function (key, message) {
            return Encode(key, message);
        }
    };

    exports.EncodeService = EncodeService;
});
````

```javascript
// good practice - with promises - newer versions of AngularJS
// Service - services.js
define( function (require, exports, module) {
    'use strict';
    // Function to process arrays with high time consumption on each iteration
    // without blocking the UI.
    function timedChunk(items, process, context, callback){
        var todo = items.concat();   //create a clone of the original
    
        setTimeout(function(){
    
            var start = +new Date();
    
            do {
                 process.call(context, todo.shift());
            } while (todo.length > 0 && (+new Date() - start < 50));
    
            if (todo.length > 0){
                setTimeout(arguments.callee, 25);
            } else {
                callback(items);
            }
        }, 25);
    }
    // Given  : key is a string of the 26 letters in arbitrary order,
    //          message is the string to be encoded using the key
    // Returns: the coded version of message using the substitution key 
    function Encode(key, message)
    {
        var alphabet, coded, i, ch, index;

        alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        coded = "";                                      
        for (i = 0; i < message.length; i++) {        // for as many letters as there are
            ch = message.charAt(i);                   //   access the letter in the message
            index = alphabet.indexOf(ch);             //   find its position in alphabet
            if (index == -1) {                        //   if it's not a letter,
                coded = coded + ch;                   //     then leave it as is & add
            }                                         //   otherwise,
            else {                                    //     find the corresponding
                coded = coded + key.charAt(index);    //     letter in the key & add
            }
        }
        return coded;
    }
    // @ngInject
    var EncodeService = function($q, lpCoreError) {
        this.config = {};
        this.error = lpCoreError;
    };

    EncodeService.prototype = {
        getEncodedItems: function (key, array) {
            var encodedItems = [];
            return $q(function(resolve, reject) {
                timedChunk(array, function (message) {
                    encodedItems.push(Encode(key, message);
                }, null, function () {
                    resolve(encodedItems);
                }defer.resolve);
              });
        },
        getEncoded: function (key, message) {
            return Encode(key, message);
        }
    };

    exports.EncodeService = EncodeService;
});
````

```javascript
// good practice - with promises - older versions of AngularJS
// Service - services.js
define( function (require, exports, module) {
    'use strict';
    // Function to process arrays with high time consumption on each iteration
    // without blocking the UI.
    function timedChunk(items, process, context, callback){
        var todo = items.concat();   //create a clone of the original
    
        setTimeout(function(){
    
            var start = +new Date();
    
            do {
                 process.call(context, todo.shift());
            } while (todo.length > 0 && (+new Date() - start < 50));
    
            if (todo.length > 0){
                setTimeout(arguments.callee, 25);
            } else {
                callback(items);
            }
        }, 25);
    }
    // Given  : key is a string of the 26 letters in arbitrary order,
    //          message is the string to be encoded using the key
    // Returns: the coded version of message using the substitution key 
    function Encode(key, message)
    {
        var alphabet, coded, i, ch, index;

        alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        coded = "";                                      
        for (i = 0; i < message.length; i++) {        // for as many letters as there are
            ch = message.charAt(i);                   //   access the letter in the message
            index = alphabet.indexOf(ch);             //   find its position in alphabet
            if (index == -1) {                        //   if it's not a letter,
                coded = coded + ch;                   //     then leave it as is & add
            }                                         //   otherwise,
            else {                                    //     find the corresponding
                coded = coded + key.charAt(index);    //     letter in the key & add
            }
        }
        return coded;
    }
    // @ngInject
    var EncodeService = function($q, lpCoreError) {
        this.config = {};
        this.$q = $q;
        this.error = lpCoreError;
    };

    EncodeService.prototype = {
            getEncodedItems: function (key, array) {
                var encodedItems = [];
                var deferred = this.$q.defer();
                
                timedChunk(array, function (message) {
                    encodedItems.push(Encode(key, message);
                }, null, function () {
                    defer.resolve(encodedItems);
                }defer.resolve);
                
                return defer.promise();
            },
            getEncoded: function (key, message) {
                return Encode(key, message);
            }
        };

    exports.EncodeService = EncodeService;
});
````

### Controllers & Models
#### Controllers should bind references to Models only
#### Controllers drive Model changes, and View changes. Keyword: **drives**, not creates/persists, it triggers them!
#### Use "Controller as" when you don't need to explicitly use $scope
Using "Controller as" reduces the usage of $scope and you get another feature for free, now you can nest different controllers
knowing what controller drives each variable in the model.

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
// Controller - firstController.js
    /* Code */
    /**
    * Main controller
    * @ngInject
    * @constructor
    */
    function FirstCtrl() {
         var ctrl = this;
         ctrl.variable1 = {
            value: '10'
         };
    }
    exports.FirstCtrl = FirstCtrl;
```

```javascript
// Controller - secondController.js
    /* Code */
    /**
    * Main controller
    * @ngInject
    * @constructor
    */
    function SecondCtrl() {
         var ctrl = this;
         ctrl.variable2 = {
            value: '30'
         };
     }
    exports.SecondCtrl = SecondCtrl;
```

#### Avoid injecting $scope into Controllers
Generally there are better ways to do what you need, such as avoiding $scope.$watch(), for instance you can define a shared factory, like this:

```javascript
// Factories module - factories/main.js
define( function (require, exports, module) {
    'use strict';
    module.name = 'Factories';
    var base = require('base');
    var deps = [];
    
    module.exports = base.createModule(module.name, deps)
        .factory( requires('./mediatorFactory') );
});
```

```javascript
// MediatorFactory - factories/mediatorFactory.js
define( function (require, exports, module) {
    'use strict';
    /**
    * @ngInject
    */
    exports.MediatorFactory = function () {
        return {
            obj: {
               value: ''
            }
        };
    });
});
```

```javascript
// Module - main.js
define( function (require, exports, module) {
    'use strict';
    module.name = 'Test';
    var base = require('base');
    var factories = require('./factories/main');
    var deps = [
        factories.name
    ];
    
    /**
     * @ngInject
     */
    function run() {
        // Module is Bootstrapped
    }

    module.exports = base.createModule(module.name, deps)
        .constant('WIDGET_NAME', module.name )
        .controller( require('./firstController') )
        .controller( require('./secondController') )
        .run( run );
});
```
Create two controllers, and inject the mediator as a dependency of each controller

```javascript
// Controller - firstController.js
define( function (require, exports, module) {
    'use strict';
    /**
    * @ngInject
    */
    exports.FirstController = function (MediatorFactory) {
        var ctrl = this;
        ctrl.variable1 = MediatorFactory.obj;
    });
});
```

```javascript
// Controller - secondController.js
define( function (require, exports, module) {
    'use strict';
    /**
    * @ngInject
    */
    exports.SecondController = function (MediatorFactory) {
        var ctrl = this;
        ctrl.variable2 = MediatorFactory.obj;   // this.variable2 === this.variable1 in the firstController
    });
});
```

### Factories
#### Don't resolve data inside a Controller
Delegate updating of logic inside Factories, don't resolve data inside a Controller, only update the Controller's 
value with updated Factory logic, this avoids repeated code across Controllers as well as Factory tests made easier.

```javascript
// bad practice - Resolve data inside Controller
// Controller - controllers.js
define(function (require, exports, module) {
    
    /**
    * @ngInject
    */
    function MyController(lpWidget, $http) {
        var ctrl = this;
        ctrl.rows = [];
        
        $http
            .get(lpWidget.getPreference('dataEndpoint'))
            .then(function (data) {
                ctrl.rows = data.rows;
            });
    }
    
    exports.MyController = MyController;
});
```

```javascript
// good practice - Don't resolve data inside Controller
// Factory - factories.js
define(function (require, exports, module) {
    
    /**
    * @ngInject
    */
    function MyFactory($http) {
        var dataUrl = '';
        
        return {
            setupDataUrl: function (url) {
                dataUrl = url;
            },
            loadData: function () {
                return $http.get(dataUrl);
            }
        };
    }
    
    exports.MyFactory = MyFactory;
});
```

```javascript
// good practice - Don't resolve data inside Controller
// Controller - controller.js
define(function (require, exports, module) {
    
    /**
    * @ngInject
    */
    function MyController(lpWidget, MyFactory) {
        var ctrl = this;
        ctrl.rows = [];
        MyFactory.setupDataUrl(lpWidget.getPreference('dataEndpoint'));
        MyFactory.loadData()
            then(function (data) {
                ctrl.rows = data.rows;
            });
    }
    
    exports.MyController = MyController;
});
```
#### Never hardcode urls inside a Factory
Factories should never have hardcoded urls, it's better to add a setup method so that you can setup the urls.

```javascript
// bad practice - Hardcode urls inside of factories
// Factory - factories.js
define(function (require, exports, module) {
    
    /**
    * @ngInject
    */
    function MyFactory($http) {
        var dataUrl = 'http://localhost:7777/services/data';
        
        return {
            loadData: function () {
                return $http.get(dataUrl);
            }
        };
    }
    
    exports.MyFactory = MyFactory;
});
```

```javascript
// good practice - Add a method to setup the urls.
// Factory - factories.js
define(function (require, exports, module) {
    
    /**
    * @ngInject
    */
    function MyFactory($http) {
        var dataUrl = '';
                
        return {
            setupDataUrl: function (url) {
                dataUrl = url;
            },
            loadData: function () {
                return $http.get(dataUrl);
            }
        };
    }
    
    exports.MyFactory = MyFactory;
});
```

#### Manage data changes
Factories hold the Model, change, get, update, and persist the Model changes

```javascript
// Factory - factories.js
define(function (require, exports, module) {
    
    /**
    * @ngInject
    */
    function MyFactory($http) {
        var dataUrl = '';
            
        return {
            setupDataUrl: function (url) {
                dataUrl = url;
            },
            get: function () {
                return $http.get(dataUrl);
            },
            save: function () {
                return $http.post(dataUrl);
            },
            remove: function () {
                return $http.delete(dataUrl);
            },
            update: function () {
                return $http.put(dataUrl);
            }
        };
    }
    
    exports.MyFactory = MyFactory;
});
```

#### Persist data
Think about the Factory as an Object that you need to persist, rather than persisting inside a Controller.
```javascript
// Factory - factories.js
define(function (require, exports, module) {
    
    var angular = require('base').ng;
    
    /**
    * @ngInject
    */
    function MyFactory($http, $q) {
        var dataUrl = '';
        var model = {
            items: null
        };
        var getErrorMessageItemDontExist = function (id) {
            return 'Item with id:' + id + ' does not exist';
        };
        var getSingleItem = function (itemId) {
            return model.items[itemId] || null;
        };
        
        return {
            setupDataUrl: function (url) {
                dataUrl = url;
            },
            getAll: function () {
                if(model.items === null) {
                    return $http.get(dataUrl)
                            .then(function (data) {
                                model.items = data.items;
                            });
                }
                return $q(function(resolve, reject) {
                    resolve(model.items);
                });
            },
            getItemById: function (id) {
                var factory = this;
                return $q(function(resolve, reject) {
                    if(model.rows === null) {
                        factory
                            .getAll()
                            .then(function() {
                                var item = getSingleItem();
                                if(item) {
                                    resolve(item);
                                } else {
                                    reject(new Error(getErrorMessageItemDoNotExist(id));
                                }
                            });
                    } else {
                        var item = getSingleItem();
                        if(item.length > 0) {
                            resolve(item);
                        } else {
                            reject(new Error(getErrorMessageItemDoNotExist(id));
                        }
                    }
                });
            },
            add: function (item) {
                var factory = this;
                if(model.rows === null) {
                    factory.getAll()
                        .then(function () {
                            model.items[item.id] = item;
                        });
                }else{
                    model.items[item.id] = item;
                }
            },
            saveAll: function () {
                return $http.post(dataUrl, model);
            },
            save: function (item) {
                return $http.post(dataUrl, item);
            },
            remove: function (id) {
                return $http.delete(dataUrl, id);
            },
            update: function (newItem) {
                var factory = this;
                factory.getItemById(newItem.id)
                    .then(function (item) {
                        model.items[item.id] = angular.extend(item, newItem);
                    })
                    .catch(function () {
                        new Error(getErrorMessageItemDoNotExist(newItem.id));
                    });
            },
            updateAndSave: function (item) {
                var factory = this;
                return factory.update(item)
                    .then(function () {
                        $http.put(dataUrl, item);
                    });
            }
        };
    }
    
    exports.MyFactory = MyFactory;
});
```


#### Communicate
Talk to other Factories inside your Factory, keep them out the Controller (things like success/error handling)


### Directives

 - Directives are meant to handle DOM manipulation
 - Avoid using jQuery if you don't explicitly need to, this will save you about ~100Kb and an extra HTTP request
    - Angular comes bundled with `jqLite`, which is more than enough to handle most common DOM manipulation and event binding operations
    - If you need to do AJAX calls, use Angular's built-in `$http` service instead of `$.ajax`
 - Directives can access the $scope of the controller it lives in; however, the scope should be considered read-only in a directive, so you should never update a scope value from a directive! Alternatively, you can use [directive's isolated scopes](http://weblogs.asp.net/dwahlin/creating-custom-angularjs-directives-part-2-isolate-scope)

### Filters

Filters are extremely expensive performance-wise. Each filter creates a watcher, which get ran twice whenever the model is modified. Therefore, you should be cautious about using Angular's built-in filters, and you should avoid to build your own filters at all cost.

## Example Widgets

### Using Angular with Require.js

In this simple example, we show you how to load and use AngularJS in a Require.js module. [[View Code]](angularbundle/src/main/webapp/static/angularbundle/widgets/angular-widget)

### Using 'ControllerAs'

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
