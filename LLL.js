/**
 * Created by Hesamian on 3/20/2016.
 */

"use strict";

var gs = require("./Gram-Schmidt Orthogonalization.js");

class LLL {
	constructor(matrix, delta) {
		if (delta < 0.24 || delta > 1) {
			throw "delta is out of range";
		}

		this.matrix_before = matrix;
		this.matrix_after = null;
		this.delta = delta;
		this.dimensions = matrix[0].length;
		this.calculate_LLL();
	}

	calculate_LLL() {
		this.matrix_after = new gs(this.matrix_before, false).matrix;
		var flag = false;
		//console.log(this.matrix_after);
		var k = 1;
		do {
			for (var j = k - 1; j >= 0; j--) {
				console.log("before");
				console.log(k + " " + j);

				if (this.mu(k, j) > 0.5) {
					var to_subtract = this.multiply(Math.round(this.mu(k, j)), this.matrix_before[j]);
					this.matrix_before[k] = this.subtract(this.matrix_before[k], to_subtract);

					this.matrix_after = new gs(this.matrix_before, false).matrix;
				}
			}

			if (this.dot_product(this.matrix_after[k], this.matrix_after[k]) > ((this.delta - (this.mu(k, k - 1) * this.mu(k, k - 1))) * (this.dot_product(this.matrix_after[k - 1], this.matrix_after[k - 1])))) {
				if (k + 1 >= this.dimensions) { // invariant: there is some issue, something is wrong
					flag = true;
				}
				k++;
				console.log("if");
				console.log(k + " " + j);
			} else {
				var temp_matrix = this.matrix_after[k];
				this.matrix_after[k] = this.matrix_after[k - 1];
				this.matrix_after[k - 1] = temp_matrix;

				this.matrix_after = new gs(this.matrix_before, false).matrix;

				if (k === Math.max(k - 1, 1) || k >= this.dimensions || Math.max(k - 1, 1) >= this.dimensions) { // invariant: there is some issue, something is wrong
					flag = true;
				}
				k = Math.max(k - 1, 1);


				console.log("else");
				console.log(k + " " + j);
			}
		}
		while (k <= this.dimensions && !flag);

		console.log("final: " + this.matrix_after);
	}

	mu(i, j) {

		var top = this.dot_product(this.matrix_before[i], this.matrix_after[j]);
		var bottom = this.dot_product(this.matrix_after[j], this.matrix_after[j]);

		return top / bottom;
	}


	subtract(vectorX, vectorY) {
		var result = new Array(this.dimensions);
		for (var i = 0; i < this.dimensions; i++) {
			result[i] = vectorX[i] - vectorY[i];
		}
		return result;
	}

	multiply(scalarC, vectorX) {
		var result = new Array(this.dimensions);
		for (var i = 0; i < this.dimensions; i++) {
			result[i] = scalarC * vectorX[i];
		}
		return result;
	}

	dot_product(vectorX, vectorY) {
		var sum = 0;
		for (var i = 0; i < this.dimensions; i++) {
			sum += vectorX[i] * vectorY[i];
		}
		return sum;
	}
}


/*
	The following will run the LLL function
*/
var lll = new LLL(
	[
		[1, 0, 2],
		[1, 2, 3],
		[4, 5, 6]
	], 3 / 4);
