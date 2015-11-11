/**
 * VanillaCalc site setup & helpers
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
	this.fixOldBrowserCompatibility = function() {
		if(!document.getElementsByClassName) {
		    document.getElementsByClassName = function(className) {
		        return this.querySelectorAll("." + className);
		    };
		    Element.prototype.getElementsByClassName = document.getElementsByClassName;
		}
	};
};