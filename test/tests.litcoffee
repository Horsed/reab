    QUnit.test("", (assert) ->
      $('.bla').text('foo')
      assert.ok($('.bla').text() == 'foo', "Passed!")
    )