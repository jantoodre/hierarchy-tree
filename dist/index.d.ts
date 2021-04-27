declare type Options = {
    childKey?: string;
    hierarchyKey?: string;
    hierarchyStart?: number;
    maxHierarchy?: number;
    parentObjects?: boolean;
    parentKeys?: string[];
    parentKey?: string;
};
declare class HierarchyTree<T> {
    data: T[];
    childKey: string;
    hierarchyKey: string;
    hierarchyStart: number;
    maxHierarchy: number;
    tree: T[] | undefined;
    parentObjects: boolean;
    parentKeys: string[];
    parentKey: string;
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
    constructor(data: T[], options: Options);
    /**
     * Finds the depth of the tree.
     */
    findMaxHierarchy(): void;
    /**
     * A generator function slicing items into subsets of
     * 		parents with its children.
     * @param {T[]} items - (Sub)Set of items in data array.
     * @param {number} hierarchy - Level (depth) of current hierarchy.
     * @returns {T[]} - Array of objects with a parent and its children.
     */
    nextChildrenItems(items: T[], hierarchy: number): Generator<T[], void, T[]>;
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
    buildTree(items: T[], hierarchy: number, parents?: T[]): T[] | undefined;
    /**
     * @returns {T[]} - Tree. It is built once, returns same tree
     * 		on each call.
     */
    getTree(): T[] | undefined;
}
export { HierarchyTree };
export default HierarchyTree;
//# sourceMappingURL=index.d.ts.map