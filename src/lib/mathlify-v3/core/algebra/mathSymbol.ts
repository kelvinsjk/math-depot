export class MathSymbol {
	/** kind of Mathlify object */
	kind: string;
	/** LaTeX string representation of symbol */
	symbol: string;

	constructor(string: string, kind?: string) {
		this.symbol = string;
		this.kind = kind ?? 'symbol';
	}

	toString(): string {
		return this.symbol;
	}
}
