const { Before, Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');

Before(function (scenario) {
    this.coffeeMachine = require('../src/coffee_machine.js').CoffeeMachine();
    this.handledTanks = []
});

When(/^I start the coffee machine using language "(.*)"$/, function (lang, callback) {
    this.coffeeMachine.start(lang);
    callback();
});

When(/^I shutdown the coffee machine$/, function (callback) {
    this.coffeeMachine.stop();
    callback();
});

Then(/^message "(.*)" should be displayed$/, function (message, callback) {
    assert.equal(message || "", this.coffeeMachine.get('message'));
    callback();
});

Then(/^coffee should be served$/, function (callback) {
    assert.equal(true, this.coffeeMachine.get('coffeeServed'));
    callback();
});

Then(/^coffee should not be served$/, function (callback) {
    assert.equal(false, this.coffeeMachine.get('coffeeServed'));
    callback();
});

When(/^I take a coffee$/, function (callback) {
    this.coffeeMachine.takeCoffee();
    callback();
});

When(/^I empty the coffee grounds$/, function (callback) {
    this.coffeeMachine.emptyGrounds();
    callback();
});

When(/^I fill the beans tank$/, function (callback) {
    this.coffeeMachine.fillBeans();
    callback();
});

When(/^I fill the water tank$/, function (callback) {
    this.coffeeMachine.fillTank();
    callback();
});

Given(/^I take "(.*)" coffees$/, function (coffee_number, callback) {
    while ((coffee_number > 0)) {
        this.coffeeMachine.takeCoffee();
        coffee_number = coffee_number - 1;

        if (this.handledTanks.indexOf('water') >= 0) {
            this.coffeeMachine.fillTank();
        }

        if (this.handledTanks.indexOf('beans') >= 0) {
            this.coffeeMachine.fillBeans();
        }

        if (this.handledTanks.indexOf('grounds') >= 0) {
            this.coffeeMachine.emptyGrounds();
        }
    }
    callback();
});

Given(/^the coffee machine is started$/, function (callback) {
    this.coffeeMachine.start();
    callback();
});

Given(/^I handle water tank$/, function (callback) {
    this.handledTanks.push('water');
    callback();
});

Given(/^I handle beans$/, function (callback) {
    this.handledTanks.push('beans');
    callback();
});

Given(/^I handle coffee grounds$/, function (callback) {
    this.handledTanks.push('grounds');
    callback();
});

Given(/^I handle everything except the water tank$/, function (callback) {
    this.handledTanks.push('beans');
    this.handledTanks.push('grounds');
    callback();
});

Given(/^I handle everything except the beans$/, function (callback) {
    this.handledTanks.push('water');
    this.handledTanks.push('grounds');
    callback();
});

Given(/^I handle everything except the grounds$/, function (callback) {
    this.handledTanks.push('beans');
    this.handledTanks.push('water');
    callback();
});

Then(/^displayed message is:$/, function (__free_text, callback) {
    assert.equal(__free_text || "", this.coffeeMachine.get('message'));
    callback();
});

When(/^I switch to settings mode$/, function (callback) {
    this.coffeeMachine.showSettings();
    callback();
});

Then(/^settings should be:$/, function (__datatable, callback) {
    const hashSettings = this.coffeeMachine.getSettings();
    const settings = Object.keys(hashSettings).map(key => [key, hashSettings[key]]);

    assert.deepEqual(__datatable.raw(), settings);
    callback();
});
