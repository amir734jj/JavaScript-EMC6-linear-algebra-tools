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

	// checks if two set of vectors are equal
	static check_vectors_equality(matrixA, matrixB, n) {
		for (var i = 0; i < n; i++) {
			if (matrixA.indexOf(matrixB[i]) < 0) {
				return false;
			}
		}
		return true;
	}

	// transpose of matrix
	static transpose(Matrix, n) {
		var deep_clone_matrix = JSON.parse(JSON.stringify(Matrix));
		for (var i = 0; i < n; i++) {
			for (var j = 0; j < i; j++) {
				//swap element[i,j] and element[j,i]
				var temp = deep_clone_matrix[i][j];
				deep_clone_matrix[i][j] = deep_clone_matrix[j][i];
				deep_clone_matrix[j][i] = temp;
			}
		}

		return deep_clone_matrix;
	}

	// calculates determinant of matrix
	static calculate_determinant(Matrix, n) {
		var s;
		var det = 0;
		if (Matrix.length == 1) { //bottom case of the recursive function
			return Matrix[0][0];
		}
		if (Matrix.length == 2) {
			det = Matrix[0][0] * Matrix[1][1] - Matrix[1][0] * Matrix[0][1];
			return det;
		}
		for (var i = 0; i < n; i++) {
			//creates smaller matrix- values not in same row, column
			var smaller = new Array(Matrix.length - 1);
			for (var h = 0; h < smaller.length; h++) {
				smaller[h] = new Array(Matrix.length - 1);
			}
			for (var a = 1; a < Matrix.length; a++) {
				for (var b = 0; b < Matrix.length; b++) {
					if (b < i) {
						smaller[a - 1][b] = Matrix[a][b];
					} else if (b > i) {
						smaller[a - 1][b - 1] = Matrix[a][b];
					}
				}
			}
			if (i % 2 == 0) {
				s = 1;
			} else {
				s = -1;
			}
			det += s * Matrix[0][i] * (this.calculate_determinant(smaller));
		}
		return (det);
	}

	// calculates orthogonality defect of matrix (if it is close to 1, then basis are almost orthogonal)
	static calculate_orthogonality_defect(Matrix, n) {
		var temp_value = 1;
		for (var i = 0; i < n; i++) {
			temp_value *= this.norm(Matrix[i], n);
		}

		return Math.abs(temp_value / this.calculate_determinant(Matrix, n));
	}
}

module.exports = tools;
