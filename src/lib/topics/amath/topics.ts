import { qns as qns01 } from './01-quadratics/qns';
import { qns as qns02 } from './02-surds/qns';
import { qns as qns03 } from './03-polynomials/qns';
import { qns as qns04 } from './04-binomial/qns';

export const topicalList: { [key: string]: { text: string; url: string }[] } = {
	'Quadratic Functions, Equations and Inequalities': qns01,
	Surds: qns02,
	'Polynomials, Cubic Equations and Partial Fractions': qns03,
	'Binomial Theorem': qns04,
};
