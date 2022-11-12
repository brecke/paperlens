import type {Author} from '../types/types';

function getFullName(author: Author) {
	return [author.foreName, author.lastName].join(' ');
}

export {getFullName};
