/**
 * @file logger.js
 * logger from https://github.com/jonnyreeves/js-logger
 * @author tynrare
 * @version 1
 * @module Core/Utils/Logger
 */

import LoggerCore from '@lib/logger.js';

LoggerCore.useDefaults();
LoggerCore.setLevel(LoggerCore.LOG);

const DEFAULT_LOGGING_LEVEL = 2;

/**
 * logger wrapper
 */
class Logger {
	/**
	 * key: group names for filter log. value: group logging level
	 *
	 * @private
	 */
	#groups = {
		'core-events': 5
	};

	/**
	 * logging level for groups
	 */
	loggingLevel = DEFAULT_LOGGING_LEVEL;

	/**
	 * Will log data if its group logging enabled. Add in #group you own fields mannualy or call assignGroupLevels
	 *
	 * @param {string} group group for log
	 * @param {*?} args any logging data
	 */
	group(group, ...args) {
		const level = this.#groups[group];
		if (level && this.loggingLevel >= level) {
			LoggerCore.log(`${group}: `, ...args);
		}
	}

	/**
	 * Simple log() method wrapper
	 *
	 * @param {*?} args message to print
	 */
	static log(...args) {
		LoggerCore.log(...args);
	}

	/**
	 * Simple warn() method wrapper
	 *
	 * @param {*?} args message to print
	 */
	static warn(...args) {
		LoggerCore.warn(...args);
	}

	/**
	 * Simple error() method wrapper
	 *
	 * @param {*?} args message to print
	 */
	static error(...args) {
		LoggerCore.warn(...args);
	}

	/**
	 * sets new logging levels for groups
	 *
	 * @param {object<string, number>} levels new levels for all old or new groups
	 */
	assignGroupLevels(levels) {
		this.#groups = Object.assign(this.#groups, levels);
	}
}

export default new Logger();
