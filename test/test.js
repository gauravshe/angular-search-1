// Generated by CoffeeScript 1.7.1
describe('search', function() {
  var SEARCH_KEYS, listFilterTextApi;
  SEARCH_KEYS = {
    enter: 13,
    esc: 27
  };
  listFilterTextApi = function() {
    this.clear = function() {};
    return this.reset = function() {};
  };
  beforeEach(module('turn/search'), function($provide) {
    return $provide.value('SEARCH_KEYS', SEARCH_KEYS);
  });
  beforeEach(function() {
    return inject((function(_this) {
      return function($compile, $rootScope, $controller) {
        _this.$compile = $compile;
        _this.scope = $rootScope.$new();
        return _this.element = angular.element("<search\n	class=\"size-medium\"\n	param=\"searchText\"\n	placeholder=\"Search\"\n	search=\"search($param)\"\n	typeAhead=\"false\"\n	disabled=\"foo\"\n></search>");
      };
    })(this));
  });
  beforeEach(function() {
    (this.$compile(this.element))(this.scope);
    this.scope.$apply();
    return this.scope = this.element.scope();
  });
  it('should set the element\'s className to the "class" attribute', function() {
    return expect(this.element.find('input').hasClass('size-medium')).toBe(true);
  });
  it('should set the element\'s placeholder to the "placeholder" attribute', function() {
    return expect(this.element.find('input').attr('placeholder')).toBe('Search');
  });
  it('should set the element\'s disabled attribute to true when the disabled expression is truthy', inject(function($rootScope) {
    $rootScope.foo = 1;
    this.scope.$apply();
    expect(this.element.find('input').attr('disabled')).toBe('disabled');
    $rootScope.foo = false;
    this.scope.$apply();
    return expect(this.element.find('input').attr('disabled')).toBe(void 0);
  }));
  describe('#blur', function() {
    return it('should blur the input', function() {
      var mock;
      mock = {
        blur: function() {}
      };
      spyOn(mock, 'blur');
      spyOn(($()).__proto__, 'find').andReturn(mock)();
      this.scope.blur();
      expect(($()).__proto__.find).toHaveBeenCalledWith('input');
      return expect(mock.blur).toHaveBeenCalledWith;
    });
  });
  describe('#change', function() {
    it('should call #update if the user pressed ENTER', function() {
      spyOn(this.scope, 'update');
      this.scope.change({
        keyCode: 13
      });
      return expect(this.scope.update).toHaveBeenCalled();
    });
    it('should call #update if typeAhead is true', function() {
      spyOn(this.scope, 'update');
      this.scope.typeAhead = true;
      this.scope.change({
        keyCode: -1
      });
      return expect(this.scope.update).toHaveBeenCalled();
    });
    it('should call not call #update otherwise', function() {
      spyOn(this.scope, 'update');
      this.scope.typeAhead = false;
      this.scope.change({
        keyCode: -1
      });
      return expect(this.scope.update).not.toHaveBeenCalled();
    });
    it('should call #clear and #blur if the user pressed ESC, regardless of typeAhead', function() {
      this.scope.typeAhead = true;
      spyOn(this.scope, 'clear');
      spyOn(this.scope, 'blur');
      this.scope.change({
        keyCode: 27
      });
      expect(this.scope.blur).toHaveBeenCalled();
      expect(this.scope.clear).toHaveBeenCalled();
      this.scope.typeAhead = false;
      this.scope.change({
        keyCode: 27
      });
      expect(this.scope.blur).toHaveBeenCalled();
      return expect(this.scope.clear).toHaveBeenCalled();
    });
    it('should call not #clear or #blur otherwise', function() {
      spyOn(this.scope, 'clear');
      spyOn(this.scope, 'blur');
      this.scope.change({
        keyCode: -1
      });
      expect(this.scope.blur).not.toHaveBeenCalled();
      return expect(this.scope.clear).not.toHaveBeenCalled();
    });
    return it('should set scope.dirty to true otherwise', function() {
      this.scope.dirty = false;
      this.scope.typeAhead = false;
      this.scope.change({
        keyCode: -1
      });
      return expect(this.scope.dirty).toBe(true);
    });
  });
  describe('#update', function() {
    it('should call controller.search with scope.param', inject(function($rootScope) {
      this.scope.param = 'foo';
      $rootScope.search = function() {};
      spyOn($rootScope, 'search');
      this.scope.update();
      return expect($rootScope.search).toHaveBeenCalledWith(this.scope.param);
    }));
    return it('should set scope.dirty to false', function() {
      this.scope.dirty = true;
      this.scope.update();
      return expect(this.scope.dirty).toBe(false);
    });
  });
  return describe('#clear', function() {
    it('should set scope.param to ""', function() {
      this.scope.param = 'foo';
      this.scope.clear();
      return expect(this.scope.param).toBe('');
    });
    return it('should call #update', function() {
      spyOn(this.scope, 'update');
      this.scope.clear();
      return expect(this.scope.update).toHaveBeenCalled();
    });
  });
});
