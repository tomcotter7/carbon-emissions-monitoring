const colors = [
    "#E8ECFB", "#D9CCE3", "#D1BBD7", "#CAACCB", "#BA8DB4", "#AE76A3", "#AA6F9E", "#994F88",
    "#882E72", "#1965B0", "#437DBF", "#5289C7", "#6195CF", "#7BAFDE", "#4EB265", "#90C987",
    "#CAE0AB", "#F7F056", "#F7CB45", "#F6C141", "#F4A736", "#F1932D", "#EE8026", "#E8601C",
    "#E65518", "#DC050C", "#A5170E", "#72190E", "#42150A"
]

const orders = {
    1: [10],
    2: [10, 26],
    3: [10, 18, 26],
    4: [10, 15, 18, 26],
    5: [10, 14, 15, 18, 26],
    6: [10, 14, 15, 17, 18, 26],
    7: [9, 10, 14, 15, 17, 18, 26],
    8: [9, 10, 14, 15, 17, 18, 23, 26],
    9: [9, 10, 14, 15, 17, 18, 23, 26, 28],
    10: [9, 10, 14, 15, 17, 18, 21, 24, 26, 28],
    11: [9, 10, 12, 14, 15, 17, 18, 21, 24, 26, 28],
    12: [3, 6, 9, 10, 12, 14, 15, 17, 18, 21, 24, 26],
    13: [3, 6, 9, 10, 12, 14, 15, 16, 17, 18, 21, 24, 26],
    14: [3, 6, 9, 10, 12, 14, 15, 16, 17, 18, 20, 22, 24, 26],
    15: [3, 6, 9, 10, 12, 14, 15, 16, 17, 18, 20, 22, 24, 26, 28],
    16: [3, 5, 7, 8, 9, 10, 12, 14, 15, 16, 17, 18, 22, 24, 26, 28],
    17: [3, 5, 7, 8, 9, 10, 12, 14, 15, 16, 17, 18, 20, 22, 24, 26, 28],
    18: [3, 5, 7, 8, 9, 10, 12, 14, 15, 16, 17, 18, 20, 22, 24, 26, 27, 28],
    19: [2, 4, 5, 7, 8, 9, 10, 12, 14, 15, 16, 17, 18, 20, 22, 24, 26, 27, 28],
    20: [2, 4, 5, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 20, 22, 24, 26, 27, 28],
    21: [2, 4, 5, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 21, 23, 25, 26, 27, 28],
    22: [2, 4, 5, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 21, 23, 25, 26, 27, 28, 29],
    23: [1, 2, 4, 5, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 21, 23, 25, 26, 27, 28, 29]
}

/**
 * Author: Thomas Cotter
 * About: function that works out the colours you should use for a dataset of size n
 * @param {any} n - the size of the dataset
 */

export function calculateColors (n) {

    var order = orders[n];
    let colorArray = [];

    for (var i in order) {
        colorArray.push(colors[order[i]]);
    }

    return colorArray;
}

