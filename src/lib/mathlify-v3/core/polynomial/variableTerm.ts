import { numberToFraction } from '../../utils';
import { Term, MathSymbol } from '../algebra';
import type { Fraction } from '../fraction';

export class VariableTerm extends Term {
	kind: 'variableTerm';
	variable: string;

	constructor(
		coeff: number | Fraction,
		variable: string | MathSymbol = 'x',
		power: number | Fraction = 1,
	) {
		super(coeff, [variable, power]);
		this.kind = 'variableTerm';
		this.variable = typeof variable === 'string' ? variable : variable.symbol;
	}

	subIn(x: number | Fraction): Fraction {
		const power = this.symbols[this.variable].power;
		if (!power.isInteger()) {
			throw new Error(`fractional power ${power} not supported currently`);
		}
		return this.coeff.times(numberToFraction(x).pow(power.num));
	}
}
