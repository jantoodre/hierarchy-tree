"use strict";
// @flow
Object.defineProperty(exports, "__esModule", { value: true });
exports.HierarchyTree = void 0;
class HierarchyTree {
    /**
     *
     * @param {T[]} data - Array of objects to be turned into a tree.
     * @param {T} options - Additional options for HierarchyTree.
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
    constructor(data, options) {
        const { childKey = 'children', hierarchyKey = 'hierarchy', hierarchyStart = 1, maxHierarchy, parentObjects = false, parentKeys = [], parentKey = 'parents', } = options;
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
        }
        else {
            this.maxHierarchy = this.hierarchyStart;
            this.findMaxHierarchy();
        }
    }
    /**
     * Finds the depth of the tree.
     */
    findMaxHierarchy() {
        const { hierarchyKey } = this;
        this.data.forEach((item) => {
            // @ts-ignore
            const hierarchy = item[hierarchyKey];
            if (hierarchy > this.maxHierarchy) {
                this.maxHierarchy = hierarchy;
            }
        });
    }
    /**
     * A generator function slicing items into subsets of
     * 		parents with its children.
     * @param {T[]} items - (Sub)Set of items in data array.
     * @param {number} hierarchy - Level (depth) of current hierarchy.
     * @returns {T[]} - Array of objects with a parent and its children.
     */
    *nextChildrenItems(items, hierarchy) {
        let start = 0;
        let end = 1;
        while (items.length > end) {
            const lastItem = items[end];
            // @ts-ignore
            const lastItemHierarchy = lastItem[this.hierarchyKey];
            if (lastItemHierarchy === hierarchy) {
                const children = items.slice(start, end);
                yield children;
                start = end;
            }
            end += 1;
        }
        if (start !== items.length) {
            const children = items.slice(start, items.length);
            yield children;
        }
    }
    /**
     *
     * @param {T[]} items - (Sub)Set of items in data array which will be
     * 		used to create the tree. Each set has parent and its children.
     * @param {number} hierarchy - Level (depth) of current hierarchy.
     * @param {T[]} parents - Parent nodes of current set with keys specified by
     * 		'parentKeys'.
     * @returns {T[]} - Array of objects where each element has parent
     * 		spread into the object and its children as 'childKey' prop in
     * 		then object. Does not prouce empty array with 'childKey' on leaf
     * 		child.
     */
    buildTree(items, hierarchy, parents = []) {
        // @ts-ignore
        const itemSetGenerator = [...this.nextChildrenItems(items, hierarchy)];
        const tree = [];
        let index = 0;
        const { childKey, maxHierarchy } = this;
        itemSetGenerator.forEach((itemSet) => {
            const newParents = [...parents];
            const currentItem = {};
            tree.push(Object.assign({}, itemSet[0]));
            const item = tree[index];
            if (hierarchy < maxHierarchy && itemSet.length > 0) {
                if (this.parentObjects) {
                    this.parentKeys.reduce((acc, key) => {
                        // @ts-ignore
                        acc[key] = itemSet[0][key];
                        return acc;
                    }, currentItem);
                }
                const childrenItems = [...(itemSet.slice(1, itemSet.length))];
                // @ts-ignore
                item[childKey] = this.buildTree(childrenItems, hierarchy + 1, [...newParents, currentItem]);
            }
            if (this.parentObjects) {
                // @ts-ignore
                item[this.parentKey] =
                    newParents.length > 0 ? newParents : undefined;
            }
            index += 1;
        });
        if (tree.length > 0) {
            return tree;
        }
        return undefined;
    }
    /**
     * @returns {T[]} - Tree. It is built once, returns same tree
     * 		on each call.
     */
    getTree() {
        if (this.tree && this.tree.length === 0) {
            this.tree = this.buildTree(this.data, this.hierarchyStart, []);
        }
        return this.tree;
    }
}
exports.HierarchyTree = HierarchyTree;
exports.default = HierarchyTree;
