/** @format */

require('babel-polyfill');

/**
 * test
 */
function testComponent() {
	const element = document.createElement('div');

	element.innerHTML = 'test1';

	return element;
}

cgn.logger.log('test');

document.body.appendChild(testComponent());
