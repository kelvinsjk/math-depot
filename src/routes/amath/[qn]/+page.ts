import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
	const regex: RegExp = /^([0-9]{2})(p[1|2])(q[0-9]{2})$/;
	const match: RegExpMatchArray | null = params.qn.match(regex);
	if (match) {
		const [, year, paper, qn] = match;
		const res = await fetch(`/api/amath/${year}/${paper}/${qn}`);
		if (!res.ok) {
			return {
				status: res.status,
				answer: '',
				solution: '',
				topic: '',
				qn: params.qn,
				qnFound: false,
			};
		}
		const { answer, solution, topic, topics } = await res.json();
		return {
			status: res.status,
			answer,
			solution,
			topic,
			topics,
			qn: params.qn,
			qnFound: true,
		};
	}
};
