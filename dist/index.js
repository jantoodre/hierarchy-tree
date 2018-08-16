'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.HierarchyTree = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HierarchyTree = function () {
	/**
  * 
  * @param {Object[]} data - Array of objects to be turned into a tree.
  * @param {Object} options - Additional options for HierarchyTree.
  * @param {string} [options.childKey='children'] - Key in the tree where 
  * 		children will be stored. When no children this property is undefined.
  * @param {string} [options.hierarchyKey='hierarchy'] - Key in the input data
  * 		where hierarchy level is indicated.
  * @param {number} [options.maxHierarchy] - Maximum hierarchy depth. If not
  * 		provided it will be recursively found.
  * @param {number} [options.hierarchyStart=1] - First level where the
  * 		hierarchies will start.
  * @param {parentObjects} [options.parentObjects=false] - Gives child its
  * 		parent items (with 'parentKeys' properties).
  * @param {parentKey} [options.parentKey='parents'] - Key for object where childrens'
  * 		parents will be stored. When item has no parents this property is undefined.
  * @param {parentKeys} [options.parentKeys=[]] - When 'parentObjects' is
  * 		true, each child will have its parents stored with these properties.
  */
	function HierarchyTree(data, options) {
		_classCallCheck(this, HierarchyTree);

		var _options$childKey = options.childKey,
		    childKey = _options$childKey === undefined ? 'children' : _options$childKey,
		    _options$hierarchyKey = options.hierarchyKey,
		    hierarchyKey = _options$hierarchyKey === undefined ? 'hierarchy' : _options$hierarchyKey,
		    _options$hierarchySta = options.hierarchyStart,
		    hierarchyStart = _options$hierarchySta === undefined ? 1 : _options$hierarchySta,
		    maxHierarchy = options.maxHierarchy,
		    _options$parentObject = options.parentObjects,
		    parentObjects = _options$parentObject === undefined ? false : _options$parentObject,
		    _options$parentKeys = options.parentKeys,
		    parentKeys = _options$parentKeys === undefined ? [] : _options$parentKeys,
		    _options$parentKey = options.parentKey,
		    parentKey = _options$parentKey === undefined ? 'parents' : _options$parentKey;


		this.data = data;
		this.childKey = childKey;
		this.hierarchyKey = hierarchyKey;
		this.hierarchyStart = hierarchyStart;
		this.tree = [];
		this.parentObjects = parentObjects;
		this.parentKeys = parentKeys;
		this.parentKey = parentKey;
		if (maxHierarchy) {
			this.maxHierarchy = maxHierarchy;
		} else {
			this.maxHierarchy = this.hierarchyStart;
			this.findMaxHierarchy();
		}
	}

	/**
  * Finds the depth of the tree.
  */


	_createClass(HierarchyTree, [{
		key: 'findMaxHierarchy',
		value: function findMaxHierarchy() {
			var _this = this;

			var hierarchyKey = this.hierarchyKey;

			this.data.forEach(function (item) {
				if (item[hierarchyKey] > _this.maxHierarchy) {
					_this.maxHierarchy = item[hierarchyKey];
				}
			});
		}

		/**
   * A generator function slicing items into subsets of
   * 		parents with its children.
   * @param {Object[]} items - (Sub)Set of items in data array.
   * @param {number} hierarchy - Level (depth) of current hierarchy.
   * @returns {Object[]} - Array of objects with a parent and its children.
   */

	}, {
		key: 'nextChildrenItems',
		value: /*#__PURE__*/_regenerator2.default.mark(function nextChildrenItems(items, hierarchy) {
			var start, end, children, _children;

			return _regenerator2.default.wrap(function nextChildrenItems$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							start = 0;
							end = 1;

						case 2:
							if (!(items.length > end)) {
								_context.next = 11;
								break;
							}

							if (!(items[end][this.hierarchyKey] === hierarchy)) {
								_context.next = 8;
								break;
							}

							children = items.slice(start, end);
							_context.next = 7;
							return children;

						case 7:
							start = end;

						case 8:
							end += 1;
							_context.next = 2;
							break;

						case 11:
							if (!(start !== items.length)) {
								_context.next = 15;
								break;
							}

							_children = items.slice(start, items.length);
							_context.next = 15;
							return _children;

						case 15:
						case 'end':
							return _context.stop();
					}
				}
			}, nextChildrenItems, this);
		})

		/**
   * 
   * @param {Object[]} items - (Sub)Set of items in data array which will be
   * 		used to create the tree. Each set has parent and its children.
   * @param {number} hierarchy - Level (depth) of current hierarchy.
   * @param {Object[]} parents - Parent nodes of current set with keys specified by
   * 		'parentKeys'.
   * @returns {Object[]} - Array of objects where each element has parent
   * 		spread into the object and its children as 'childKey' prop in
   * 		then object. Does not prouce empty array with 'childKey' on leaf
   * 		child.
   */

	}, {
		key: 'buildTree',
		value: function buildTree(items, hierarchy) {
			var _this2 = this;

			var parents = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

			var itemSetGenerator = [].concat(_toConsumableArray(this.nextChildrenItems(items, hierarchy)));
			var tree = [];
			var index = 0;
			var childKey = this.childKey,
			    maxHierarchy = this.maxHierarchy;

			itemSetGenerator.forEach(function (itemSet) {
				var newParents = [].concat(_toConsumableArray(parents));
				var currentItem = {};
				tree.push(_extends({}, itemSet[0]));
				if (hierarchy < maxHierarchy && itemSet.length > 0) {
					if (_this2.parentObjects) {
						_this2.parentKeys.reduce(function (acc, key) {
							acc[key] = itemSet[0][key];
							return acc;
						}, currentItem);
					}
					var childrenItems = [].concat(_toConsumableArray(itemSet.slice(1, itemSet.length)));
					tree[index][childKey] = _this2.buildTree(childrenItems, hierarchy + 1, [].concat(_toConsumableArray(newParents), [currentItem]));
				}
				if (_this2.parentObjects) {
					tree[index][_this2.parentKey] = newParents.length > 0 ? newParents : undefined;
				}
				index += 1;
			});
			if (tree.length > 0) {
				return tree;
			}
		}

		/**
   * @returns {Object[]} - Tree. It is built once, returns same tree
   * 		on each call.
   */

	}, {
		key: 'getTree',
		value: function getTree() {
			if (this.tree && this.tree.length === 0) {
				this.tree = this.buildTree(this.data, this.hierarchyStart, []);
			}
			return this.tree;
		}
	}]);

	return HierarchyTree;
}();

exports.HierarchyTree = HierarchyTree;
exports.default = HierarchyTree;