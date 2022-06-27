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

/***/ "./wwwroot/Scripts/src/piechart.js":
/*!*****************************************!*\
  !*** ./wwwroot/Scripts/src/piechart.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"PieChart\": () => (/* binding */ PieChart)\n/* harmony export */ });\nclass PieChart extends React.Component {\n  constructor(props) {\n    super(props);\n    this.canvasRef = React.createRef();\n  }\n\n  componentDidUpdate() {\n    this.myChart.data.labels = this.props.data.map(d => d.label);\n    this.myChart.data.datasets[0].data = this.props.data.map(d => d.data);\n    this.myChart.data.datasets[0].backgroundColor = this.props.colors;\n    this.myChart.update();\n  }\n\n  componentDidMount() {\n    this.myChart = new Chart(this.canvasRef.current, {\n      type: 'doughnut',\n      data: {\n        labels: this.props.data.map(d => d.label),\n        datasets: [{\n          data: this.props.data.map(d => d.data),\n          backgroundColor: this.props.colors\n        }]\n      },\n      options: {\n        legend: {\n          labels: {\n            fontColor: '#000000'\n          }\n        }\n      }\n    });\n  }\n\n  render() {\n    return /*#__PURE__*/React.createElement(\"canvas\", {\n      ref: this.canvasRef\n    });\n  }\n\n}\n\n//# sourceURL=webpack://mynewapp/./wwwroot/Scripts/src/piechart.js?");

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
/******/ 	__webpack_modules__["./wwwroot/Scripts/src/piechart.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;