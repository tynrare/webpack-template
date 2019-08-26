/**
 * @file example.mtest.js
 * @format
 * @author tynrare
 * @version 1
 * @date 2019-08-26
 * @module Tests/Manual/Example
 */

/**
 * simple example test
 */
export default function run() {
	const element = document.createElement('div');
	element.innerHTML = 'test1';
	document.body.appendChild(component());
}
