/**
 * CalcEyeo calculator app
 *
 * https://github.com/dinkom/vanillacalc
 *
 * User: Dinko Mihovilovic <dinko.mih@gmail.com>
 */

"use strict";

var site = new Site();
site.setYear();

var calculator = new Calculator();
calculator.bindEvents();
