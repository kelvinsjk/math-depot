import type { AnswerObject } from '$lib/interfaces';

import { qn } from '../../../pro/emath/01-1-numbers/20p1q05';

// answer and solution
const answer: AnswerObject = qn({
	base: 2,
	n1: 2,
	n2: 5,
})[1];

export async function GET() {
	return new Response(
		JSON.stringify({
			answer,
			topic: 'Numbers and their Operations',
		}),
	);
}
