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

/***/ "./wwwroot/Scripts/src/chartdataset.js":
/*!*********************************************!*\
  !*** ./wwwroot/Scripts/src/chartdataset.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ChartDataset\": () => (/* binding */ ChartDataset)\n/* harmony export */ });\n/* harmony import */ var _linechart_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./linechart.js */ \"./wwwroot/Scripts/src/linechart.js\");\n/* harmony import */ var _colorArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./colorArray.js */ \"./wwwroot/Scripts/src/colorArray.js\");\n\n\nconst options = {\n  \"WI Pump A\": \"ALB-FLC_P2302A.PV\",\n  \"WI Pump B\": \"ALB-FLC_P2302B.PV\",\n  \"WI Pump C\": \"ALB-FLC_P2302C.PV\",\n  \"WI Pump D\": \"ALB-FLC_P2302D.PV\",\n  \"WI Pump E\": \"ALB-FLC_P2302E.PV\",\n  \"SWLP A\": \"ALB-FLC_P2101A.PV\",\n  \"SWLP B\": \"ALB-FLC_P2101B.PV\",\n  \"SWLP C\": \"ALB-FLC_P2101C.PV\",\n  \"Gas Comp A\": \"ALB-FLC_K0801A.PV\",\n  \"Gas Comp B\": \"ALB-FLC_K0801B.PV\",\n  \"Export Pump A\": \"ALB-FLC_P0521S.PV\",\n  \"Export Pump B\": \"ALB-FLC_P0521.PV\",\n  \"Coalescer Water Pump A\": \"ALB-FLC_P0321.PV\",\n  \"Coalescer Water Pump B\": \"ALB-FLC_P0321S.PV\",\n  \"Coalescer Water Pump C\": \"ALB-FLC_P0322.PV\",\n  \"Test Seperator Pump\": \"ALB-FLC_P0401.PV\",\n  \"Clean-up Separator Pump\": \"ALB-FLC_P0402.PV\"\n};\n\nfunction fixData(array) {\n  let data = [];\n\n  for (var i in array) {\n    var timeData = array[i];\n\n    if (timeData[\"numericValue\"] != 'NaN' && timeData[\"numericValue\"] <= 100) {\n      data.push(timeData[\"numericValue\"]);\n    }\n  }\n\n  return data;\n}\n\nfunction convertHour(hour) {\n  if (hour < 12) {\n    return hour + \":00 AM\";\n  } else {\n    return hour + \":00 PM\";\n  }\n}\n/**\r\n * Author: Thomas Cotter\r\n * About: This React components display a graph showing the FLC% of all machines on the plant\r\n * */\n\n\nclass ChartDataset extends React.Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n      chartData: [],\n      labels: [],\n      dataLoaded: false\n    };\n    this.getData = this.getData.bind(this);\n    this.getData();\n  }\n\n  async getData() {\n    let newLabels = [];\n    let newDataset = [];\n    var start = new Date();\n    start.setHours(start.getHours() - 24);\n\n    for (var i = 0; i < 24; i++) {\n      newLabels.push(convertHour(start.getHours()));\n      start.setHours(start.getHours() + 1);\n    }\n\n    var colors = (0,_colorArray_js__WEBPACK_IMPORTED_MODULE_1__.calculateColors)(Object.keys(options).length);\n    var j = 0;\n\n    for (var i in options) {\n      var data = window.getDashboardData(options[i]);\n      await data.then(result => {\n        var dataset = {\n          label: i,\n          data: fixData(result[\"tagValues\"]),\n          borderColor: colors[j],\n          pointRadius: \"0.001\"\n        };\n        newDataset.push(dataset);\n      });\n      j += 1;\n    }\n\n    this.setState({\n      chartData: newDataset,\n      labels: newLabels,\n      dataLoaded: true\n    });\n  }\n\n  render() {\n    return /*#__PURE__*/React.createElement(\"div\", {\n      style: {\n        minWidth: '50%',\n        height: '55vh'\n      }\n    }, this.state.dataLoaded ? /*#__PURE__*/React.createElement(_linechart_js__WEBPACK_IMPORTED_MODULE_0__.LineChart, {\n      dataset: this.state.chartData,\n      labels: this.state.labels,\n      yLabel: \"FLC%\"\n    }) : null);\n  }\n\n}\n\n//# sourceURL=webpack://mynewapp/./wwwroot/Scripts/src/chartdataset.js?");

/***/ }),

/***/ "./wwwroot/Scripts/src/colorArray.js":
/*!*******************************************!*\
  !*** ./wwwroot/Scripts/src/colorArray.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"calculateColors\": () => (/* binding */ calculateColors)\n/* harmony export */ });\nconst colors = [\"#E8ECFB\", \"#D9CCE3\", \"#D1BBD7\", \"#CAACCB\", \"#BA8DB4\", \"#AE76A3\", \"#AA6F9E\", \"#994F88\", \"#882E72\", \"#1965B0\", \"#437DBF\", \"#5289C7\", \"#6195CF\", \"#7BAFDE\", \"#4EB265\", \"#90C987\", \"#CAE0AB\", \"#F7F056\", \"#F7CB45\", \"#F6C141\", \"#F4A736\", \"#F1932D\", \"#EE8026\", \"#E8601C\", \"#E65518\", \"#DC050C\", \"#A5170E\", \"#72190E\", \"#42150A\"];\nconst orders = {\n  1: [10],\n  2: [10, 26],\n  3: [10, 18, 26],\n  4: [10, 15, 18, 26],\n  5: [10, 14, 15, 18, 26],\n  6: [10, 14, 15, 17, 18, 26],\n  7: [9, 10, 14, 15, 17, 18, 26],\n  8: [9, 10, 14, 15, 17, 18, 23, 26],\n  9: [9, 10, 14, 15, 17, 18, 23, 26, 28],\n  10: [9, 10, 14, 15, 17, 18, 21, 24, 26, 28],\n  11: [9, 10, 12, 14, 15, 17, 18, 21, 24, 26, 28],\n  12: [3, 6, 9, 10, 12, 14, 15, 17, 18, 21, 24, 26],\n  13: [3, 6, 9, 10, 12, 14, 15, 16, 17, 18, 21, 24, 26],\n  14: [3, 6, 9, 10, 12, 14, 15, 16, 17, 18, 20, 22, 24, 26],\n  15: [3, 6, 9, 10, 12, 14, 15, 16, 17, 18, 20, 22, 24, 26, 28],\n  16: [3, 5, 7, 8, 9, 10, 12, 14, 15, 16, 17, 18, 22, 24, 26, 28],\n  17: [3, 5, 7, 8, 9, 10, 12, 14, 15, 16, 17, 18, 20, 22, 24, 26, 28],\n  18: [3, 5, 7, 8, 9, 10, 12, 14, 15, 16, 17, 18, 20, 22, 24, 26, 27, 28],\n  19: [2, 4, 5, 7, 8, 9, 10, 12, 14, 15, 16, 17, 18, 20, 22, 24, 26, 27, 28],\n  20: [2, 4, 5, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 20, 22, 24, 26, 27, 28],\n  21: [2, 4, 5, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 21, 23, 25, 26, 27, 28],\n  22: [2, 4, 5, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 21, 23, 25, 26, 27, 28, 29],\n  23: [1, 2, 4, 5, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 21, 23, 25, 26, 27, 28, 29]\n};\n/**\r\n * Author: Thomas Cotter\r\n * About: function that works out the colours you should use for a dataset of size n\r\n * @param {any} n - the size of the dataset\r\n */\n\nfunction calculateColors(n) {\n  var order = orders[n];\n  let colorArray = [];\n\n  for (var i in order) {\n    colorArray.push(colors[order[i]]);\n  }\n\n  return colorArray;\n}\n\n//# sourceURL=webpack://mynewapp/./wwwroot/Scripts/src/colorArray.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./wwwroot/Scripts/src/chartdataset.js");
/******/ 	
/******/ })()
;