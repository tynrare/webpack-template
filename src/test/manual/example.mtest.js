/**
 * @file example.mtest.js
 * @author tynrare
 * @version 1
 * @module Tests/Manual/Example
 */

/**
 * simple example test
 */
export default function run() {
	const element = document.createElement('div');
	element.innerHTML = 'test1';
	document.body.appendChild(element);
}
