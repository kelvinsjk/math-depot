interface Checklist {
	[key: number]: { p1?: number[]; p2?: number[] };
}

const quadratics: Checklist = {
	14: {
		p1: [9],
	},
	15: {
		p1: [4],
	},
	16: {
		p1: [1],
	},
	17: {
		p2: [6],
	},
	18: {
		p2: [9],
	},
	19: {
		p1: [2],
	},
	20: {
		p2: [2, 5],
	},
};

const surds: Checklist = {
	13: {
		p2: [8],
	},
	14: {
		p2: [3],
	},
	15: {
		p2: [5],
	},
	16: {
		p1: [2],
	},
	17: {
		p1: [7],
	},
	18: {
		p1: [4],
	},
	19: {
		p1: [10],
	},
};

const polynomials: Checklist = {
	13: {
		p1: [6],
		p2: [3],
	},
	14: {
		p1: [4],
		p2: [2],
	},
	15: {
		p2: [8],
	},
	16: {
		p1: [5],
	},
	17: {
		p1: [8],
	},
	18: {
		p1: [3],
		p2: [8],
	},
	19: {
		p2: [3],
	},
	20: {
		p1: [3, 8],
	},
};

// unit 1: quadratics completed
// unit 2: surds completed
// unit 3: polynomials completed

const all = [quadratics, surds, polynomials];

import { union } from 'lodash-es';

const current: Checklist = {};
const end = 23;

let count = 0;
for (let i = 13; i <= end; i++) {
	current[i] = {
		p1: [],
		p2: [],
	};
	all.forEach((unit, j) => {
		current[i].p1 = union(current[i].p1, unit[i]?.p1);
		current[i].p2 = union(current[i].p2, unit[i]?.p2);

		if (j === all.length - 1) {
			count += current[i].p1?.length ?? 0;
			count += current[i].p2?.length ?? 0;
		}
	});
	current[i].p1?.sort((a, b) => a - b);
	current[i].p2?.sort((a, b) => a - b);
}

console.log(current);
console.log(count);
