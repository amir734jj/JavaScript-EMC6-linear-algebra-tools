/**
 * Created by Hesamian on 3/20/2016.
 */

"use strict";

var gs = require("./Gram-Schmidt Orthogonalization.js");
var tools = require("./tools.js");

class LLL {
    constructor(matrix, delta) {
        if (delta < 0.25 || delta > 1) {
            throw "delta is out of range";
        }

        this.matrix_before = matrix;
        this.matrix_after = null;
        this.delta = delta;
        this.dimensions = matrix[0].length;
        this.calculate_LLL();
    }

    // ** important
    //  {b} set of vectors are denoted by this.matrix_before
    //  {b*} set of vectors are denoted by this.matrix_after
    calculate_LLL() {
        this.matrix_after = new gs(this.matrix_before, false).matrix; // initialize after vectors: perform Gram-Schmidt, but do not normalize
        var flag = false; // invariant
        var k = 1;

        while (k < this.dimensions && !flag) { // I added this "flag" variable to prevent getting exceptions and terminate the loop gracefully
            for (var j = k - 1; j >= 0; j--) {
                if (Math.abs(this.mu(k, j)) > 0.5) {
                    var to_subtract = tools.multiply(Math.round(this.mu(k, j)), this.matrix_before[j], this.dimensions);
                    this.matrix_before[k] = tools.subtract(this.matrix_before[k], to_subtract, this.dimensions);

                    this.matrix_after = new gs(this.matrix_before, false).matrix; // update after vectors: perform Gram-Schmidt, but do not normalize
                }
            }

            if (tools.dot_product(this.matrix_after[k], this.matrix_after[k], this.dimensions) >= (this.delta - Math.pow(this.mu(k, k - 1), 2)) * tools.dot_product(this.matrix_after[k - 1], this.matrix_after[k - 1], this.dimensions)) {
                if (k + 1 > this.dimensions) { // invariant: there is some issue, something is wrong
                    //flag = true; // invariant is broken
                    console.log("something bad happened ! (1)");
                }

                k++;
                // console.log("if; k, j");
                // console.log(k + ", " + j);
            } else {
                var temp_matrix = this.matrix_before[k];
                this.matrix_before[k] = this.matrix_before[k - 1];
                this.matrix_before[k - 1] = temp_matrix;

                this.matrix_after = new gs(this.matrix_before, false).matrix; // update after vectors: perform Gram-Schmidt, but do not normalize

                if (k > this.dimensions || Math.max(k - 1, 1) > this.dimensions) { // invariant: there is some issue, something is wrong
                    //flag = true; // invariant is broken
                    console.log("something bad happened ! (2)");
                }
                k = Math.max(k - 1, 1);

                // console.log("else; k, j");
                // console.log(k + ", " + j);
            }

        }

        console.log("final: ");
        console.log(this.matrix_before);
    }

    // calculated mu as been  mentioned on Wikipedia
    // mu(i, j) = <b_i, b*_j> / <b*_j, b*_j>
    mu(i, j) {
        var top = tools.dot_product(this.matrix_before[i], this.matrix_after[j], this.dimensions);
        var bottom = tools.dot_product(this.matrix_after[j], this.matrix_after[j], this.dimensions);

        return top / bottom;
    }
}



// The following will run the LLL function
var lll = new LLL(
    [
        [1, 1, 1],
        [-1, 0, 2],
        [3, 5, 6]
    ], 3 / 4);
