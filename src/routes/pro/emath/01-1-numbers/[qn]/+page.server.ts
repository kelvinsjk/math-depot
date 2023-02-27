import { getRandomInt, sample, Fraction, heads, getRandomFrac } from 'mathlify';
// import type { VarsPrimitive, StringObject } from '$lib/interfaces';
// import { varsSorter } from '$lib/utils/varsSorter';
import { qn as qn1, variablesGen as variablesGen1 } from '../20p1q05';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const qn = params.qn;
	let varsPrimitive: VarsPrimitive = {};
	let varsJSON: StringObject = {};

	switch (qn) {
		case '09': {
			const dens = [1, 2, 2, 3];
			const den = sample(dens);
			const a =
				den === 1
					? new Fraction(getRandomInt(1, 3))
					: den === 2
					? new Fraction(getRandomInt(1, 3) * 2 - 1, 2)
					: new Fraction(getRandomInt(1, 8, { avoid: [3, 6] }), 3);
			const b =
				den === 1
					? new Fraction(getRandomInt(-9, 9, { avoid: [0] }))
					: den === 2
					? new Fraction(getRandomInt(-10, 9) * 2 + 1, 2)
					: a.num % 3 === 1
					? new Fraction(getRandomInt(-7, 6) * 3 + 2, 3)
					: new Fraction(getRandomInt(-6, 7) * 3 + 1, 3);
			({ varsJSON, varsPrimitive } = varsSorter({
				a,
				b,
				c: getRandomInt(1, 19),
			}));
			break;
		}
		case '12': {
			const { a1, a2, a3 } = generate0112();
			({ varsJSON, varsPrimitive } = varsSorter({
				coeffs: [...a1, ...a2, ...a3],
				xs: [
					getRandomInt(100, 200) * 5,
					getRandomInt(140, 240) * 5,
					getRandomInt(600, 1100),
				],
			}));
			break;
		}
		case '13': {
			({ varsJSON, varsPrimitive } = varsSorter({
				...generate0113(),
				can: heads(),
			}));
			break;
		}
		case '15': {
			({ varsJSON, varsPrimitive } = varsSorter({
				...generate0115(),
			}));
			break;
		}
		case '16': {
			const root1 = getRandomInt(-3, 3);
			const root3 = getRandomInt(-5, 5, { avoid: [root1] });
			const root2 = getRandomFrac({ avoid: [root1, root3] });
			({ varsJSON, varsPrimitive } = varsSorter({
				root1,
				root2,
				root3,
				a: getRandomInt(1, 5),
				b: getRandomInt(-5, 5),
				lessThan: heads(),
			}));
			break;
		}
		case '18': {
			({ varsJSON, varsPrimitive } = varsSorter({
				...generate0118(),
			}));
			break;
		}
		case '19': {
			const base = getRandomInt(2, 4); // 4 represent 'e'
			let c: number, k: number;
			if (base === 2) {
				k = getRandomInt(1, 5);
				const cs = [3, 6, 5, 12, 10];
				c = cs[k - 1];
				if (k === 5) {
					k = 6;
				}
			} else if (base === 3) {
				k = 3;
				c = 6;
			} else {
				k = getRandomInt(1, 9);
				c = getRandomInt(k + 1, 10);
			}
			({ varsJSON, varsPrimitive } = varsSorter({
				lessThan: heads(),
				equality: heads(),
				base,
				k,
				c,
			}));
			break;
		}
		case '20': {
			const { a, x1 } = {
				a: getRandomFrac({ denRange: [2, 2], avoid: [0] }),
				x1: getRandomInt(-5, 5, { avoid: [0] }),
			};
			const c =
				a.den === 1 || x1 % 2 === 0
					? new Fraction(getRandomInt(-9, 9, { avoid: [0] }))
					: new Fraction(getRandomInt(-5, 4) * 2 + 1, 2);
			({ varsJSON, varsPrimitive } = varsSorter({
				a,
				c,
				x1,
				x2: getRandomInt(-9, 9, { avoid: [x1] }),
			}));
			break;
		}
		case '21': {
			const xMin = heads() ? 1 : -1;
			({ varsJSON, varsPrimitive } = varsSorter({
				xMin,
				a: getRandomInt(-2, 2, { avoid: [0] }) * 4,
				b: getRandomInt(-3, 3) * 3,
				d: getRandomInt(-9, 9),
				x1: getRandomInt(-2, 2, { avoid: [0, xMin] }),
			}));
			break;
		}
	}

	return {
		varsPrimitive,
		varsJSON,
		subtitles: {
			qn09: '2009 Paper 1 Question 1 Variant',
			qn12: '2012 Paper 1 Question 1 Variant',
			qn13: '2013 Paper 1 Question 2 Variant',
			qn15: '2015 Paper 1 Question 1 Variant',
			qn16: '2016 Paper 1 Question 1 Variant',
			qn18: '2018 Paper 1 Question 4 Variant',
			qn19: '2019 Paper 1 Question 4 Variant',
			qn20: '2020 Paper 2 Question 1 Variant',
			qn21: '2021 Paper 1 Question 1 Variant',
		},
	};
}) satisfies PageServerLoad;
