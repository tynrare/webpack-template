/** @format */

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
});
