/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./wwwroot/Scripts/src/colorArray.js":
/*!*******************************************!*\
  !*** ./wwwroot/Scripts/src/colorArray.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"calculateColors\": () => (/* binding */ calculateColors)\n/* harmony export */ });\nconst colors = [\"#E8ECFB\", \"#D9CCE3\", \"#D1BBD7\", \"#CAACCB\", \"#BA8DB4\", \"#AE76A3\", \"#AA6F9E\", \"#994F88\", \"#882E72\", \"#1965B0\", \"#437DBF\", \"#5289C7\", \"#6195CF\", \"#7BAFDE\", \"#4EB265\", \"#90C987\", \"#CAE0AB\", \"#F7F056\", \"#F7CB45\", \"#F6C141\", \"#F4A736\", \"#F1932D\", \"#EE8026\", \"#E8601C\", \"#E65518\", \"#DC050C\", \"#A5170E\", \"#72190E\", \"#42150A\"];\nconst orders = {\n  1: [10],\n  2: [10, 26],\n  3: [10, 18, 26],\n  4: [10, 15, 18, 26],\n  5: [10, 14, 15, 18, 26],\n  6: [10, 14, 15, 17, 18, 26],\n  7: [9, 10, 14, 15, 17, 18, 26],\n  8: [9, 10, 14, 15, 17, 18, 23, 26],\n  9: [9, 10, 14, 15, 17, 18, 23, 26, 28],\n  10: [9, 10, 14, 15, 17, 18, 21, 24, 26, 28],\n  11: [9, 10, 12, 14, 15, 17, 18, 21, 24, 26, 28],\n  12: [3, 6, 9, 10, 12, 14, 15, 17, 18, 21, 24, 26],\n  13: [3, 6, 9, 10, 12, 14, 15, 16, 17, 18, 21, 24, 26],\n  14: [3, 6, 9, 10, 12, 14, 15, 16, 17, 18, 20, 22, 24, 26],\n  15: [3, 6, 9, 10, 12, 14, 15, 16, 17, 18, 20, 22, 24, 26, 28],\n  16: [3, 5, 7, 8, 9, 10, 12, 14, 15, 16, 17, 18, 22, 24, 26, 28],\n  17: [3, 5, 7, 8, 9, 10, 12, 14, 15, 16, 17, 18, 20, 22, 24, 26, 28],\n  18: [3, 5, 7, 8, 9, 10, 12, 14, 15, 16, 17, 18, 20, 22, 24, 26, 27, 28],\n  19: [2, 4, 5, 7, 8, 9, 10, 12, 14, 15, 16, 17, 18, 20, 22, 24, 26, 27, 28],\n  20: [2, 4, 5, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 20, 22, 24, 26, 27, 28],\n  21: [2, 4, 5, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 21, 23, 25, 26, 27, 28],\n  22: [2, 4, 5, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 21, 23, 25, 26, 27, 28, 29],\n  23: [1, 2, 4, 5, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 21, 23, 25, 26, 27, 28, 29]\n};\n/**\r\n * Author: Thomas Cotter\r\n * About: function that works out the colours you should use for a dataset of size n\r\n * @param {any} n - the size of the dataset\r\n */\n\nfunction calculateColors(n) {\n  var order = orders[n];\n  let colorArray = [];\n\n  for (var i in order) {\n    colorArray.push(colors[order[i]]);\n  }\n\n  return colorArray;\n}\n\n//# sourceURL=webpack://mynewapp/./wwwroot/Scripts/src/colorArray.js?");

/***/ }),

/***/ "./wwwroot/Scripts/src/emissions.js":
/*!******************************************!*\
  !*** ./wwwroot/Scripts/src/emissions.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Emissions\": () => (/* binding */ Emissions)\n/* harmony export */ });\n/* harmony import */ var _colorArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./colorArray.js */ \"./wwwroot/Scripts/src/colorArray.js\");\n/* harmony import */ var _linechart_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./linechart.js */ \"./wwwroot/Scripts/src/linechart.js\");\n\n\n/**\r\n * Author: Thomas Cotter\r\n * About: A react component to show the user details about emissions for specific machines*/\n\nclass Emissions extends React.Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n      data: [],\n      lables: []\n    };\n    this.getData = this.getData.bind(this);\n    this.getData();\n  }\n\n  getData() {\n    var currentDate = new Date();\n    currentDate.setDate(currentDate.getDate() - this.props.timeFrame);\n    var numberOfMachines = this.props.tags.length;\n    let newLabels = [];\n    let newData = [];\n    var colors = (0,_colorArray_js__WEBPACK_IMPORTED_MODULE_0__.calculateColors)(numberOfMachines);\n\n    for (var i = 1; i < this.props.timeFrame; i++) {\n      newLabels.push(currentDate.getDate() + \"/\" + (currentDate.getMonth() + 1) + \"/\" + currentDate.getFullYear());\n      currentDate.setDate(currentDate.getDate() + 1);\n    }\n\n    var data = window.InsightsEmissions(this.props.tags, this.props.capacity, this.props.timeFrame);\n    data.then(result => {\n      for (var i = 0; i < numberOfMachines; i++) {\n        var dataset = {\n          label: this.props.names[i],\n          data: result[i],\n          borderColor: colors[i],\n          pointRadius: \"0.001\"\n        };\n        newData.push(dataset);\n      }\n\n      this.setState({\n        data: newData,\n        label: newLabels\n      });\n    });\n  } // if the time frame changes then request new data with the new time frame.\n\n\n  componentDidUpdate(prevProps) {\n    if (prevProps.timeFrame != this.props.timeFrame || prevProps.tags != this.props.tags) {\n      this.getData();\n    }\n  }\n\n  render() {\n    return /*#__PURE__*/React.createElement(_linechart_js__WEBPACK_IMPORTED_MODULE_1__.LineChart, {\n      dataset: this.state.data,\n      labels: this.state.label,\n      yLabel: \"MW\"\n    });\n  }\n\n}\n\n//# sourceURL=webpack://mynewapp/./wwwroot/Scripts/src/emissions.js?");

/***/ }),

/***/ "./wwwroot/Scripts/src/linechart.js":
/*!******************************************!*\
  !*** ./wwwroot/Scripts/src/linechart.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"LineChart\": () => (/* binding */ LineChart)\n/* harmony export */ });\nclass LineChart extends React.Component {\n  constructor(props) {\n    super(props);\n    this.canvasRef = React.createRef();\n  }\n  /**\r\n   * when component updates i.e the props changes, update the graph\r\n   */\n\n\n  componentDidUpdate() {\n    this.myChart.data.labels = this.props.labels;\n    this.myChart.data.datasets = this.props.dataset;\n    this.myChart.options.scales.yAxes[0].scaleLabel.labelString = this.props.yLabel;\n    this.myChart.update();\n  }\n  /**\r\n   * If a component in the DOM begins its lifetime, it has been mounted.\r\n   * Will draw the chart using the labels and values given.\r\n   */\n\n\n  componentDidMount() {\n    this.myChart = new Chart(this.canvasRef.current, {\n      type: 'line',\n      data: {\n        labels: this.props.labels,\n        datasets: this.props.dataset\n      },\n      options: {\n        maintainAspectRatio: false,\n        legend: {\n          labels: {\n            fontColor: '#000000'\n          }\n        },\n        scales: {\n          xAxes: [{\n            ticks: {\n              maxTicksLimit: 0,\n              fontColor: \"#000000\"\n            },\n            gridLines: {\n              zeroLineColor: '#000000'\n            },\n            scaleLabel: {\n              display: true,\n              labelString: 'Time',\n              fontColor: '#000000'\n            }\n          }],\n          yAxes: [{\n            ticks: {\n              fontColor: '#000000',\n              beginAtZero: true,\n              suggestedMax: 100\n            },\n            gridLines: {\n              zeroLineColor: '#000000'\n            },\n            scaleLabel: {\n              display: true,\n              labelString: \"\",\n              fontColor: '#000000'\n            }\n          }]\n        }\n      }\n    });\n  }\n  /**\r\n   * Will return the graph drawn.\r\n   */\n\n\n  render() {\n    return /*#__PURE__*/React.createElement(\"canvas\", {\n      ref: this.canvasRef\n    });\n  }\n\n}\n\n//# sourceURL=webpack://mynewapp/./wwwroot/Scripts/src/linechart.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./wwwroot/Scripts/src/emissions.js");
/******/ 	
/******/ })()
;