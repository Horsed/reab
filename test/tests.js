(function() {
  QUnit.test("", function(assert) {
    $('.bla').text('foo');
    return assert.ok($('.bla').text() === 'foo', "Passed!");
  });

}).call(this);
