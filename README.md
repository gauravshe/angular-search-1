list-filter-text directive
==========================

a simple search directive

![screenshot](https://stash.turn.com/projects/CNSL/repos/list-filter-text/browse/screenie.png?raw&at=alpha)

## dependencies

- angular 1.0.8
- bootstrap 3.1+
- jquery 1.11+
- turn-icon-font 0.3+

## features

- lightweight
- configurable behavior
- supports both basic (click on affordances) and pro user (keyboard-only) interactions
- supports any number of directive instances on one page
- near-100% test coverage

## installation

```bash
bower install ssh://git@stash.turn.com:7999/cnsl/list-filter-text.git#0.x.x
```

## usage

```html
<div ng-controller="mainCtrl">
	<list-filter-text
		class="size-medium"
		param="searchText"
		placeholder="Search"
		search="search($param)"
	></list-filter-text>
	<a ng-click="clear()">Clear</a>
</div>
```

```js
angular
.module('demo', ['listFilterText'])
.controller('mainCtrl', function ($scope, $http) {

	angular.extend($scope, {
		searchText: '',
		clear: function() {
			$scope.searchText = '';
			$scope.search();
		},
		search: function (param) {

			...

		}
	});

});
```

## options

```html
<list-filter-text
	<!-- css class(es) -->
	class="size-medium"

	<!-- disable the input when $scope.foo evaluates to true -->
	disabled="foo"

	<!-- param to update in the model when the user presses ENTER -->
	param="searchText"

	<!-- placeholder text when the input is empty -->
	placeholder="Search"

	<!--
		search function to call (passed the search string),
		should be defined on the controller's $scope
	-->
	search="fn($param)"

	<!-- submit onKeyUp rather than onSubmit -->
	typeAhead="true"
></list-filter-text>
```

## hacking on it

```bash
bower install
npm install
grunt watch
```

## running the demo

```bash
bower install
npm install
node server/index
```

then open demo/index.html in a browser

## running the tests

```bash
bower install
npm install
grunt test
```