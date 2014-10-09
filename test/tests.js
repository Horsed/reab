(function() {
  var rbDisableFixture, rbEnableFixture, rbHideFixture, rbShowFixture, rbTextFixture;

  rbTextFixture = Rx.Observable["return"]('test0815');

  rbShowFixture = Rx.Observable["return"](true);

  rbHideFixture = Rx.Observable["return"](true);

  rbEnableFixture = Rx.Observable["return"](true);

  rbDisableFixture = Rx.Observable["return"](true);

  reab('rb-test', {
    rbTextFixture: rbTextFixture,
    rbShowFixture: rbShowFixture,
    rbHideFixture: rbHideFixture,
    rbEnableFixture: rbEnableFixture,
    rbDisableFixture: rbDisableFixture
  });

  QUnit.test("rb-text should write sequence value as text node", function(assert) {
    return assert.equal($('[rb-scope="rb-test"] [rb-text="rbTextFixture"]').text(), 'test0815');
  });

  QUnit.test("rb-show should make element visible", function(assert) {
    return assert.ok($('[rb-scope="rb-test"] [rb-show="rbShowFixture"]').is(':visible'));
  });

  QUnit.test("rb-hide should hide element", function(assert) {
    return assert.ok($('[rb-scope="rb-test"] [rb-hide="rbHideFixture"]').is(':hidden'));
  });

  QUnit.test("rb-enable should enable element", function(assert) {
    return assert.ok($('[rb-scope="rb-test"] [rb-enable="rbEnableFixture"]').is(':enabled'));
  });

  QUnit.test("rb-disable should disable element", function(assert) {
    return assert.ok($('[rb-scope="rb-test"] [rb-disable="rbDisableFixture"]').is(':disabled'));
  });

}).call(this);
