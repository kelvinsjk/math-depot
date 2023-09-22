import { Fraction } from '../';
import { numberToFraction } from '../../utils';
import { MathSymbol } from './mathSymbol';

export class Term {
	/** kind of Mathlify object */
	kind: string;
	/** coefficient */
	coeff: Fraction;
	/** each term of the form {symbol: MathSymbol, power: Fraction} */
	symbols: { [key: string]: { symbol: MathSymbol; power: Fraction } };

	constructor(
		...args: (
			| number
			| Fraction
			| MathSymbol
			| string
			| [string | MathSymbol, number | Fraction]
		)[]
	) {
		let coeff = new Fraction(1);
		let symbols: { [key: string]: { symbol: MathSymbol; power: Fraction } } = {};
		args.forEach((basicTerm) => {
			if (Array.isArray(basicTerm)) {
				const [term, termPower] = basicTerm;
				appendToSymbols(symbols, term, termPower);
			} else if (typeof basicTerm === 'number' || basicTerm instanceof Fraction) {
				coeff = coeff.times(basicTerm);
			} else {
				// basicTerm of type string or MathSymbol
				appendToSymbols(symbols, basicTerm);
			}
		});
		this.coeff = coeff;
		if (this.coeff.isEqualTo(0)) {
			symbols = {};
		}
		for (const symbol in symbols) {
			if (symbols[symbol].power.isEqualTo(0)) {
				delete symbols[symbol];
			}
		}
		this.symbols = symbols;
		const length = Object.keys(symbols).length;
		if (length === 0) {
			this.kind = 'fractionTerm';
		} else if (length === 1) {
			const symbol = Object.keys(symbols)[0];
			this.kind =
				this.symbols[symbol].symbol.kind === 'symbol'
					? 'singleton'
					: `${this.symbols[symbol].symbol.kind}Term`;
		} else {
			this.kind = 'term';
		}
	}

	times(x: number | Fraction | string | MathSymbol | Term): Term {
		if (typeof x === 'number' || x instanceof Fraction) {
			return new Term(this.coeff.times(x), ...termObjectToArray(this.symbols));
		} else if (typeof x === 'string' || x instanceof MathSymbol) {
			return new Term(this.coeff, ...termObjectToArray(this.symbols), x);
		} else {
			// x of type term
			return new Term(
				this.coeff,
				x.coeff,
				...termObjectToArray(this.symbols),
				...termObjectToArray(x.symbols),
			);
		}
	}

	/**
	 * exponentiation
	 * @param n non-negative integer
	 * @returns this term to the power of `n`
	 */
	pow(n: number | Fraction): Term {
		if (n instanceof Fraction) {
			if (n.den !== 1) {
				throw new RangeError('only integral n are allowed for fraction.pow(n)');
			}
			n = n.valueOf();
		}
		if (!Number.isInteger(n)) {
			throw new RangeError('only integral n are allowed for fraction.pow(n)');
		}
		const multiple = n < 0 ? this.reciprocal() : this;
		let x = new Term(1);
		for (let i = 0; i < Math.abs(n); i++) {
			x = x.times(multiple);
		}
		return x;
	}

	square(): Term {
		return this.pow(2);
	}

	reciprocal(): Term {
		return new Term(
			this.coeff.reciprocal(),
			...Object.keys(this.symbols).map((x) => {
				return [this.symbols[x].symbol, this.symbols[x].power.reciprocal()] as [
					MathSymbol,
					Fraction,
				];
			}),
		);
	}

	divide(x: number | Fraction | string | MathSymbol | Term): Term {
		if (typeof x === 'number' || x instanceof Fraction) {
			return new Term(this.coeff.divide(x), ...termObjectToArray(this.symbols));
		} else if (typeof x === 'string' || x instanceof MathSymbol) {
			return new Term(this.coeff, ...termObjectToArray(this.symbols), [x, -1]);
		} else {
			// x of type term
			return this.times(x.reciprocal());
		}
	}

	negative(): Term {
		return new Term(this.coeff.negative(), ...termObjectToArray(this.symbols));
	}

	isRational(): boolean {
		return Object.keys(this.symbols).length === 0;
	}

	/** check whether two terms are 'like terms'
	 * (i.e. same symbols with the same powers)
	 */
	isLike(x: Term): boolean {
		if (Object.keys(this.symbols).length !== Object.keys(x.symbols).length) {
			return false;
		}
		for (const term in this.symbols) {
			if (!(term in x.symbols)) {
				return false;
			} else if (this.symbols[term].power.isNotEqualTo(x.symbols[term].power)) {
				return false;
			}
		}
		return true;
	}

	plus(x: Term): Term {
		if (!this.isLike(x)) {
			throw new Error(
				`addition of terms only work for like terms. ${this} and ${x} received. Consider using the Expression class`,
			);
		}
		return new Term(this.coeff.plus(x.coeff), ...termObjectToArray(this.symbols));
	}
	minus(x: Term): Term {
		if (!this.isLike(x)) {
			throw new Error(
				`subtraction of terms only work for like terms. ${this} and ${x} received. Consider using the Expression class`,
			);
		}
		return new Term(this.coeff.minus(x.coeff), ...termObjectToArray(this.symbols));
	}

	toString(): string {
		let numString = '',
			denString = '';
		Object.keys(this.symbols).forEach((key) => {
			const { symbol, power } = this.symbols[key];
			if (power.isEqualTo(1)) {
				numString += `${symbol} `;
			} else if (power.isEqualTo(-1)) {
				denString += `${symbol} `;
			} else if (power.isGreaterThan(0)) {
				numString += `${symbol}^{${power}}`;
			} else if (power.isLessThan(0)) {
				denString += `${symbol}^{${power.abs()}}`;
			} else {
				throw new Error(`Unexpected power 0 term`);
			}
		});
		if (this.coeff.isEqualTo(0)) {
			return `0`;
		}
		if (denString === '') {
			return numString === ''
				? this.coeff.toString()
				: termToString(this.coeff, numString);
		}
		const sign = this.coeff.isGreaterThan(0) ? '' : '- ';
		if (numString === '') {
			return `${sign}\\frac{${this.coeff.abs().num}}{${termToString(
				this.coeff.den,
				denString,
			)}}`;
		}
		return `${sign}\\frac{${termToString(
			this.coeff.abs().num,
			numString,
		)}}{${termToString(this.coeff.den, denString)}}`;
	}
}

function appendToSymbols(
	symbols: { [key: string]: { symbol: MathSymbol; power: Fraction } },
	symbol: string | MathSymbol,
	power: number | Fraction = new Fraction(1),
): void {
	const symbolString = typeof symbol === 'string' ? symbol : symbol.symbol;
	if (symbolString in symbols) {
		symbols[symbolString].power = symbols[symbolString].power.plus(power);
	} else {
		symbols[symbolString] = {
			symbol: typeof symbol === 'string' ? new MathSymbol(symbol) : symbol,
			power: numberToFraction(power),
		};
	}
}

function termObjectToArray(termObject: {
	[key: string]: { symbol: MathSymbol; power: Fraction };
}): [MathSymbol, Fraction][] {
	return Object.keys(termObject).map((key) => {
		return [termObject[key].symbol, termObject[key].power];
	});
}

function termToString(coeff: Fraction | number, term: string): string {
	coeff = numberToFraction(coeff);
	if (coeff.isEqualTo(0)) {
		return `0`;
	}
	if (coeff.isEqualTo(1)) {
		return term;
	}
	if (coeff.isEqualTo(-1)) {
		return `- ${term}`;
	}
	return `${coeff} ${term}`;
}
