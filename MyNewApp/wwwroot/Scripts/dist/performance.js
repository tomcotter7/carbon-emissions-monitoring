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

/***/ "./wwwroot/Scripts/src/performance.js":
/*!********************************************!*\
  !*** ./wwwroot/Scripts/src/performance.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Performance\": () => (/* binding */ Performance)\n/* harmony export */ });\n/* harmony import */ var _piechart_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./piechart.js */ \"./wwwroot/Scripts/src/piechart.js\");\n/* harmony import */ var _colorArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./colorArray.js */ \"./wwwroot/Scripts/src/colorArray.js\");\n\n // a simple stateless component to show the user when data is loading\n\nconst Loading = () => {\n  return /*#__PURE__*/React.createElement(\"p\", {\n    style: {\n      textAlign: 'center',\n      fontWeight: '700',\n      fontSize: '3vh',\n      marginBottom: '1vh',\n      fontFamily: 'sans-serif'\n    }\n  }, \" Data Loading... \");\n};\n/**\r\n * Author: Thomas Cotter\r\n * A react component that contains a pie chart displaying efficiency for the water pumps and a short description explaining what the pie chart is to the user\r\n * @param {any} props\r\n */\n\n\nclass Performance extends React.Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n      arrayData: [],\n      colors: [],\n      show: false,\n      unit: \"\"\n    };\n    this.getData = this.getData.bind(this);\n    this.getData();\n  } // gets the efficiency in m^3 / kW for each machine passed in (only works for water pumps atm because data is not good)\n\n\n  getData() {\n    var flcTags = this.props.flc;\n    var effTags = this.props.eff;\n    var constant = this.props.cons;\n    var names = this.props.names;\n    var data = window.InsightsEfficiency(flcTags.concat(effTags), this.props.timeFrame);\n    data.then(result => {\n      var throughput = result.l1;\n      var flc = result.l2;\n      let energy = [];\n\n      for (var i in flc) {\n        energy.push(flc[i] * constant / 1000);\n      }\n\n      var newColors = (0,_colorArray_js__WEBPACK_IMPORTED_MODULE_1__.calculateColors)(flc.length);\n      let results = [];\n      throughput.forEach((t, index) => {\n        var dataToAdd = 'NaN';\n\n        if (energy[index] != 0) {\n          dataToAdd = t / energy[index];\n        }\n\n        results.push({\n          label: names[index],\n          data: dataToAdd\n        });\n      }); // arrayData is when will be passed into the pie chart as a dataset, colors are the randomly generated colors for the slices\n      // TODO: update colors to not be random\n\n      this.setState({\n        arrayData: results,\n        show: true,\n        colors: newColors\n      });\n    });\n  } // if the time frame changes then request new data with the new time frame.\n\n\n  componentDidUpdate(prevProps) {\n    if (prevProps.timeFrame != this.props.timeFrame) {\n      this.getData();\n    }\n  }\n\n  render() {\n    const titleStyle = {\n      textDecoration: \"underline\",\n      fontFamily: 'sans-serif',\n      fontSize: '2.3vh',\n      marginBottom: '1vh',\n      fontWeight: 700\n    };\n    return /*#__PURE__*/React.createElement(\"div\", {\n      style: {\n        minWidth: '100%',\n        display: \"flex\",\n        height: '54vh'\n      }\n    }, /*#__PURE__*/React.createElement(\"div\", {\n      style: {\n        minWidth: '48%',\n        height: '54vh'\n      }\n    }, this.state.show ? /*#__PURE__*/React.createElement(_piechart_js__WEBPACK_IMPORTED_MODULE_0__.PieChart, {\n      title: this.props.machine,\n      data: this.state.arrayData,\n      colors: this.state.colors\n    }) : /*#__PURE__*/React.createElement(Loading, null)), /*#__PURE__*/React.createElement(\"div\", {\n      style: {\n        minWidth: '48%',\n        height: '54vh',\n        margin: 'auto',\n        textAlign: 'center'\n      }\n    }, /*#__PURE__*/React.createElement(\"div\", {\n      style: {\n        backgroundColor: 'white',\n        height: '15vh'\n      }\n    }, /*#__PURE__*/React.createElement(\"p\", {\n      style: titleStyle\n    }, \" Explanation of Graph \"), /*#__PURE__*/React.createElement(\"p\", {\n      style: {\n        fontSize: '1vh'\n      }\n    }, \" Anything in the key that is crossed out, has not been turned on in this time period \"), /*#__PURE__*/React.createElement(\"p\", {\n      style: {\n        fontSize: '1vh'\n      }\n    }, \" If anything isn't crossed out, but is not showing on the graph, this means that the machine was using energy but didn't do anything with that energy (i.e. 0% efficiency) \"), /*#__PURE__*/React.createElement(\"p\", {\n      style: {\n        fontSize: '1vh'\n      }\n    }, \" The unit for the pie chart is m\", /*#__PURE__*/React.createElement(\"sup\", null, \"3\"), \" / MWh \"))));\n  }\n\n}\n\n//# sourceURL=webpack://mynewapp/./wwwroot/Scripts/src/performance.js?");

/***/ }),

/***/ "./wwwroot/Scripts/src/piechart.js":
/*!*****************************************!*\
  !*** ./wwwroot/Scripts/src/piechart.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"PieChart\": () => (/* binding */ PieChart)\n/* harmony export */ });\nclass PieChart extends React.Component {\n  constructor(props) {\n    super(props);\n    this.canvasRef = React.createRef();\n  }\n\n  componentDidUpdate() {\n    this.myChart.data.labels = this.props.data.map(d => d.label);\n    this.myChart.data.datasets[0].data = this.props.data.map(d => d.data);\n    this.myChart.data.datasets[0].backgroundColor = this.props.colors;\n    this.myChart.update();\n  }\n\n  componentDidMount() {\n    this.myChart = new Chart(this.canvasRef.current, {\n      type: 'doughnut',\n      data: {\n        labels: this.props.data.map(d => d.label),\n        datasets: [{\n          data: this.props.data.map(d => d.data),\n          backgroundColor: this.props.colors\n        }]\n      },\n      options: {\n        legend: {\n          labels: {\n            fontColor: '#000000'\n          }\n        }\n      }\n    });\n  }\n\n  render() {\n    return /*#__PURE__*/React.createElement(\"canvas\", {\n      ref: this.canvasRef\n    });\n  }\n\n}\n\n//# sourceURL=webpack://mynewapp/./wwwroot/Scripts/src/piechart.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./wwwroot/Scripts/src/performance.js");
/******/ 	
/******/ })()
;