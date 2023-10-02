import { readFile } from 'fs/promises';

const nouns = JSON.parse(
	await readFile(new URL('../static/nouns.json', import.meta.url))
);
const verbs = JSON.parse(
	await readFile(new URL('../static/verbs.json', import.meta.url))
);

function getRandomSlug() {
	const rnIndex = getRandomNumber(nouns.length);
	const rvIndex = getRandomNumber(verbs.length);
	const rNumber = getRandomNumber(10000);
	console.log(rnIndex, rvIndex);
	const noun = nouns[rnIndex];
	const verb = verbs[rvIndex];

	return `${noun}-${verb}-${rNumber}`;
}

const getRandomNumber = (max) => Math.floor(Math.random() * max);

export { getRandomSlug, getRandomNumber };
