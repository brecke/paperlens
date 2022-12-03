import type {Author} from '../types/types';

function getFullName(author: Author) {
	const foreName = author?.foreName ?? '';
	const lastName = author?.lastName ?? '';
	return [foreName, lastName].join(' ');
}

export {getFullName};
