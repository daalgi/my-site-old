/**
 * Sum of the elements of an array
 * @param {Array} arr - array filled with numeric values
 * @returns {Number}
 */
const sum = arr => {
    if (!Array.isArray(arr)) throw Error("The input must be an array")

    return arr.reduce((acc, value) => !isNaN(value) ? acc + value : acc, 0)
}

class Vector {
    constructor(...components) {
        if (!components.every(elem => Number.isFinite(elem)))
            throw new Error("All the components in the vector should be numbers.")
        this.components = components;
    }

    toArray() {
        return [...this.components];
    }


    transform(matrix) {
        if (!matrix.rows.every((column, i, columns) => column.length === columns[0].length)) {
            throw new Error("Matrix columns length should be equal to vector components length.");
        }
        return new Vector(...matrix.rows.map((row, i) => row.reduce((acc, col, j) => acc + col * this.components[j], 0)));
    }
}

class Matrix {
    constructor(...rows) {
        if (!rows.every(col => col.length === rows[0].length))
            throw new Error("All the rows should have the same number of columns.");
        if (!rows.every(col => col.every(elem => Number.isFinite(elem))))
            throw new Error("All the elements in the matrix should be numbers.")

        this.rows_number = rows.length;
        this.columns_number = rows[0].length;
        this.rows = rows;
    }

    // Identity matrix
    static eye(n) {
        return new Matrix(...new Array(n).fill(0).map((row, i) =>
            new Array(n).fill(0).map((col, j) =>
                i === j ? 1 : 0)));
    }

    // Copy of the rows
    toArray() {
        return this.rows.map(r => r.map(c => c));
    }

    columns() {
        return this.rows[0].map((_, i) => this.rows.map(r => r[i]));
    }

    multiply(other) {
        if (this.columns_number !== other.rows_number)
            throw new Error("The number of columns of the first matrix should be equal to the number of rows of the second.");

        let result = [];
        for (let i = 0; i < this.rows_number; i++) {
            result[i] = [];
            for (let j = 0; j < other.columns_number; j++) {
                result[i][j] = 0;
                for (let k = 0; k < other.rows_number; k++) {
                    result[i][j] += this.rows[i][k] * other.rows[k][j];
                }
            }
        }
        return new Matrix(...result);
    }

    transpose() {
        return new Matrix(...this.columns());
    }

    // Inverse matrix using the Gaussian elimination method
    inverse() {
        if (this.rows_number !== this.columns_number)
            throw new Error("The number of rows is not equal to the number of columns. The inverse can't be computed.")

        let I = Matrix.eye(this.rows_number).toArray();
        let C = this.toArray();
        var i = 0, ii = 0, j = 0, dim = this.rows_number, e = 0, t = 0;
        // Perform elementary row operations
        for (i = 0; i < dim; i += 1) {
            // get the element e on the diagonal
            e = C[i][i];

            // if we have a 0 on the diagonal (we'll need to swap with a lower row)
            if (e == 0) {
                //look through every row below the i'th row
                for (ii = i + 1; ii < dim; ii += 1) {
                    //if the ii'th row has a non-0 in the i'th col
                    if (C[ii][i] != 0) {
                        //it would make the diagonal have a non-0 so swap it
                        for (j = 0; j < dim; j++) {
                            e = C[i][j];       //temp store i'th row
                            C[i][j] = C[ii][j];//replace i'th row by ii'th
                            C[ii][j] = e;      //repace ii'th by temp
                            e = I[i][j];       //temp store i'th row
                            I[i][j] = I[ii][j];//replace i'th row by ii'th
                            I[ii][j] = e;      //repace ii'th by temp
                        }
                        //don't bother checking other rows since we've swapped
                        break;
                    }
                }
                //get the new diagonal
                e = C[i][i];
                //if it's still 0, not invertable (error)
                if (e == 0) { return }
            }

            // Scale this row down by e (so we have a 1 on the diagonal)
            for (j = 0; j < dim; j++) {
                C[i][j] = C[i][j] / e; //apply to original matrix
                I[i][j] = I[i][j] / e; //apply to identity
            }

            // Subtract this row (scaled appropriately for each row) from ALL of
            // the other rows so that there will be 0's in this column in the
            // rows above and below this one
            for (ii = 0; ii < dim; ii++) {
                // Only apply to other rows (we want a 1 on the diagonal)
                if (ii == i) { continue; }

                // We want to change this element to 0
                e = C[ii][i];

                // Subtract (the row above(or below) scaled by e) from (the
                // current row) but start at the i'th column and assume all the
                // stuff left of diagonal is 0 (which it should be if we made this
                // algorithm correctly)
                for (j = 0; j < dim; j++) {
                    C[ii][j] -= e * C[i][j]; //apply to original matrix
                    I[ii][j] -= e * I[i][j]; //apply to identity
                }
            }
        }

        //we've done all operations, C should be the identity
        //matrix I should be the inverse:
        return new Matrix(...I);

    }

}


/* -------------------------------------------
    Metrics to evaluate a regression model
 --------------------------------------------- */
const metrics = ({ x, y, func, coefs }) => {
    return {
        meanAbsoluteError: meanAbsoluteError({ x, y, func }),
        meanSquaredError: meanSquaredError({ x, y, func }),
        rootMeanSquaredError: rootMeanSquaredError({ x, y, func }),
        meanAbsolutePercentageError: meanAbsolutePercentageError({ x, y, func }),
        r2score: r2score({ x, y, func }),
        r2scoreAdjusted: r2scoreAdjusted({ x, y, func, coefs }),
    };
}

const meanAbsoluteError = ({ x, y, func }) => {
    return sum(y.map((y, i) => Math.abs(y - func(x[i])))) / x.length;
}
const meanSquaredError = ({ x, y, func }) => {
    return sum(y.map((y, i) => Math.pow(y - func(x[i]), 2))) / x.length;
}
const rootMeanSquaredError = ({ x, y, func }) => {
    return Math.sqrt(meanSquaredError({ x, y, func }));
}
const meanAbsolutePercentageError = ({ x, y, func }) => {
    return 100 / x.length * sum(y.map((y, i) => Math.abs((y - func(x[i]) / y))));
}
const totalSumSquares = ({ x, y, func }) => {
    let yMean = sum(y) / y.length;
    return sum(y.map(y => Math.pow(y - yMean, 2)));
}
const residualSumSquares = ({ x, y, func }) => {
    return sum(y.map((y, i) => Math.pow(y - func(x[i]), 2)));
}
const r2score = ({ x, y, func }) => {
    return 1 - residualSumSquares({ x, y, func }) / totalSumSquares({ x, y, func });
}
const r2scoreAdjusted = ({ x, y, func, coefs }) => {
    let r2 = r2score({ x, y, func });
    let n = x.length;
    let num_coefs = coefs.length;
    return 1 - (1 - r2) * ((n - 1) / (n - (num_coefs + 1)));
}

/* -------------------------------------------
    Regression models
 --------------------------------------------- */
// y = x0 + x1 * x + x2 * x^2 + x3 * x^3 + ... + xn * x^n
const polynomial = ({ x, y, order = 2, coefDecimals = 4 }) => {
    //console.log(x, y)
    if (!Array.isArray(x) || !Array.isArray(y))
        throw new Error("x and y should be arrays");
    if (x.length !== y.length)
        throw new Error("the length of the arrays x and y should be the same");

    // Solution of the linear system of equations
    const matA = new Matrix(...new Array(x.length)
        .fill()
        .map((_, i) =>
            new Array(order + 1).fill().map((_, j) => x[i] ** (order - j)))
    );
    const mat_AtA_inv = matA.transpose().multiply(matA).inverse();
    let yVector = new Vector(...y);
    const vec_Aty = yVector.transform(matA.transpose());
    const coefs = vec_Aty.transform(mat_AtA_inv).toArray();

    // Predict function
    const predict = (x) => {
        return sum(coefs.map((coef, i) => coef * Math.pow(x, coefs.length - i - 1)));
    };

    // Equation (string)
    let equation = { withParameters: 'y = ', withCoefficients: 'y = ' }
    for (let i = 0; i < order + 1; i++) {
        if (i === 0) {
            equation.withParameters += 'a0 '
            equation.withCoefficients += `${coefs[order - i].toFixed(coefDecimals)} `
        } else {
            equation.withParameters += [
                `+ a${i} * `,
                i < 2
                    ? 'x '
                    : `x^${i} `
            ].join('')
            equation.withCoefficients += [
                coefs[order- i] < 0
                    ? `- ${-coefs[order - i].toFixed(coefDecimals)} `
                    : `+ ${coefs[order - i].toFixed(coefDecimals)} `,
                (i < 2) ? ' x ' : `x^${i} `
            ].join('')
        }
    }
    //return {coefs, predict, r2};
    return { coefs, predict, metrics: metrics({ x, y, func: predict, coefs }), equation };
}

const RegressionFactory = {
    linear: (x, y) => polynomial({ x, y, order: 1 }),
    quadratic: (x, y) => polynomial({ x, y, order: 2 }),
    cubic: (x, y) => polynomial({ x, y, order: 3 }),
    quartic: (x, y) => polynomial({ x, y, order: 4 }),
}

const REGRESSION_TYPES = ["linear", "quadratic", "cubic"]

const regression = ({ type, data }) => {
    if (!REGRESSION_TYPES.includes(type.toLowerCase()))
        type = "linear"
    let x = data.map(r => parseFloat(r.x)).filter(v => !isNaN(v) && ![null, undefined].includes(v))
    let y = data.map(r => parseFloat(r.y)).filter(v => !isNaN(v) && ![null, undefined].includes(v))
    //console.log(data.length, x.length, y.length)
    if (data.length < 2 || x.length !== y.length)
        return null
    return RegressionFactory[type](x, y)
}

export {
    polynomial, regression,
}