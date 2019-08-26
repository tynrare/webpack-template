/**
 * @file index.js
 *
 * @format
 * @author tynrare
 * @version 1
 * @date 2019-08-26
 * @module Tests/Manual/Index
 */

/**
 * returns cases list
 *
 * @return {Object<function>} list of cases
 */
export function getTestsCasesList() {
	/* eslint-disable global-require */
	//Add new tests here:
	return {
		example: require('@test/manual/example.mtest.js')
	};
	/* eslint-enable global-require */
}

/**
 * starts test if it set in URL
 */
export function initTests() {
	const urlParams = new URLSearchParams(window.location.search);

	if (urlParams.has('testcase')) {
		const name = urlParams.get('testcase');
		const testcase = getTestsCasesList()[name];
		cgn.logger.info('start test ' + name);
		testcase();
	} else {
		cgn.logger.error('nothing to run. select case in dev menu');
	}
}

initTests();

/**
 * Sets new URL and reloads page. Expects new page will start 'initTests'
 * @param {String} name
 */
export function runTestCase(name) {
	window.location.search = new URLSearchParams({ testcase: name }).toString();
}
