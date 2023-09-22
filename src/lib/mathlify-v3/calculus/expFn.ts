import { type Fraction, Polynomial, Term } from '../core';
import { ExpTerm } from '../precalculus';
import { numberToFraction } from '../utils';

export class ExpFn extends Term {
	kind: 'expFunction';
	coeff: Fraction;
	fx: Polynomial;

	constructor(options?: {
		coeff?: number | Fraction;
		fx?: number | Fraction | string | (number | Fraction)[] | Polynomial;
	}) {
		let { coeff, fx } = {
			coeff: 1,
			fx: 'x',
			...options,
		};
		coeff = numberToFraction(coeff);
		if (!(fx instanceof Polynomial)) {
			fx = new Polynomial(fx);
		}
		const fxString = `\\mathrm{e}^{ ${fx} }`;
		super(coeff, fxString);
		this.coeff = coeff;
		this.fx = fx;
		this.kind = 'expFunction';
	}

	subIn(x: number | Fraction): ExpTerm {
		return new ExpTerm(this.fx.subIn(x), this.coeff);
	}

	/**
	 * only valid for linear fx at the moment
	 */
	differentiate(): ExpFn {
		if (this.fx.degree() !== 1) {
			throw new Error(
				`differentiating ExpFn only valid for linear fx at the moment. ${this.fx} received`,
			);
		}
		const fPrime = this.fx.differentiate().toFraction();
		return new ExpFn({ coeff: this.coeff.times(fPrime), fx: this.fx });
	}
}
