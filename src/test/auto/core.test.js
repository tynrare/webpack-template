/* eslint-disable max-lines-per-function */

const assert = require('assert');

describe('Core tests', () => {
	describe('Events', () => {
		beforeEach(() => {
			cgn.events.init();
		});
		it('on/emit', (done) => {
			cgn.events.on('test', done);
			cgn.events.emit('test');
		});
		it('once/emit', (done) => {
			cgn.events.once('test', done);
			cgn.events.emit('test');
			//if it triggers twice, we'll get error
			cgn.events.emit('test');
		});
		it('group', (done) => {
			cgn.events.on('test', done, null, 'test_group');
			cgn.events.emit('test');
			//if it triggers twice, we'll get error
			cgn.events.discard('test_group');
			cgn.events.emit('test');
		});
		it('context', (done) => {
			const context = {
				done() {
					assert.equal(this, context);
					done();
				}
			};
			cgn.events.on('test', context.done, context);
			cgn.events.emit('test');
		});
	});
	describe('Delays', () => {
		it('update', (done) => {
			cgn.delays.update(done);
			//in test we have not main loop, trigger manual
			cgn.events.emit('update');
		});
		it('immediate', (done) => {
			cgn.delays.immediate(done);
		});
		it('inteval', (done) => {
			const id = cgn.delays.inteval(() => {
				cgn.delays.clearInterval(id);
				done();
			}, 1);
		});
		it('timeout', (done) => {
			cgn.delays.timeout(done);
		});
	});
	describe('Logger (check console)', () => {
		before(() => {
			cgn.log.groups.test1 = 2;
			cgn.log.groups.test2 = 5;
		});
		it('simple log', () => {
			cgn.log.log('simple log');
		});
		it('warn log', () => {
			cgn.log.warn('warn log');
		});
		it('error log', () => {
			cgn.log.error('error log');
		});
		it('group log', () => {
			cgn.log.loggingLevel = 2;
			cgn.log.group('test1', 'this log should display');
			cgn.log.group.log('test1', 'this log should display too');
			cgn.log.group('test2', 'this log should not display');
		});
		it('group warn', () => {
			cgn.log.loggingLevel = 2;
			cgn.log.group.warn('test1', 'this warn should display');
			cgn.log.group.warn('test2', 'this warn should not display');
		});
		it('group error', () => {
			cgn.log.loggingLevel = 2;
			cgn.log.group.error('test1', 'this error should display');
			cgn.log.group.error('test2', 'this error should not display');
		});
	});
});
