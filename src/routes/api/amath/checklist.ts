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

const binomial: Checklist = {
	13: {
		p1: [5],
	},
	14: {
		p1: [1],
	},
	15: {
		p2: [4],
	},
	16: {
		p2: [2],
	},
	17: {
		p2: [3],
	},
	18: {
		p2: [2],
	},
	19: {
		p1: [7],
	},
	20: {
		p2: [3],
	},
};

const exp: Checklist = {
	13: {
		p1: [8],
		p2: [8],
	},
	14: {
		p2: [1, 5],
	},
	15: {
		p1: [2, 3],
	},
	16: {
		p2: [7],
	},
	17: {
		p2: [5, 7],
	},
	18: {
		p1: [1, 6],
	},
	19: {
		p1: [5, 10],
		p2: [4],
	},
	20: {
		p1: [2],
		p2: [8],
	},
};

const coordinate: Checklist = {
	13: {
		p1: [10],
		p2: [10],
	},
	14: {
		p1: [7],
		p2: [10],
	},
	15: {
		p2: [7],
	},
	16: {
		p1: [8],
		p2: [11],
	},
	17: {
		p1: [12],
		p2: [9],
	},
	18: {
		p1: [9],
		p2: [11],
	},
	19: {
		p1: [9],
		p2: [6],
	},
	20: {
		p1: [9],
		p2: [9],
	},
};

// unit 1: quadratics completed
// unit 2: surds completed
// unit 3: polynomials completed
// unit 4: binomial completed (35)
// unit 5: exponential completed (49)
// unit 6: coordinate geometry completed (64)

const all = [quadratics, surds, polynomials, binomial, exp, coordinate];

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
