import { module, test } from 'qunit';
import { setupTest } from 'docs/tests/helpers';

module('Unit | Controller | test-stack-top', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:test-stack-top');
    assert.ok(controller);
  });
});
