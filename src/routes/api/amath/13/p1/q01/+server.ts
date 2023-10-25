import type { AnswerObject } from '$lib/interfaces';

// typeset
const body = `Out of syllabus`;

// answer and solution
const answer: AnswerObject = {
	body,
};

export async function GET() {
	return new Response(
		JSON.stringify({
			answer,
			topic: 'Out of syllabus',
		}),
	);
}
