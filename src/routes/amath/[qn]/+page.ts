import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
	const res = await fetch(`/api/amath/${params.qn}`);
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
};
