const nouns = [
	'recess',
	'neck',
	'shoes',
	'noise',
	'cats',
	'shoes',
	'join',
	'curve',
	'frog',
	'bed',
	'coal',
	'crook',
	'stem',
	'error',
	'chance',
	'thought',
	'boundary',
	'fork',
	'line',
	'cloud',
	'curve',
	'steel',
	'afternoon',
	'glove',
	'support',
	'cattle',
	'bead',
	'connection',
	'jam',
	'spy',
	'camp',
	'turkey',
	'basketball',
	'weather',
	'test',
	'weight',
	'lettuce',
	'harry',
	'snake'
];

const verbs = [
	'lose',
	'conserve',
	'ski',
	'find',
	'sabotage',
	'zinc',
	'conduct',
	'tree',
	'transform',
	'renew',
	'order',
	'inaugurate',
	'scarp',
	'rend',
	'approach',
	'sight',
	'plod',
	'apologize',
	'plead',
	'savor',
	'consort',
	'soar',
	'crackle',
	'typeset',
	'place',
	'free',
	'illuminate',
	'inject',
	'erase',
	'scant',
	'display',
	'force',
	'encourage',
	'lean',
	'chip',
	'chip',
	'forecast',
	'solve',
	'moan',
	'save'
];

exports.get = async (req, res) => {
	const rnIndex = getRandomNumber(nouns.length);
	const rvIndex = getRandomNumber(verbs.length);
	const rNumber = getRandomNumber(10000);
	console.log(rnIndex, rvIndex);
	const noun = nouns[rnIndex];
	const verb = verbs[rvIndex];

	res.send({ name: `${noun}-${verb}-${rNumber}` });
};

const getRandomNumber = max => Math.floor(Math.random() * max);
