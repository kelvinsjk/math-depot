import { Expression, MathSymbol, Term } from '../algebra';
import { VariableTerm } from './variableTerm';
import { Fraction } from '../fraction';
import { numberToFraction } from '../../utils';

export class Polynomial extends Expression {
	coeffs: Fraction[];
	ascending: boolean;
	kind: 'polynomial';
	variable: string;

	constructor(
		coeffs: number | Fraction | string | (number | Fraction)[],
		options?: {
			variable?: string | MathSymbol;
			ascending?: boolean;
			degree?: number;
		},
	) {
		let variable = options?.variable ?? 'x';
		const ascending = options?.ascending ?? false;
		const degree = options?.degree ?? 1;
		if (typeof coeffs === 'number' || coeffs instanceof Fraction) {
			// k x
			const newCoeffs = new Array(degree).fill(0);
			newCoeffs.push(coeffs);
			if (!ascending) {
				coeffs = newCoeffs.reverse();
			}
			coeffs = newCoeffs;
		} else if (typeof coeffs === 'string') {
			variable = coeffs;
			coeffs = ascending ? [0, 1] : [1, 0];
		}
		if (!ascending) {
			coeffs = coeffs.reverse();
		}
		const variableTerms: VariableTerm[] = [];
		const coeffsFrac: Fraction[] = [];
		coeffs.forEach((coeff, i) => {
			variableTerms.push(new VariableTerm(coeff, variable, i));
			coeffsFrac.push(numberToFraction(coeff));
		});
		while (coeffsFrac[coeffsFrac.length - 1].isEqualTo(0) && coeffsFrac.length > 1) {
			coeffsFrac.pop();
			variableTerms.pop();
		}
		super(...variableTerms);
		this.coeffs = coeffsFrac;
		this.ascending = ascending;
		this.kind = 'polynomial';
		this.variable = typeof variable === 'string' ? variable : variable.symbol;
	}

	plus(x: number | Fraction | Polynomial): Polynomial;
	plus(
		x: MathSymbol | string | [string | MathSymbol, number | Fraction] | Expression,
	): Expression;
	plus(
		x:
			| number
			| Fraction
			| MathSymbol
			| string
			| [string | MathSymbol, number | Fraction]
			| Term
			| Expression
			| Polynomial,
	): Expression | Polynomial {
		if (!(typeof x === 'number' || x instanceof Fraction || x instanceof Polynomial)) {
			return super.plus(x);
		}
		const coeffs1a = this.coeffs;
		const coeffs2a = x instanceof Polynomial ? x.coeffs : [numberToFraction(x)];
		const [coeffs1, coeffs2] = padZeros(coeffs1a, coeffs2a);
		const newCoeffs = coeffs1.map((coeff1, i) => coeff1.plus(coeffs2[i]));
		if (!this.ascending) {
			newCoeffs.reverse();
		}
		return new Polynomial(newCoeffs, {
			variable: this.variable,
			ascending: this.ascending,
		});
	}

	degree(): number {
		return this.coeffs.length - 1;
	}

	/** multiplies two polynomials */
	times(p2: number | Fraction | MathSymbol | string | Polynomial): Polynomial;
	times(p2: Term): Expression;
	times(
		p2: number | Fraction | MathSymbol | string | Term | Polynomial,
	): Expression | Polynomial {
		if (typeof p2 === 'number' || p2 instanceof Fraction || typeof p2 === 'string') {
			p2 = typeof p2 === 'string' ? new Polynomial(p2) : new Polynomial([p2]);
		} else if (p2 instanceof MathSymbol) {
			p2 = new Polynomial(p2.symbol);
		}
		if (!(p2 instanceof Polynomial)) {
			return super.times(p2);
		}
		const degree = this.degree() + p2.degree();
		const coeffs = new Array(degree + 1).fill(new Fraction(0));
		for (let i = 0; i < this.coeffs.length; i++) {
			for (let j = 0; j < p2.coeffs.length; j++) {
				coeffs[i + j] = coeffs[i + j].plus(this.coeffs[i].times(p2.coeffs[j]));
			}
		}
		if (!this.ascending) {
			coeffs.reverse();
		}
		return new Polynomial(coeffs, { ascending: this.ascending, variable: this.variable });
	}

	negative(): Polynomial {
		return this.times(-1);
	}

	minus(x: number | Fraction | Polynomial): Polynomial {
		if (!(x instanceof Polynomial)) {
			x = new Polynomial([x]);
		}
		return this.plus(x.negative());
	}

	toFraction(): Fraction {
		if (this.degree() !== 0) {
			throw new Error(
				`Polynomial.toFraction method only works for degree 0 polynomial. ${this} received`,
			);
		}
		return this.coeffs[0];
	}

	/**
	 * divide by a *scalar*
	 */
	divide(p2: number | Fraction): Polynomial {
		p2 = numberToFraction(p2);
		return this.times(p2.reciprocal());
	}

	/**
	 * exponentiation
	 * @returns this polynomial taken to a power of `n`
	 */
	pow(n: number): Polynomial {
		if (!(Number.isInteger(n) && n >= 0)) {
			throw new RangeError(`only non-negative integers allowed for n (${n} received)`);
		}
		let newPoly = new Polynomial([1], {
			variable: this.variable,
			ascending: this.ascending,
		});
		for (let i = 0; i < n; i++) {
			newPoly = newPoly.times(this);
		}
		return newPoly;
	}

	/**
	 * replace x with a new polynomial
	 * @param x if string, replaces the variable
	 */
	replaceXWith(x: string | Polynomial): Polynomial {
		const p2 = typeof x === 'string' ? new Polynomial(x) : x;
		return this.coeffs.reduce(
			(prev, coeff, i) => prev.plus(p2.pow(i).times(coeff)),
			new Polynomial([0], { ascending: this.ascending, variable: p2.variable }),
		);
	}

	subIn(x: number | Fraction): Fraction {
		return this.coeffs.reduce((prev, coeff, i) => {
			return prev.plus(coeff.times(numberToFraction(x).pow(i)));
		}, new Fraction(0));
	}

	/** derivative of the polynomial */
	differentiate(): Polynomial {
		if (this.degree() === 0) {
			return new Polynomial([0]);
		}
		const newCoeffs = this.coeffs.map((coeff, i) => coeff.times(i)).slice(1);
		if (!this.ascending) {
			newCoeffs.reverse();
		}
		return new Polynomial(newCoeffs, {
			ascending: this.ascending,
			variable: this.variable,
		});
	}

	/**
	 * replace x with x+k
	 */
	shift(k: number | Fraction): Polynomial {
		return this.replaceXWith(
			new Polynomial([1, k], { ascending: this.ascending, variable: this.variable }),
		);
	}

	/**
	 * square
	 *
	 * @returns the square of this polynomial
	 *  */
	square(): Polynomial {
		return this.pow(2);
	}

	/**
	 * returns a polynomial with positive leading coefficient and gcd(...coeffs) = 1
	 * */
	simplify(): Polynomial {
		const [newCoeffs] = Fraction.factorize(...this.coeffs);
		if (this.ascending) {
			newCoeffs.reverse();
		}
		return new Polynomial(newCoeffs, {
			ascending: this.ascending,
			variable: this.variable,
		});
	}
}

function padZeros(coeffs1: Fraction[], coeffs2: Fraction[]): [Fraction[], Fraction[]] {
	const length1 = coeffs1.length;
	const length2 = coeffs2.length;
	const coeffs1Duplicate = [...coeffs1];
	const coeffs2Duplicate = [...coeffs2];
	const shorterArray = length1 < length2 ? coeffs1Duplicate : coeffs2Duplicate;
	shorterArray.push(...new Array(Math.abs(length1 - length2)).fill(new Fraction(0)));
	return [coeffs1Duplicate, coeffs2Duplicate];
}
