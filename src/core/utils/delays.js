/**
 * @format
 * @file delays.js
 * @author tynrare
 * @version 1
 * @module Core/Utils/Delays
 */

import logger from '@core/utils/logger.js';
import events from '@core/utils/events_manager.js';

/**
 * неймспейс c обертками для делеев, интервалов, реквестов и т.п.
 * @namespace
 */
const Delays = {
	/**
	 * callbacks on nearest game update
	 *
	 * @param {funcion} callback
	 */
	update(callback) {
		return events.once('update', (ms, dt) => {
			try {
				callback(ms, dt);
			} catch (err) {
				logger.error(err);
			}
		});
	},
	/**
	 * callbacks on animation frame
	 *
	 * @param {funcion} callback
	 */
	immediate(callback) {
		return requestAnimationFrame(() => {
			try {
				callback();
			} catch (err) {
				logger.error(err);
			}
		});
	},
	/**
	 * callbacks intervals
	 *
	 * @param {funcion} callback
	 * @param {number} time
	 */
	inteval(callback, time) {
		return setInterval(() => {
			try {
				callback();
			} catch (err) {
				logger.error(err);
			}
		}, time);
	},
	/**
	 * stops interval
	 *
	 * @param id interval id
	 */
	clearInterval(id) {
		clearInterval(id);
	},
	/**
	 * stops timeout
	 *
	 * @param id timeout id
	 */
	clearTimeout(id) {
		clearTimeout(id);
	},
	/**
	 * callbacks timeouts
	 *
	 * @param {funcion} callback
	 * @param {number} time
	 */
	timeout(callback, time) {
		return setTimeout(() => {
			try {
				callback();
			} catch (err) {
				logger.error(err);
			}
		}, time);
	}
};

export default Delays;
