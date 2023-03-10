import { qns as qns01 } from './01-quadratics/qns';
import { qns as qns02 } from './02-surds/qns';
import { qns as qns03 } from './03-polynomials/qns';
import { qns as qns04 } from './04-binomial/qns';
import { qns as qns05 } from './05-logarithms/qns';
import { qns as qns06 } from './06-coordinate/qns';
import { qns as qns07 } from './07-linear/qns';
import { qns as qns08 } from './08-trigo-i/qns';
import { qns as qns09 } from './09-trigo-ii/qns';
import { qns as qns10 } from './10-differentiation-i/qns';
import { qns as qns11 } from './11-differentiation-ii/qns';
import { qns as qns12 } from './12-differentiation-iii/qns';
import { qns as qns13 } from './13-integration-i/qns';
import { qns as qns14 } from './14-integration-ii/qns';
import { qns as qns15 } from './15-kinematics/qns';
import { qns as qns16 } from './16-geometry/qns';

export const topicalList: { [key: string]: { text: string; url: string }[] } = {
	'Quadratic Functions, Equations and Inequalities': qns01,
	Surds: qns02,
	'Polynomials, Cubic Equations and Partial Fractions': qns03,
	'Binomial Theorem': qns04,
	'Exponential and Logarithmic Functions': qns05,
	'Coordinate Geometry': qns06,
	'Linear Law': qns07,
	'Trigonometric Functions and Equations': qns08,
	'Trigonometric Identities and Formulae': qns09,
	'Gradients, Derivatives and Differentiation Techniques': qns10,
	'Applications of Differentiation': qns11,
	'Differentiation of Trigonometric, Exponential and Logarithmic Functions and their Applications':
		qns12,
	Integration: qns13,
	'Applications of Integration': qns14,
	Kinematics: qns15,
	'Proofs in Plane Geometry': qns16,
};
