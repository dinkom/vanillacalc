/**
 * VanilaCalc calculator
 *
 * https://github.com/dinkom/vanillacalc
 *
 * User: Dinko Mihovilovic <dinko.mih@gmail.com>
 */

"use strict";

var Calculator = function() {
	var self = this;
	this.operations = {
		add : '+',
		subtract : '-' ,
		divide : '/',
		multiply : '*',
		exponentiate : '^'
	};
	this.ops_order = [
		[ [this.operations.multiply], [this.operations.divide], [this.operations.exponentiate] ],
		[ [this.operations.add], [this.operations.subtract] ]
	];
	this.special_cases = {
		equals: '=',
		clear_all: 'C',
		clear_last: '<-'
	};

	this.handleInput = function(i) {
		switch (i) {
			case this.special_cases.equals:
				var screen = document.getElementById(defaults.calculator_screen);
				var expression = screen.value;
				screen.value = this.calculate();
				if (screen.value !== '')
					document.getElementById(defaults.history_text).innerHTML += expression + ' = ' + screen.value + '<br />' ;
				break;
			case this.special_cases.clear_all:
				this.clearScreen();
				break;
			case this.special_cases.clear_last:
				this.clearLastCharacter();
				break;
			default:
				this.addToScreen(i);
		}
	};

	this.calculate = function() {
		var expression = document.getElementById(defaults.calculator_screen).value;

		expression = expression.replace(/[^0-9%^*\/()\-+.]/g,'');

		var result;
		for (var i = 0, n = this.ops_order.length; i <n; i++ ){
			// Regular Expression to look for operators between floating numbers or integers
			var re = new RegExp('(\\d+\\.?\\d*)([\\' + this.ops_order[i].join('\\')+'])(\\d+\\.?\\d*)');
			re.lastIndex = 0; // be cautious and reset re start pos

			while (re.test(expression)){
			 	result = this._calculate(RegExp.$1, RegExp.$2, RegExp.$3);
			 	if (isNaN(result) || !isFinite(result))
			 		return '';
			 	expression  = expression.replace(re, result);
			}
	   	}
		return result || '';
	};

	this._calculate = function(a, op, b) {
		a = a * 1; b = b * 1;
      	switch (op) {
			case this.operations.add:
				return a + b;
				break;
			case this.operations.subtract:
				return a - b;
				break;
			case this.operations.divide:
				return a / b;
				break;
			case this.operations.multiply:
				return a * b;
				break;
			case this.operations.exponentiate:
				return Math.pow(a,b);
				break;
			default: null;
      	}
	};

	this.clearLastCharacter = function() {
		var current_value = document.getElementById(defaults.calculator_screen).value;
		current_value = current_value.substring(0, current_value.length - 1);
		document.getElementById(defaults.calculator_screen).value = current_value;
	};

	this.clearScreen = function() {
		document.getElementById(defaults.calculator_screen).value = '';
	};

	this.addToScreen = function(i) {
		var current_input = document.getElementById(defaults.calculator_screen).value;
		document.getElementById(defaults.calculator_screen).value = current_input + i;
	};

	this.clearHistory = function() {
		document.getElementById(defaults.history_text).innerHTML = '';
	};

	this.bindEvents = function() {
		var actions = document.getElementsByClassName(defaults.action_buttons);
		for (var i = 0; i < actions.length; ++i) {
			if (actions[i].addEventListener) {
				actions[i].addEventListener('click', function(el) {
					self.handleInput(el.currentTarget.innerText);
				});
			}
			else {
				actions[i].attachEvent('onclick', function(el) {
					self.handleInput(el.srcElement.innerText);
				});
			}
		}

		var clear_history = document.getElementById(defaults.clear_history);
		if (clear_history.addEventListener) {
			clear_history.addEventListener('click', function() {
				self.clearHistory();
			});
		}
		else {
			clear_history.attachEvent('onclick', function() {
				self.clearHistory();
			});
		}

	};

	this.bindEvents();
};

var defaults = {
	calculator_screen: 'calc-screen',
	history_text: 'history-text',
	clear_history: 'clear-history',
	action_buttons: 'action'
};
