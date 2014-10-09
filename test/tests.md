tests
=====

The following test assumes that theres is a scope element with the name ```rb-test``` (that means it has an HTML attribute ```rb-scope="rb-test"```).

First I'm going to prepare the fixtures for each directive to test. These are observable sequences with just one value:

    rbTextFixture = Rx.Observable.return('test0815')
    rbShowFixture = Rx.Observable.return(true)
    rbHideFixture = Rx.Observable.return(true)
    rbEnableFixture = Rx.Observable.return(true)
    rbDisableFixture = Rx.Observable.return(true)

Now I will bind the observable sequences to the DOM using reab:

    reab('rb-test',
      rbTextFixture: rbTextFixture
      rbShowFixture: rbShowFixture
      rbHideFixture: rbHideFixture
      rbEnableFixture: rbEnableFixture
      rbDisableFixture: rbDisableFixture
    )

I can now start asserting that the directives will manipulate the DOM as expected. I will do this by directive.

## ```rb-text```

I will assert that the ```rb-text``` binding writes the text ```'test0815'``` as the text node of an element:

    QUnit.test("rb-text should write sequence value as text node", (assert) -> assert.equal($('[rb-scope="rb-test"] [rb-text="rbTextFixture"]').text(), 'test0815'))

## ```rb-show```

I will assert that the ```rb-show``` binding makes an element visible:

    QUnit.test("rb-show should make element visible", (assert) -> assert.ok($('[rb-scope="rb-test"] [rb-show="rbShowFixture"]').is(':visible')))

## ```rb-hide```

I will assert that the ```rb-hide``` binding hides an element:

    QUnit.test("rb-hide should hide element", (assert) -> assert.ok($('[rb-scope="rb-test"] [rb-hide="rbHideFixture"]').is(':hidden')))

## ```rb-enable```

I will assert that the ```rb-enable``` binding enables an element:

    QUnit.test("rb-enable should enable element", (assert) -> assert.ok($('[rb-scope="rb-test"] [rb-enable="rbEnableFixture"]').is(':enabled')))

## ```rb-disable```

I will assert that the ```rb-disable``` binding disables an element:

    QUnit.test("rb-disable should disable element", (assert) -> assert.ok($('[rb-scope="rb-test"] [rb-disable="rbDisableFixture"]').is(':disabled')))