/**
 * CalcEyeo calculator site setup & helpers
 *
 * https://github.com/dinkom/vanillacalc
 *
 * User: Dinko Mihovilovic <dinko.mih@gmail.com>
 */

"use strict";

var Site = function() {
	this.date = new Date();
	this.setYear = function() {
		document.getElementById('year').innerText = this.date.getFullYear();
	};
};