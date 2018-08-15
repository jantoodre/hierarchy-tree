// @flow

type Options = {
	childKey?: string,
	hierarchyKey?: string,
	hierarchyStart?: number,
	maxHierarchy?: number,
}

class HierarchyTree {
	data: Object[]
	childKey: string
	hierarchyKey: string
	hierarchyStart: number
	maxHierarchy: number
	tree: ?Object[]
	/**
	 * 
	 * @param {Object[]} data - Array of objects to be turned into a tree 
	 * @param {Object} options - Additional options for HierarchyTree
	 * @param {string} [options.childKey=children] - Key in the tree where 
	 * 		children will be stored
	 * @param {string} [options.hierarchyKey=hierarchy] - Key in the input data
	 * 		where hierarchy level is indicated
	 * @param {number} [options.maxHierarchy] - Maximum hierarchy depth. If not
	 * 		provided it will be recursively found
	 * @param {number} [options.hierarchyStart=1] - First level where the
	 * 		hierarchies will start
	 */
	constructor(data: Object[], options: Options) {
		const {
			childKey = 'children',
			hierarchyKey = 'hierarchy',
			hierarchyStart = 1,
			maxHierarchy,
		} = options;

		this.data = data;
		this.childKey = childKey;
		this.hierarchyKey = hierarchyKey;
		this.hierarchyStart = hierarchyStart;
		this.tree = [];
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
	findMaxHierarchy(): void {
		const { hierarchyKey } = this;
		this.data.forEach((item) => {
			if (item[hierarchyKey] > this.maxHierarchy) {
				this.maxHierarchy = item[hierarchyKey];
			}
		});
	}

	/**
	 * A generator function slicing items into subsets of
	 * 		parents with its children.
	 * @param {Object[]} items - (Sub)Set of items in data array
	 * @param {number} hierarchy - Level (depth) of current hierarchy
	 * @returns {Object[]} - Array of objects with a parent and its children  
	 */
	* nextChildrenItems(
		items: Object[],
		hierarchy: number,
	): Generator<Object[], void, Object[]> {
		let start = 0;
		let end = 1;
		while (items.length > end) {
			if (items[end][this.hierarchyKey] === hierarchy) {
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
	 * @param {Object[]} items - (Sub)Set of items in data array which will be
	 * 		used to create the tree. Each set has parent and its children.
	 * @param {number} hierarchy - Level (depth) of current hierarchy
	 * @returns {Object[]} - Array of objects where each element has parent
	 * 		spread into the object and its children as 'childKey' prop in
	 * 		then object. Does not prouce empty array with 'childKey' on leaf
	 * 		child.
	 */
	buildTree(items: Object[], hierarchy: number): Object[] | void {
		const itemSetGenerator = [...this.nextChildrenItems(items, hierarchy)];
		const tree = [];
		let index = 0;
		const { childKey, maxHierarchy } = this;
		itemSetGenerator.forEach((itemSet) => {
			tree.push({ ...itemSet[0] });
			if (hierarchy < maxHierarchy && itemSet.length > 0) {
				const childrenItems = [...(itemSet.slice(1, itemSet.length))];
				tree[index][childKey] = this.buildTree(
					childrenItems,
					hierarchy + 1,
				);
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
	getTree(): ?Object[] {
		if (this.tree && this.tree.length === 0) {
			this.tree = this.buildTree(this.data, this.hierarchyStart);
		}
		return this.tree;
	}
}

export { HierarchyTree };
export default HierarchyTree;
