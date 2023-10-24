enum Modes {
	text, // 0
	math, // 1
	display, // 2
}

import type { Options } from 'temml';

export interface Modules {
	math: (x: string, options?: Options) => string;
	display: (x: string, options?: Options) => string;
	em?: (x: string) => string;
	b?: (x: string) => string;
	br?: () => string;
	hr?: () => string;
	postProcess?: (x: string) => string;
}

const identity = (x: string) => x;

export function mathlifyGen(
	modules: Modules,
): (strings: TemplateStringsArray, ...values: unknown[]) => string {
	return (strings: TemplateStringsArray, ...values: unknown[]) => {
		let curr = '';
		let acc = '';
		let mode = Modes.text;
		let options: Options = {};
		strings.forEach((str, i) => {
			const nextVal = values[i] ?? '';
			if (mode === Modes.text) {
				if (str.endsWith('@')) {
					curr += `${str.slice(0, str.length - 1)}${handleTextMode(`${nextVal}`, modules)}`;
				} else {
					// starts new environment
					[mode, acc, curr] = startNewEnv(str, '', nextVal, curr, modules);
					options = {};
				}
			} else if (mode === Modes.math) {
				// checks for \n or \r\n non-greedily
				const regex = /([^]*?)(\r?\n)([^]*)/;
				const match = str.match(regex);
				if (match) {
					// end math mode
					const [, before, newline, after] = match;
					acc += `${before}`;
					if (acc) {
						curr += modules.math(acc, options);
					}
					[mode, acc, curr] = startNewEnv(after, newline, nextVal, curr, modules);
					options = {};
				} else {
					// continue math mode
					if (str.endsWith(`@`)) {
						// options
						options = nextVal;
						acc += `${str.slice(0, str.length - 1)}`;
					} else {
						acc += `${str}${nextVal}`;
					}
					if (i === strings.length - 1) {
						// final string
						curr += modules.math(acc, options);
					}
				}
			} else if (mode === Modes.display) {
				// checks for \n\n or \r\n\r\n within str. group into (#1)(#2) where #2 = \n or \r\n and it is done non-greedily
				const regex = /([^]*?)(\r?\n[ \t]*\r?\n)([^]*)/;
				const match = str.match(regex);
				if (match) {
					// end display mode
					const [, before, newline, after] = match;
					acc += before;
					if (acc) {
						curr += modules.display(acc, options);
					}
					[mode, acc, curr] = startNewEnv(after, newline, nextVal, curr, modules);
					options = {};
				} else {
					// continue display mode
					if (str.endsWith(`@`)) {
						// options
						options = nextVal;
						acc += `${str.slice(0, str.length - 1)}`;
					} else {
						acc += `${str}${nextVal}`;
					}
					if (i === strings.length - 1) {
						// final string
						curr += modules.display(acc, options);
					}
				}
			}
		});
		// post process
		if (modules.postProcess) {
			curr = modules.postProcess(curr);
		}
		return curr;
	};
}

// returns [Mode, acc, curr]
function startNewEnv(
	after: string,
	newline: string,
	nextVal: unknown,
	curr: string,
	modules: Modules,
): [Modes, string, string] {
	if (after.endsWith('$')) {
		// new display mode
		return [Modes.display, `${nextVal}`, curr + `${newline}${after.slice(0, after.length - 1)}`];
	} else if (after.endsWith('@')) {
		// new text mode
		return [
			Modes.text,
			'',
			curr +
				`${newline}${after.slice(0, after.length - 1)}${handleTextMode(`${nextVal}`, modules)}`,
		];
	} else {
		// new math mode
		return [Modes.math, `${nextVal}`, curr + newline + after];
	}
}

function handleTextMode(nextVal: string, modules: Modules): string {
	if (nextVal.startsWith('em{') && nextVal.endsWith('}')) {
		const emArg = nextVal.slice(3, nextVal.length - 1);
		return modules.em ? modules.em(emArg) : identity(emArg);
	} else if (nextVal.startsWith('b{') && nextVal.endsWith('}')) {
		const bArg = nextVal.slice(2, nextVal.length - 1);
		return modules.b ? modules.b(bArg) : identity(bArg);
	} else if (nextVal === '@br') {
		return modules.br ? modules.br() : nextVal;
	} else if (nextVal === '@hr') {
		return modules.hr ? modules.hr() : nextVal;
	} else {
		return nextVal;
	}
}
