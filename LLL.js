/**
 * Created by Hesamian on 3/20/2016.
 */

"use strict";

var gs = require("./Gram-Schmidt Orthogonalization.js");

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
        this.matrix_after = new gs(this.matrix_before, false).matrix;   // initialize after vectors: perform Gram-Schmidt, but do not normalize
        var flag = false;   // invariant
        var k = 1;
        do {
            for (var j = k - 1; j >= 0; j--) {
                if (Math.abs(this.mu(k, j)) > 0.5) {
                    var to_subtract = this.multiply(Math.round(this.mu(k, j)), this.matrix_before[j]);
                    this.matrix_before[k] = this.subtract(this.matrix_before[k], to_subtract);

                    this.matrix_after = new gs(this.matrix_before, false).matrix;   // update after vectors: perform Gram-Schmidt, but do not normalize
                }
            }

            if (this.dot_product(this.matrix_after[k], this.matrix_after[k]) >= (this.delta -  Math.pow(this.mu(k, k - 1), 2)) * this.dot_product(this.matrix_after[k - 1], this.matrix_after[k - 1])) {
                if (k + 1 >= this.dimensions) { // invariant: there is some issue, something is wrong
                    flag = true;    // invariant is broken
                    console.log("something bad happened ! (1)");
                }
                
                k++;
                console.log("if; k, j");
                console.log(k + ", " + j);
            } else {
                var temp_matrix = this.matrix_before[k];
                this.matrix_before[k] = this.matrix_before[k - 1];
                this.matrix_before[k - 1] = temp_matrix;

                this.matrix_after = new gs(this.matrix_before, false).matrix;   // update after vectors: perform Gram-Schmidt, but do not normalize

                if (k === Math.max(k - 1, 1) || k >= this.dimensions || Math.max(k - 1, 1) >= this.dimensions) { // invariant: there is some issue, something is wrong
                    flag = true;    // invariant is broken
                    console.log("something bad happened ! (2)");
                }
                k = Math.max(k - 1, 1);

                console.log("else; k, j");
                console.log(k + ", " + j);
            }
        }
        while (k <= this.dimensions && !flag);  // I added this flag variable to prevent getting exceptions and terminate the loop gracefully

        console.log("final: ");
        console.log(this.matrix_before);
    }

    // calculated mu as been  mentioned on Wikipedia
    // mu(i, j) = <b_i, b*_j> / <b*_j, b*_j>
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
        [2, 0],
        [4, 1]
    ], 3 / 4);
