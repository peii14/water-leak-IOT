"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/admin/dashboard/page",{

/***/ "(app-pages-browser)/./src/app/admin/dashboard/page.tsx":
/*!******************************************!*\
  !*** ./src/app/admin/dashboard/page.tsx ***!
  \******************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ UnivAdminAccounts; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var _barrel_optimize_names_User2Icon_lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! __barrel_optimize__?names=User2Icon!=!lucide-react */ \"(app-pages-browser)/./node_modules/lucide-react/dist/esm/icons/user-2.js\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/navigation */ \"(app-pages-browser)/./node_modules/next/navigation.js\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_navigation__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next-auth/react */ \"(app-pages-browser)/./node_modules/next-auth/react/index.js\");\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _components_shared_Typography__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/_components/shared/Typography */ \"(app-pages-browser)/./src/_components/shared/Typography.tsx\");\n/* harmony import */ var _components_SensorsChart__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./_components/SensorsChart */ \"(app-pages-browser)/./src/app/admin/dashboard/_components/SensorsChart.tsx\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\n\nfunction UnivAdminAccounts() {\n    var _session_data, _session_data1, _data;\n    _s();\n    const session = (0,next_auth_react__WEBPACK_IMPORTED_MODULE_2__.useSession)();\n    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_1__.useRouter)();\n    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{\n        if (session.status === \"unauthenticated\" || session.status === \"authenticated\" && session.data.user.role.name !== \"Admin\") router.replace(\"/login\");\n    }, [\n        router,\n        (_session_data = session.data) === null || _session_data === void 0 ? void 0 : _session_data.user.role,\n        session.status\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"main\", {\n        className: \"layout\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"section\", {\n                className: \"flex items-center justify-between\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"aside\", {\n                        className: \"flex items-center space-x-5\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"scale-150\",\n                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_User2Icon_lucide_react__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n                                    color: \"#0072BC\"\n                                }, void 0, false, {\n                                    fileName: \"/Users/gayuhkautaman/Developer/datastream/water-leak-IOT/dashboard/src/app/admin/dashboard/page.tsx\",\n                                    lineNumber: 27,\n                                    columnNumber: 13\n                                }, this)\n                            }, void 0, false, {\n                                fileName: \"/Users/gayuhkautaman/Developer/datastream/water-leak-IOT/dashboard/src/app/admin/dashboard/page.tsx\",\n                                lineNumber: 26,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_shared_Typography__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                                variant: \"sj3\",\n                                className: \"\",\n                                children: [\n                                    \"Hi \",\n                                    (_session_data1 = session.data) === null || _session_data1 === void 0 ? void 0 : _session_data1.user.name,\n                                    \" !\"\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/Users/gayuhkautaman/Developer/datastream/water-leak-IOT/dashboard/src/app/admin/dashboard/page.tsx\",\n                                lineNumber: 29,\n                                columnNumber: 11\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/gayuhkautaman/Developer/datastream/water-leak-IOT/dashboard/src/app/admin/dashboard/page.tsx\",\n                        lineNumber: 25,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_shared_Typography__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                        variant: \"h1\",\n                        className: \"mt-5\",\n                        children: \"Current Limits\"\n                    }, void 0, false, {\n                        fileName: \"/Users/gayuhkautaman/Developer/datastream/water-leak-IOT/dashboard/src/app/admin/dashboard/page.tsx\",\n                        lineNumber: 33,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_shared_Typography__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                        variant: \"h3\",\n                        className: \"mt-2\",\n                        children: (_data = data) === null || _data === void 0 ? void 0 : _data.data[0].limit\n                    }, void 0, false, {\n                        fileName: \"/Users/gayuhkautaman/Developer/datastream/water-leak-IOT/dashboard/src/app/admin/dashboard/page.tsx\",\n                        lineNumber: 36,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/gayuhkautaman/Developer/datastream/water-leak-IOT/dashboard/src/app/admin/dashboard/page.tsx\",\n                lineNumber: 24,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"section\", {\n                className: \"mt-5 h-[80vh]\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_SensorsChart__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {}, void 0, false, {\n                    fileName: \"/Users/gayuhkautaman/Developer/datastream/water-leak-IOT/dashboard/src/app/admin/dashboard/page.tsx\",\n                    lineNumber: 41,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"/Users/gayuhkautaman/Developer/datastream/water-leak-IOT/dashboard/src/app/admin/dashboard/page.tsx\",\n                lineNumber: 40,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/gayuhkautaman/Developer/datastream/water-leak-IOT/dashboard/src/app/admin/dashboard/page.tsx\",\n        lineNumber: 23,\n        columnNumber: 5\n    }, this);\n}\n_s(UnivAdminAccounts, \"Arxf0UNl9uEB/P3Wbs4q/QZf5JM=\", false, function() {\n    return [\n        next_auth_react__WEBPACK_IMPORTED_MODULE_2__.useSession,\n        next_navigation__WEBPACK_IMPORTED_MODULE_1__.useRouter\n    ];\n});\n_c = UnivAdminAccounts;\nvar _c;\n$RefreshReg$(_c, \"UnivAdminAccounts\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvYWRtaW4vZGFzaGJvYXJkL3BhZ2UudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDbUQ7QUFDUDtBQUNDO0FBQ1g7QUFHdUI7QUFDSDtBQUV2QyxTQUFTTTtRQVVWQyxlQVNFQSxnQkFPTEM7O0lBekJULE1BQU1ELFVBQVVMLDJEQUFVQTtJQUMxQixNQUFNTyxTQUFTUiwwREFBU0E7SUFDeEJFLGdEQUFTQSxDQUFDO1FBQ1IsSUFDRUksUUFBUUcsTUFBTSxLQUFLLHFCQUNsQkgsUUFBUUcsTUFBTSxLQUFLLG1CQUNsQkgsUUFBUUMsSUFBSSxDQUFDRyxJQUFJLENBQUNDLElBQUksQ0FBQ0MsSUFBSSxLQUFLLFNBRWxDSixPQUFPSyxPQUFPLENBQUM7SUFDbkIsR0FBRztRQUFDTDtTQUFRRixnQkFBQUEsUUFBUUMsSUFBSSxjQUFaRCxvQ0FBQUEsY0FBY0ksSUFBSSxDQUFDQyxJQUFJO1FBQUVMLFFBQVFHLE1BQU07S0FBQztJQUNwRCxxQkFDRSw4REFBQ0s7UUFBS0MsV0FBVTs7MEJBQ2QsOERBQUNDO2dCQUFRRCxXQUFVOztrQ0FDakIsOERBQUNFO3dCQUFNRixXQUFVOzswQ0FDZiw4REFBQ0c7Z0NBQUlILFdBQVU7MENBQ2IsNEVBQUNoQixxRkFBU0E7b0NBQUNvQixPQUFNOzs7Ozs7Ozs7OzswQ0FFbkIsOERBQUNoQixxRUFBVUE7Z0NBQUNpQixTQUFRO2dDQUFNTCxXQUFVOztvQ0FBRztxQ0FDakNULGlCQUFBQSxRQUFRQyxJQUFJLGNBQVpELHFDQUFBQSxlQUFjSSxJQUFJLENBQUNFLElBQUk7b0NBQUM7Ozs7Ozs7Ozs7Ozs7a0NBR2hDLDhEQUFDVCxxRUFBVUE7d0JBQUNpQixTQUFRO3dCQUFLTCxXQUFVO2tDQUFPOzs7Ozs7a0NBRzFDLDhEQUFDWixxRUFBVUE7d0JBQUNpQixTQUFRO3dCQUFLTCxXQUFVO21DQUNoQ1IsUUFBQUEsa0JBQUFBLDRCQUFBQSxNQUFNQSxJQUFJLENBQUMsRUFBRSxDQUFDYyxLQUFLOzs7Ozs7Ozs7Ozs7MEJBR3hCLDhEQUFDTDtnQkFBUUQsV0FBVTswQkFDakIsNEVBQUNYLGdFQUFZQTs7Ozs7Ozs7Ozs7Ozs7OztBQUlyQjtHQWxDd0JDOztRQUNOSix1REFBVUE7UUFDWEQsc0RBQVNBOzs7S0FGRksiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2FwcC9hZG1pbi9kYXNoYm9hcmQvcGFnZS50c3g/NGU2YSJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBjbGllbnRcIjtcbmltcG9ydCB7IFBsdXNJY29uLCBVc2VyMkljb24gfSBmcm9tIFwibHVjaWRlLXJlYWN0XCI7XG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tIFwibmV4dC9uYXZpZ2F0aW9uXCI7XG5pbXBvcnQgeyB1c2VTZXNzaW9uIH0gZnJvbSBcIm5leHQtYXV0aC9yZWFjdFwiO1xuaW1wb3J0IHsgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XG5cbmltcG9ydCBCdXR0b25MaW5rIGZyb20gXCJAL19jb21wb25lbnRzL3NoYXJlZC9saW5rcy9CdXR0b25MaW5rXCI7XG5pbXBvcnQgVHlwb2dyYXBoeSBmcm9tIFwiQC9fY29tcG9uZW50cy9zaGFyZWQvVHlwb2dyYXBoeVwiO1xuaW1wb3J0IFNlbnNvcnNDaGFydCBmcm9tIFwiLi9fY29tcG9uZW50cy9TZW5zb3JzQ2hhcnRcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gVW5pdkFkbWluQWNjb3VudHMoKSB7XG4gIGNvbnN0IHNlc3Npb24gPSB1c2VTZXNzaW9uKCk7XG4gIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChcbiAgICAgIHNlc3Npb24uc3RhdHVzID09PSBcInVuYXV0aGVudGljYXRlZFwiIHx8XG4gICAgICAoc2Vzc2lvbi5zdGF0dXMgPT09IFwiYXV0aGVudGljYXRlZFwiICYmXG4gICAgICAgIHNlc3Npb24uZGF0YS51c2VyLnJvbGUubmFtZSAhPT0gXCJBZG1pblwiKVxuICAgIClcbiAgICAgIHJvdXRlci5yZXBsYWNlKFwiL2xvZ2luXCIpO1xuICB9LCBbcm91dGVyLCBzZXNzaW9uLmRhdGE/LnVzZXIucm9sZSwgc2Vzc2lvbi5zdGF0dXNdKTtcbiAgcmV0dXJuIChcbiAgICA8bWFpbiBjbGFzc05hbWU9XCJsYXlvdXRcIj5cbiAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICA8YXNpZGUgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC01XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzY2FsZS0xNTBcIj5cbiAgICAgICAgICAgIDxVc2VyMkljb24gY29sb3I9XCIjMDA3MkJDXCIgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8VHlwb2dyYXBoeSB2YXJpYW50PVwic2ozXCIgY2xhc3NOYW1lPVwiXCI+XG4gICAgICAgICAgICBIaSB7c2Vzc2lvbi5kYXRhPy51c2VyLm5hbWV9ICFcbiAgICAgICAgICA8L1R5cG9ncmFwaHk+XG4gICAgICAgIDwvYXNpZGU+XG4gICAgICAgIDxUeXBvZ3JhcGh5IHZhcmlhbnQ9XCJoMVwiIGNsYXNzTmFtZT1cIm10LTVcIj5cbiAgICAgICAgICBDdXJyZW50IExpbWl0c1xuICAgICAgICA8L1R5cG9ncmFwaHk+XG4gICAgICAgIDxUeXBvZ3JhcGh5IHZhcmlhbnQ9XCJoM1wiIGNsYXNzTmFtZT1cIm10LTJcIj5cbiAgICAgICAgICB7ZGF0YT8uZGF0YVswXS5saW1pdH1cbiAgICAgICAgPC9UeXBvZ3JhcGh5PlxuICAgICAgPC9zZWN0aW9uPlxuICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwibXQtNSBoLVs4MHZoXVwiPlxuICAgICAgICA8U2Vuc29yc0NoYXJ0IC8+XG4gICAgICA8L3NlY3Rpb24+XG4gICAgPC9tYWluPlxuICApO1xufVxuIl0sIm5hbWVzIjpbIlVzZXIySWNvbiIsInVzZVJvdXRlciIsInVzZVNlc3Npb24iLCJ1c2VFZmZlY3QiLCJUeXBvZ3JhcGh5IiwiU2Vuc29yc0NoYXJ0IiwiVW5pdkFkbWluQWNjb3VudHMiLCJzZXNzaW9uIiwiZGF0YSIsInJvdXRlciIsInN0YXR1cyIsInVzZXIiLCJyb2xlIiwibmFtZSIsInJlcGxhY2UiLCJtYWluIiwiY2xhc3NOYW1lIiwic2VjdGlvbiIsImFzaWRlIiwiZGl2IiwiY29sb3IiLCJ2YXJpYW50IiwibGltaXQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/admin/dashboard/page.tsx\n"));

/***/ })

});