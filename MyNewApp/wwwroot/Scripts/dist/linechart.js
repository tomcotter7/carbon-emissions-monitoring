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

/***/ "./wwwroot/Scripts/src/linechart.js":
/*!******************************************!*\
  !*** ./wwwroot/Scripts/src/linechart.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"LineChart\": () => (/* binding */ LineChart)\n/* harmony export */ });\nclass LineChart extends React.Component {\n  constructor(props) {\n    super(props);\n    this.canvasRef = React.createRef();\n  }\n  /**\r\n   * when component updates i.e the props changes, update the graph\r\n   */\n\n\n  componentDidUpdate() {\n    this.myChart.data.labels = this.props.labels;\n    this.myChart.data.datasets = this.props.dataset;\n    this.myChart.options.scales.yAxes[0].scaleLabel.labelString = this.props.yLabel;\n    this.myChart.update();\n  }\n  /**\r\n   * If a component in the DOM begins its lifetime, it has been mounted.\r\n   * Will draw the chart using the labels and values given.\r\n   */\n\n\n  componentDidMount() {\n    this.myChart = new Chart(this.canvasRef.current, {\n      type: 'line',\n      data: {\n        labels: this.props.labels,\n        datasets: this.props.dataset\n      },\n      options: {\n        maintainAspectRatio: false,\n        legend: {\n          labels: {\n            fontColor: '#000000'\n          }\n        },\n        scales: {\n          xAxes: [{\n            ticks: {\n              maxTicksLimit: 0,\n              fontColor: \"#000000\"\n            },\n            gridLines: {\n              zeroLineColor: '#000000'\n            },\n            scaleLabel: {\n              display: true,\n              labelString: 'Time',\n              fontColor: '#000000'\n            }\n          }],\n          yAxes: [{\n            ticks: {\n              fontColor: '#000000',\n              beginAtZero: true,\n              suggestedMax: 100\n            },\n            gridLines: {\n              zeroLineColor: '#000000'\n            },\n            scaleLabel: {\n              display: true,\n              labelString: \"\",\n              fontColor: '#000000'\n            }\n          }]\n        }\n      }\n    });\n  }\n  /**\r\n   * Will return the graph drawn.\r\n   */\n\n\n  render() {\n    return /*#__PURE__*/React.createElement(\"canvas\", {\n      ref: this.canvasRef\n    });\n  }\n\n}\n\n//# sourceURL=webpack://mynewapp/./wwwroot/Scripts/src/linechart.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
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
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./wwwroot/Scripts/src/linechart.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;