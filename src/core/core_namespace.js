/**
 * @format
 * @file core_namespace.js
 * @author tynrare
 * @version 1
 * @date 2019-05-14
 * @module Core/CoreNamespace
 */

import logger from '@core/utils/logger.js';
import events from '@core/utils/events_manager.js';
import delays from '@core/utils/delays.js';

/**
 * От core game namespace. Глобальный объект, доступный во всем коде.
 * Хранит в себе основные игровые и сервисные методы и параметры
 *
 * @namespace
 * @public
 * @borrows module:Utils/Logger.Logger as logger
 * @borrows module:Utils/EventsManager.EventsManager as events
 */
const cgn = {
	/**
	 * @see {@link module:Utils/Logger.Logger}
	 * @static
	 */
	logger,
	/**
	 * @see {@link module:Utils/EventsManager.EventsManager}
	 * @static
	 */
	events,
	/**
	 * @see {@link module:Utils/Delays.Delays}
	 * @static
	 */
	delays
};

export default cgn;
