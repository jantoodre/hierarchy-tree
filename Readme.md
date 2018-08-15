## HierarchyTree
A tool which will make your array of objects into an array of trees setting the objects in parent-children relationships.
For code documentation check [HierarchyTree](HierarchyTree.md)

**Important assumptions on your input data:**
* Your array has to be in order of the hierarchies
* Hierarchies for sequential objects should be in growing order (e.g. 1 -> 2 -> 3 not 1 -> 3)
* Each element should have hierarchy indicator

**Important notes on output:**
* Output is array of objects provided
	* Object has parent node spread
	* Objects' child nodes are in an array
	* Object without children does not have children prop


# Example

<details><summary>Code</summary>
<p>

```javascript
// const HierarchyTree = require('@jtoodre/hierarchy-tree').default; cjs
import HierarchyTree from '@jtoodre/hierarchy-tree';

const input = [
	{ generation: 1, name: "Kate Cosby", job: "Food Chemist" },
	{ generation: 2, name: "Lanna Osant", job: "Occupational Therapist" },
	{ generation: 3, name: "Gasper Povall", job: "Teacher" },
	{ generation: 4, name: "Gary Harder", job: "Sales Representative" },
	{ generation: 1, name: "Letisha Penny", job: "Project Manager" },
	{ generation: 2, name: "Vanna Haglington", job: "Marketing Assistant" },
	{ generation: 3, name: "Terence Anfosso", job: "Research Associate" },
	{ generation: 2, name: "Sim Skates", job: "Information Systems Manager" },
	{ generation: 3, name: "Teodora Aldersley", job: "Geologist II" },
	{ generation: 3, name: "Arvin Laybourn", job: "Civil Engineer" },
	{ generation: 1, name: "Carlie Toombes", job: "Systems Administrator I" },
	{ generation: 1, name: "Culley Endacott", job: "Speech Pathologist" },
	{ generation: 2, name: "Davidson Penright", job: "Compensation Analyst" },
	{ generation: 3, name: "Shelagh Janos", job: "Cost Accountant" },
	{ generation: 4, name: "Penni Geistbeck", job: "Social Worker" },
	{ generation: 5, name: "Jesselyn Snoding", job: "VP Accounting" },
	{ generation: 3, name: "Anneliese Berryman", job: "Mechanical Systems Engineer" },
	{ generation: 2, name: "Andeee Basili", job: "Software Consultant" },
	{ generation: 3, name: "Hyacinth Baldam", job: "Mechanical Systems Engineer" },
	{ generation: 1, name: "Maribeth Yewdall", job: "Accountant III" },
];

const options = {
	childKey: 'descendants',
	hierarchyKey: 'generation'
};

const treeMaker = new HierarchyTree(input, options);
const tree = treeMaker.getTree();

```
</p>
</details>

<details><summary>Output</summary>
<p>

```json
[
    {
        "generation": 1,
        "name": "Kate Cosby",
        "job": "Food Chemist",
        "descendants": [
            {
                "generation": 2,
                "name": "Lanna Osant",
                "job": "Occupational Therapist",
                "descendants": [
                    {
                        "generation": 3,
                        "name": "Gasper Povall",
                        "job": "Teacher",
                        "descendants": [
                            {
                                "generation": 4,
                                "name": "Gary Harder",
                                "job": "Sales Representative"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "generation": 1,
        "name": "Letisha Penny",
        "job": "Project Manager",
        "descendants": [
            {
                "generation": 2,
                "name": "Vanna Haglington",
                "job": "Marketing Assistant",
                "descendants": [
                    {
                        "generation": 3,
                        "name": "Terence Anfosso",
                        "job": "Research Associate"
                    }
                ]
            },
            {
                "generation": 2,
                "name": "Sim Skates",
                "job": "Information Systems Manager",
                "descendants": [
                    {
                        "generation": 3,
                        "name": "Teodora Aldersley",
                        "job": "Geologist II"
                    },
                    {
                        "generation": 3,
                        "name": "Arvin Laybourn",
                        "job": "Civil Engineer"
                    }
                ]
            }
        ]
    },
    {
        "generation": 1,
        "name": "Carlie Toombes",
        "job": "Systems Administrator I"
    },
    {
        "generation": 1,
        "name": "Culley Endacott",
        "job": "Speech Pathologist",
        "descendants": [
            {
                "generation": 2,
                "name": "Davidson Penright",
                "job": "Compensation Analyst",
                "descendants": [
                    {
                        "generation": 3,
                        "name": "Shelagh Janos",
                        "job": "Cost Accountant",
                        "descendants": [
                            {
                                "generation": 4,
                                "name": "Penni Geistbeck",
                                "job": "Social Worker",
                                "descendants": [
                                    {
                                        "generation": 5,
                                        "name": "Jesselyn Snoding",
                                        "job": "VP Accounting"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "generation": 3,
                        "name": "Anneliese Berryman",
                        "job": "Mechanical Systems Engineer"
                    }
                ]
            },
            {
                "generation": 2,
                "name": "Andeee Basili",
                "job": "Software Consultant",
                "descendants": [
                    {
                        "generation": 3,
                        "name": "Hyacinth Baldam",
                        "job": "Mechanical Systems Engineer"
                    }
                ]
            }
        ]
    },
    {
        "generation": 1,
        "name": "Maribeth Yewdall",
        "job": "Accountant III"
    }
]

```
</p>
</details>
