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

/***/ "./wwwroot/Scripts/src/entireplant.js":
/*!********************************************!*\
  !*** ./wwwroot/Scripts/src/entireplant.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"EntirePlant\": () => (/* binding */ EntirePlant)\n/* harmony export */ });\n/* harmony import */ var _linechart_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./linechart.js */ \"./wwwroot/Scripts/src/linechart.js\");\n/* harmony import */ var _colorArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./colorArray.js */ \"./wwwroot/Scripts/src/colorArray.js\");\n\n\n\nfunction dayString(day) {\n  var days = [\"Sunday\", \"Monday\", \"Tuesday\", \"Wednesday\", \"Thursday\", \"Friday\", \"Saturday\", \"Sunday\"];\n  return days[day];\n}\n\nfunction dateString(date) {\n  if (date == 1) {\n    return \"1st\";\n  } else if (date == 2) {\n    return \"2nd\";\n  } else if (date == 3) {\n    return \"3rd\";\n  } else {\n    return date + \"th\";\n  }\n}\n/**\r\n * Author: Thomas Cotter\r\n * Function returns the data in a format that can be used by chart.js\r\n * @param {any} data\r\n */\n\n\nfunction fixData(data) {\n  let fixedData = [];\n  let energyUse = [];\n  var dates = data.dow;\n  var values = data.iar;\n\n  for (var i in values) {\n    var timeObject = new Date(dates[i]);\n    var dataToAdd = values[i].value[1];\n    var labelToAdd = dayString(timeObject.getDay()) + \" \" + dateString(timeObject.getDate());\n    fixedData.push({\n      label: labelToAdd,\n      value: dataToAdd\n    });\n    var energyData = values[i].value[0];\n    energyUse.push({\n      label: labelToAdd,\n      value: energyData\n    });\n  }\n\n  var returnObject = [fixedData, energyUse];\n  return returnObject;\n}\n/**\r\n * Author: Thomas Cotter\r\n * About: functional component to show the user that the data is loading*/\n\n\nconst Loading = () => {\n  return /*#__PURE__*/React.createElement(\"p\", {\n    style: {\n      textAlign: 'center',\n      fontWeight: '700',\n      fontSize: '3vh',\n      marginBottom: '1vh',\n      fontFamily: 'sans-serif'\n    }\n  }, \" Data Loading... \");\n};\n/**\r\n * Author: Thomas Cotter\r\n * functional component to show the data for the efficiency of the turbine\r\n * @param {any} props\r\n */\n\n\nconst EfficiencyData = props => {\n  var JBValue, SMValue;\n\n  if (props.JB == \"NaN\" || props.JB < 0) {\n    JBValue = \"-\";\n  } else {\n    JBValue = props.JB.toFixed(5);\n  }\n\n  if (props.SM == \"NaN\" || props.SM < 0) {\n    SMValue = \"-\";\n  } else {\n    SMValue = props.SM.toFixed(5);\n  }\n\n  return /*#__PURE__*/React.createElement(\"div\", null, /*#__PURE__*/React.createElement(\"p\", {\n    style: {\n      fontSize: '1.9vh',\n      marginBottom: '0.5vh',\n      marginTop: '0.5vh',\n      fontFamily: 'sans-serif'\n    }\n  }, \" John Brown: \", JBValue, \" MW/kg of \", props.fuel, \" \"), /*#__PURE__*/React.createElement(\"p\", {\n    style: {\n      fontSize: '1.9vh',\n      marginBottom: '0.5vh',\n      marginTop: '0.5vh',\n      fontFamily: 'sans-serif'\n    }\n  }, \" Solar Mars: \", SMValue, \" MW/kg of \", props.fuel, \" \"));\n};\n/**\r\n * Author: Thomas Cotter\r\n * About: class shows a graph showing the c02 production for that week and also a text box showing the efficiency of the turbine*/\n\n\nclass EntirePlant extends React.Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n      mainData: [],\n      secondaryData: [],\n      labels: [],\n      dataLoadedR: false,\n      turbineEfficiencyJBGas: 0,\n      turbineEfficiencySMGas: 0,\n      turbineEfficiencyJBDiesel: 0,\n      turbineEfficiencySMDiesel: 0,\n      dataLoadedE: false\n    };\n    this.getData = this.getData.bind(this);\n    this.getData();\n  }\n\n  getData() {\n    if (!window.TestDataSource()) {\n      var data = window.EntirePlantWeekData();\n      var efficiencyData = window.TurbineEfficiency();\n      var fuelUsage = window.FuelUsage(); // this loads in the data needed for the graph displaying fuel / c02 usage.\n\n      data.then(result => {\n        var fixedResult = fixData(result);\n        var newLabels = fixedResult[0].map(d => d.label);\n        var values = fixedResult[0].map(d => d.value);\n        var colors = (0,_colorArray_js__WEBPACK_IMPORTED_MODULE_1__.calculateColors)(3);\n        var tempData = [{\n          label: \"C02 Output for the Entire Plant over the Last Week\",\n          data: values,\n          borderColor: colors[0]\n        }];\n        fuelUsage.then(result => {\n          var fixedResult = fixData(result);\n          var dieselData = fixedResult[0].map(d => d.value);\n          var gasData = fixedResult[1].map(d => d.value);\n          var chartData = [{\n            label: \"Gas Use this Week\",\n            data: gasData,\n            borderColor: colors[1]\n          }, {\n            label: \"Diesel Use this Week\",\n            data: dieselData,\n            borderColor: colors[2]\n          }];\n          var completedData = tempData.concat(chartData);\n          console.log(completedData);\n          this.setState({\n            mainData: completedData,\n            labels: newLabels,\n            dataLoadedR: true\n          });\n        });\n      }); // this loads in the data needed for the efficiency text box about both turbines   \n\n      efficiencyData.then(result => {\n        this.setState({\n          dataLoadedE: true,\n          turbineEfficiencyJBGas: result[0],\n          turbineEfficiencySMGas: result[1],\n          turbineEfficiencyJBDiesel: result[2],\n          turbineEfficiencySMDiesel: result[3]\n        });\n      });\n    }\n  }\n\n  render() {\n    const titleStyle = {\n      textDecoration: \"underline\",\n      fontFamily: 'sans-serif',\n      fontSize: '2.3vh',\n      marginBottom: '1vh',\n      fontWeight: 700\n    };\n    const smallTitleStyle = {\n      fontSize: '2vh',\n      fontFamily: 'sans-serif',\n      fontWeight: 700,\n      marginBottom: '0.6vh',\n      marginTop: '0.6vh',\n      textDecoration: 'underline'\n    };\n    const descriptionStyle = {\n      backgroundColor: \"white\",\n      height: \"25vh\",\n      textAlign: 'center',\n      minWidth: \"50%\",\n      margin: 'auto',\n      display: 'table'\n    };\n    return /*#__PURE__*/React.createElement(\"div\", {\n      style: {\n        display: \"flex\"\n      }\n    }, /*#__PURE__*/React.createElement(\"div\", {\n      style: {\n        minWidth: '50%',\n        height: '55vh'\n      }\n    }, /*#__PURE__*/React.createElement(_linechart_js__WEBPACK_IMPORTED_MODULE_0__.LineChart, {\n      dataset: this.state.mainData,\n      yLabel: \"Tonnes\",\n      labels: this.state.labels\n    })), /*#__PURE__*/React.createElement(\"div\", {\n      style: descriptionStyle\n    }, /*#__PURE__*/React.createElement(\"p\", {\n      style: titleStyle\n    }, \" Current Efficiency of Both Turbines \"), /*#__PURE__*/React.createElement(\"p\", {\n      style: smallTitleStyle\n    }, \" Efficiency of Gas \"), this.state.dataLoadedE ? /*#__PURE__*/React.createElement(EfficiencyData, {\n      JB: this.state.turbineEfficiencyJBGas,\n      SM: this.state.turbineEfficiencySMGas,\n      fuel: \"gas\"\n    }) : /*#__PURE__*/React.createElement(Loading, null), /*#__PURE__*/React.createElement(\"p\", {\n      style: smallTitleStyle\n    }, \" Efficiency of Diesel \"), this.state.dataLoadedE ? /*#__PURE__*/React.createElement(EfficiencyData, {\n      JB: this.state.turbineEfficiencyJBDiesel,\n      SM: this.state.turbineEfficiencySMDiesel,\n      fuel: \"diesel\"\n    }) : /*#__PURE__*/React.createElement(Loading, null)));\n  }\n\n}\nReactDOM.render( /*#__PURE__*/React.createElement(EntirePlant, null), document.getElementById('entireplant'));\n\n//# sourceURL=webpack://mynewapp/./wwwroot/Scripts/src/entireplant.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./wwwroot/Scripts/src/entireplant.js");
/******/ 	
/******/ })()
;