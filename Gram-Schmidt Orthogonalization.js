/**
 * Created by Hesamian on 3/20/2016.
 */

"use strict";

var tools = require("./tools.js");

// performs Gram Schmidt orthogonalization on nXn vectors (or array of arrays)
// var gs1 = new gram_schmidt([
//    [2, 0],
//    [4, 1]
// ], false);
//      ^
// normalize flag. true => normalize, false => do not normalize

class gram_schmidt {
	constructor(matrix, normalize) {
		if (normalize) {
			this.normalize = normalize;
		} else {
			this.normalize = false
		}

		var size_temporarily = matrix[0].length;
		for (var index = 0; index < matrix.length; index++) {
			if (size_temporarily !== matrix[index].length) {
				throw "invalid matrix dimensions";
			}
		}

		this.matrix = matrix;
		this.dimensions = size_temporarily;

		return this.calculate_orthogonal(matrix);
	}

	calculate_orthogonal() {
		for (var i = 0; i < this.dimensions; i++) {
			var temp_vector = this.matrix[i]; // starting from second vector
			for (var j = 0; j < i; j++) {
				var dot_product = tools.dot_product(temp_vector, this.matrix[j], this.dimensions);
				var to_subtract = tools.multiply(dot_product, this.matrix[j], this.dimensions);
				temp_vector = tools.subtract(temp_vector, to_subtract, this.dimensions);
			}
			if (this.normalize) {
				var normal = tools.norm(temp_vector, this.dimensions);
				this.matrix[i] = tools.multiply(1 / normal, temp_vector, this.dimensions);
			}
		}

		this.validate_result();
		return this.get_matrix();
	}

	get_matrix() {
		return this.matrix;
	}

	// after Gram Schmidt orthogonalization, any two vectors are orthogonalization, then their dot product should be zero
	validate_result() {
		// special case for LLL
		if (!this.normalize) {
			return true;
		}
		// otherwise:
		for (var i = 0; i < this.dimensions - 1; i++) {
			// small rounding error is acceptable (epsilon)
			var temp_should_be_zero = Math.abs(tools.dot_product(this.matrix[i], this.matrix[i + 1], this.dimensions));
			if (temp_should_be_zero > Math.pow(Math.E, -14)) {
				console.log("invalid orthogonalization result: " + temp_should_be_zero);
				return false;
			}
		}
		return true;
	}
}


// var gs1 = new gram_schmidt([
//  [2, 0],
//  [4, 1]
// ], false);
//
// var gs2 = new gram_schmidt([
//  [4, 5],
//  [6, 3]
// ], true);
// console.log(gs1.get_matrix());
// console.log(gs2.get_matrix());


module.exports = gram_schmidt;
