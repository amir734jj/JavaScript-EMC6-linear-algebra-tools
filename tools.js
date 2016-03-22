"use strict";


// utility functions
class tools {
	// subtract two vectors (or arrays)
	static subtract(vectorX, vectorY, n) {
		var result = new Array(n);
		for (var i = 0; i < n; i++) {
			result[i] = vectorX[i] - vectorY[i];
		}
		return result;
	}

	// multiply two vectors (or arrays)
	static multiply(scalarC, vectorX, n) {
		var result = new Array(n);
		for (var i = 0; i < n; i++) {
			result[i] = scalarC * vectorX[i];
		}
		return result;
	}

	// dot product of two vectors (or arrays)
	static dot_product(vectorX, vectorY, n) {
		var sum = 0;
		for (var i = 0; i < n; i++) {
			sum += vectorX[i] * vectorY[i];
		}
		return sum;
	}

	// find normal of a vector (or array)
	static norm(vector, n) {
		return Math.sqrt(this.dot_product(vector, vector, n));
	}

}

module.exports = tools;
