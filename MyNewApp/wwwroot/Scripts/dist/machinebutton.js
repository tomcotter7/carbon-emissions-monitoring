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

/***/ "./wwwroot/Scripts/src/machinebutton.js":
/*!**********************************************!*\
  !*** ./wwwroot/Scripts/src/machinebutton.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"MachineButton\": () => (/* binding */ MachineButton)\n/* harmony export */ });\n/**\r\n * Author: Thomas Cotter\r\n * \r\n * Date:   02/04/21\r\n * \r\n * About:  This class is a button class that changes it's colour based on \r\n *         which machine it pertains to and how that machine is performing.\r\n */\nclass MachineButton extends React.Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n      machineTag: props.tag,\n      machineName: props.name,\n      buttonColor: \"green\",\n      dataGot: false\n    };\n    this.getData = this.getData.bind(this);\n    this.handleClick = this.handleClick.bind(this);\n    this.getData();\n  }\n\n  getData() {\n    if (!this.state.dataGot) {\n      var data = window.weeklyEmissionsState(this.state.machineTag);\n      data.then(result => {\n        this.setState({\n          buttonColor: result[\"color\"],\n          dataGot: true\n        });\n      });\n    }\n  }\n\n  handleClick() {\n    this.props.handleClick(this.state.machineName);\n  }\n\n  render() {\n    var buttonStyle = {\n      backgroundColor: this.state.buttonColor\n    };\n    return /*#__PURE__*/React.createElement(\"button\", {\n      style: buttonStyle,\n      onClick: this.handleClick\n    }, this.state.machineName);\n  }\n\n}\n\n//# sourceURL=webpack://mynewapp/./wwwroot/Scripts/src/machinebutton.js?");

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
/******/ 	__webpack_modules__["./wwwroot/Scripts/src/machinebutton.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;