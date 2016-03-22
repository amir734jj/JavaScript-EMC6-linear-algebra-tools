/**
 * Created by Hesamian on 3/20/2016.
 */

"use strict";

// performs Gram Schmidt orthogonalization on nXn vectors (or array of arrays)
//var gs1 = new gram_schmidt([
//    [2, 0],
//    [4, 1]
//], false);
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

        this.calculate_orthogonal(matrix);
    }

    calculate_orthogonal() {
        for (var i = 1; i < this.dimensions; i++) {
            var temp_vector = this.matrix[i]; // v2
            for (var j = i - 1; j >= 0; j--) {
                var dot_product1 = this.dot_product(temp_vector, this.matrix[j]);
                var dot_product2 = this.dot_product(this.matrix[j], this.matrix[j]);
                var dot_product = dot_product1 / dot_product2;
                var to_subtract = this.multiply(dot_product, this.matrix[j]);
                this.matrix[i] = this.subtract(temp_vector, to_subtract);
            }
            if (this.normalize) {
                var normal = this.norm(temp_vector);
                this.matrix[i] = this.multiply(1 / normal, temp_vector);
            }
        }

        return this.get_matrix();
    }

    get_matrix() {
        return this.matrix;
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

    norm(vector) {
        return Math.sqrt(this.dot_product(vector, vector));
    }

}

/*
var gs1 = new gram_schmidt([
    [2, 0],
    [4, 1]
], false);

var gs2 = new gram_schmidt([
    [2, 2],
    [4, 1]
], true);

console.log(gs1.get_matrix());
console.log(gs2.get_matrix());
*/

module.exports = gram_schmidt;
