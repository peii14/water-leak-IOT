"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/admin/sensor/page",{

/***/ "(app-pages-browser)/./src/app/admin/sensor/_components/SensorForm.tsx":
/*!*********************************************************!*\
  !*** ./src/app/admin/sensor/_components/SensorForm.tsx ***!
  \*********************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ LimitForm; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @tanstack/react-query */ \"(app-pages-browser)/./node_modules/@tanstack/react-query/build/lib/useMutation.mjs\");\n/* harmony import */ var _barrel_optimize_names_Plus_lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! __barrel_optimize__?names=Plus!=!lucide-react */ \"(app-pages-browser)/./node_modules/lucide-react/dist/esm/icons/plus.js\");\n/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-hook-form */ \"(app-pages-browser)/./node_modules/react-hook-form/dist/index.esm.mjs\");\n/* harmony import */ var react_hot_toast__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-hot-toast */ \"(app-pages-browser)/./node_modules/react-hot-toast/dist/index.mjs\");\n/* harmony import */ var _components_shared_buttons_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/_components/shared/buttons/Button */ \"(app-pages-browser)/./src/_components/shared/buttons/Button.tsx\");\n/* harmony import */ var _components_shared_forms_Input__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/_components/shared/forms/Input */ \"(app-pages-browser)/./src/_components/shared/forms/Input.tsx\");\n/* harmony import */ var _lib_axios__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/_lib/axios */ \"(app-pages-browser)/./src/_lib/axios.ts\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\n\n\nfunction LimitForm(param) {\n    let { refetch } = param;\n    _s();\n    // #region //* =========== Form ===========\n    const methods = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_5__.useForm)({\n        mode: \"onTouched\"\n    });\n    const { handleSubmit, reset } = methods;\n    //#endregion  //*======== Form ===========\n    //#region  //*=========== Form Submit ===========\n    const onSubmit = (data)=>{\n        const dataToSend = {\n            limit: data.limit,\n            id: 1\n        };\n        mutate(dataToSend);\n    };\n    const postSensorLimit = async (data)=>{\n        const res = await _lib_axios__WEBPACK_IMPORTED_MODULE_4__[\"default\"].put(\"/limit\", data);\n        if (typeof res === \"undefined\") {\n            react_hot_toast__WEBPACK_IMPORTED_MODULE_1__[\"default\"].error(\"Something went wrong\");\n            return res;\n        }\n    };\n    const mutation = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_6__.useMutation)({\n        mutationFn: postSensorLimit,\n        onSuccess: ()=>{\n            react_hot_toast__WEBPACK_IMPORTED_MODULE_1__[\"default\"].dismiss();\n            react_hot_toast__WEBPACK_IMPORTED_MODULE_1__[\"default\"].success(\"Set new threshold successfully\");\n            reset();\n            refetch();\n        },\n        onError: (error)=>{\n            react_hot_toast__WEBPACK_IMPORTED_MODULE_1__[\"default\"].dismiss();\n            react_hot_toast__WEBPACK_IMPORTED_MODULE_1__[\"default\"].error(error.message);\n        },\n        onMutate: ()=>{\n            react_hot_toast__WEBPACK_IMPORTED_MODULE_1__[\"default\"].loading(\"Processing...\");\n        }\n    });\n    const { mutate } = mutation;\n    // #endregion  //*======== Form Submit ===========\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_hook_form__WEBPACK_IMPORTED_MODULE_5__.FormProvider, {\n        ...methods,\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"form\", {\n            onSubmit: handleSubmit(onSubmit),\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_shared_forms_Input__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                    id: \"limit\",\n                    label: \"Limit\",\n                    style: {\n                        width: \"50%\"\n                    },\n                    validation: {\n                        required: \"Limit must be filled\"\n                    }\n                }, void 0, false, {\n                    fileName: \"/Users/gayuhkautaman/Developer/datastream/water-leak-IOT/dashboard/src/app/admin/sensor/_components/SensorForm.tsx\",\n                    lineNumber: 60,\n                    columnNumber: 9\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_shared_buttons_Button__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                    type: \"submit\",\n                    rightIcon: _barrel_optimize_names_Plus_lucide_react__WEBPACK_IMPORTED_MODULE_7__[\"default\"],\n                    variant: \"primary\",\n                    className: \"mt-5\",\n                    children: \"Set Limit\"\n                }, void 0, false, {\n                    fileName: \"/Users/gayuhkautaman/Developer/datastream/water-leak-IOT/dashboard/src/app/admin/sensor/_components/SensorForm.tsx\",\n                    lineNumber: 66,\n                    columnNumber: 9\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"/Users/gayuhkautaman/Developer/datastream/water-leak-IOT/dashboard/src/app/admin/sensor/_components/SensorForm.tsx\",\n            lineNumber: 59,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/gayuhkautaman/Developer/datastream/water-leak-IOT/dashboard/src/app/admin/sensor/_components/SensorForm.tsx\",\n        lineNumber: 58,\n        columnNumber: 5\n    }, this);\n}\n_s(LimitForm, \"Tfudg3180zN89BY3jDit6ZB1s1s=\", false, function() {\n    return [\n        react_hook_form__WEBPACK_IMPORTED_MODULE_5__.useForm,\n        _tanstack_react_query__WEBPACK_IMPORTED_MODULE_6__.useMutation\n    ];\n});\n_c = LimitForm;\nvar _c;\n$RefreshReg$(_c, \"LimitForm\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvYWRtaW4vc2Vuc29yL19jb21wb25lbnRzL1NlbnNvckZvcm0udHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBRW9EO0FBQ2hCO0FBQ21DO0FBQ25DO0FBRXFCO0FBQ0o7QUFDdEI7QUFNaEIsU0FBU1EsVUFBVSxLQUFvQztRQUFwQyxFQUFFQyxPQUFPLEVBQTJCLEdBQXBDOztJQUNoQywyQ0FBMkM7SUFDM0MsTUFBTUMsVUFBVVAsd0RBQU9BLENBQWlCO1FBQ3RDUSxNQUFNO0lBQ1I7SUFDQSxNQUFNLEVBQUVDLFlBQVksRUFBRUMsS0FBSyxFQUFFLEdBQUdIO0lBQ2hDLDBDQUEwQztJQUMxQyxpREFBaUQ7SUFDakQsTUFBTUksV0FBMEMsQ0FBQ0M7UUFDL0MsTUFBTUMsYUFBYTtZQUNqQkMsT0FBT0YsS0FBS0UsS0FBSztZQUNqQkMsSUFBSTtRQUNOO1FBQ0FDLE9BQU9IO0lBQ1Q7SUFDQSxNQUFNSSxrQkFBa0IsT0FBT0w7UUFDN0IsTUFBTU0sTUFBTSxNQUFNZCxrREFBR0EsQ0FBQ2UsR0FBRyxDQUFDLFVBQVVQO1FBQ3BDLElBQUksT0FBT00sUUFBUSxhQUFhO1lBQzlCakIsdURBQUtBLENBQUNtQixLQUFLLENBQUM7WUFDWixPQUFPRjtRQUNUO0lBQ0Y7SUFDQSxNQUFNRyxXQUFXeEIsa0VBQVdBLENBQUM7UUFDM0J5QixZQUFZTDtRQUVaTSxXQUFXO1lBQ1R0Qix1REFBS0EsQ0FBQ3VCLE9BQU87WUFDYnZCLHVEQUFLQSxDQUFDd0IsT0FBTyxDQUFDO1lBQ2RmO1lBQ0FKO1FBQ0Y7UUFDQW9CLFNBQVMsQ0FBQ047WUFDUm5CLHVEQUFLQSxDQUFDdUIsT0FBTztZQUNidkIsdURBQUtBLENBQUNtQixLQUFLLENBQUNBLE1BQU1PLE9BQU87UUFDM0I7UUFDQUMsVUFBVTtZQUNSM0IsdURBQUtBLENBQUM0QixPQUFPLENBQUM7UUFDaEI7SUFDRjtJQUNBLE1BQU0sRUFBRWIsTUFBTSxFQUFFLEdBQUdLO0lBQ25CLGtEQUFrRDtJQUNsRCxxQkFDRSw4REFBQ3RCLHlEQUFZQTtRQUFFLEdBQUdRLE9BQU87a0JBQ3ZCLDRFQUFDdUI7WUFBS25CLFVBQVVGLGFBQWFFOzs4QkFDM0IsOERBQUNSLHNFQUFLQTtvQkFDSlksSUFBRztvQkFDSGdCLE9BQU07b0JBQ05DLE9BQU87d0JBQUVDLE9BQU87b0JBQU07b0JBQ3RCQyxZQUFZO3dCQUFFQyxVQUFVO29CQUF1Qjs7Ozs7OzhCQUVqRCw4REFBQ2pDLHlFQUFNQTtvQkFDTGtDLE1BQUs7b0JBQ0xDLFdBQVd2QyxnRkFBSUE7b0JBQ2Z3QyxTQUFRO29CQUNSQyxXQUFVOzhCQUNYOzs7Ozs7Ozs7Ozs7Ozs7OztBQU1UO0dBN0R3QmxDOztRQUVOTCxvREFBT0E7UUFvQk5ILDhEQUFXQTs7O0tBdEJOUSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvYXBwL2FkbWluL3NlbnNvci9fY29tcG9uZW50cy9TZW5zb3JGb3JtLnRzeD83ZDEyIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIGNsaWVudFwiO1xuXG5pbXBvcnQgeyB1c2VNdXRhdGlvbiB9IGZyb20gXCJAdGFuc3RhY2svcmVhY3QtcXVlcnlcIjtcbmltcG9ydCB7IFBsdXMgfSBmcm9tIFwibHVjaWRlLXJlYWN0XCI7XG5pbXBvcnQgeyBGb3JtUHJvdmlkZXIsIFN1Ym1pdEhhbmRsZXIsIHVzZUZvcm0gfSBmcm9tIFwicmVhY3QtaG9vay1mb3JtXCI7XG5pbXBvcnQgdG9hc3QgZnJvbSBcInJlYWN0LWhvdC10b2FzdFwiO1xuXG5pbXBvcnQgQnV0dG9uIGZyb20gXCJAL19jb21wb25lbnRzL3NoYXJlZC9idXR0b25zL0J1dHRvblwiO1xuaW1wb3J0IElucHV0IGZyb20gXCJAL19jb21wb25lbnRzL3NoYXJlZC9mb3Jtcy9JbnB1dFwiO1xuaW1wb3J0IGFwaSBmcm9tIFwiQC9fbGliL2F4aW9zXCI7XG5cbnR5cGUgTGltaXRGb3JtUHJvcHMgPSB7XG4gIGxpbWl0OiBudW1iZXI7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBMaW1pdEZvcm0oeyByZWZldGNoIH06IHsgcmVmZXRjaDogKCkgPT4gdm9pZCB9KSB7XG4gIC8vICNyZWdpb24gLy8qID09PT09PT09PT09IEZvcm0gPT09PT09PT09PT1cbiAgY29uc3QgbWV0aG9kcyA9IHVzZUZvcm08TGltaXRGb3JtUHJvcHM+KHtcbiAgICBtb2RlOiBcIm9uVG91Y2hlZFwiLFxuICB9KTtcbiAgY29uc3QgeyBoYW5kbGVTdWJtaXQsIHJlc2V0IH0gPSBtZXRob2RzO1xuICAvLyNlbmRyZWdpb24gIC8vKj09PT09PT09IEZvcm0gPT09PT09PT09PT1cbiAgLy8jcmVnaW9uICAvLyo9PT09PT09PT09PSBGb3JtIFN1Ym1pdCA9PT09PT09PT09PVxuICBjb25zdCBvblN1Ym1pdDogU3VibWl0SGFuZGxlcjxMaW1pdEZvcm1Qcm9wcz4gPSAoZGF0YSkgPT4ge1xuICAgIGNvbnN0IGRhdGFUb1NlbmQgPSB7XG4gICAgICBsaW1pdDogZGF0YS5saW1pdCxcbiAgICAgIGlkOiAxLFxuICAgIH07XG4gICAgbXV0YXRlKGRhdGFUb1NlbmQpO1xuICB9O1xuICBjb25zdCBwb3N0U2Vuc29yTGltaXQgPSBhc3luYyAoZGF0YTogTGltaXRGb3JtUHJvcHMpID0+IHtcbiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkucHV0KFwiL2xpbWl0XCIsIGRhdGEpO1xuICAgIGlmICh0eXBlb2YgcmVzID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICB0b2FzdC5lcnJvcihcIlNvbWV0aGluZyB3ZW50IHdyb25nXCIpO1xuICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG4gIH07XG4gIGNvbnN0IG11dGF0aW9uID0gdXNlTXV0YXRpb24oe1xuICAgIG11dGF0aW9uRm46IHBvc3RTZW5zb3JMaW1pdCxcblxuICAgIG9uU3VjY2VzczogKCkgPT4ge1xuICAgICAgdG9hc3QuZGlzbWlzcygpO1xuICAgICAgdG9hc3Quc3VjY2VzcyhcIlNldCBuZXcgdGhyZXNob2xkIHN1Y2Nlc3NmdWxseVwiKTtcbiAgICAgIHJlc2V0KCk7XG4gICAgICByZWZldGNoKCk7XG4gICAgfSxcbiAgICBvbkVycm9yOiAoZXJyb3I6IEVycm9yKSA9PiB7XG4gICAgICB0b2FzdC5kaXNtaXNzKCk7XG4gICAgICB0b2FzdC5lcnJvcihlcnJvci5tZXNzYWdlKTtcbiAgICB9LFxuICAgIG9uTXV0YXRlOiAoKSA9PiB7XG4gICAgICB0b2FzdC5sb2FkaW5nKFwiUHJvY2Vzc2luZy4uLlwiKTtcbiAgICB9LFxuICB9KTtcbiAgY29uc3QgeyBtdXRhdGUgfSA9IG11dGF0aW9uO1xuICAvLyAjZW5kcmVnaW9uICAvLyo9PT09PT09PSBGb3JtIFN1Ym1pdCA9PT09PT09PT09PVxuICByZXR1cm4gKFxuICAgIDxGb3JtUHJvdmlkZXIgey4uLm1ldGhvZHN9PlxuICAgICAgPGZvcm0gb25TdWJtaXQ9e2hhbmRsZVN1Ym1pdChvblN1Ym1pdCl9PlxuICAgICAgICA8SW5wdXRcbiAgICAgICAgICBpZD1cImxpbWl0XCJcbiAgICAgICAgICBsYWJlbD1cIkxpbWl0XCJcbiAgICAgICAgICBzdHlsZT17eyB3aWR0aDogXCI1MCVcIiB9fVxuICAgICAgICAgIHZhbGlkYXRpb249e3sgcmVxdWlyZWQ6IFwiTGltaXQgbXVzdCBiZSBmaWxsZWRcIiB9fVxuICAgICAgICAvPlxuICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgdHlwZT1cInN1Ym1pdFwiXG4gICAgICAgICAgcmlnaHRJY29uPXtQbHVzfVxuICAgICAgICAgIHZhcmlhbnQ9XCJwcmltYXJ5XCJcbiAgICAgICAgICBjbGFzc05hbWU9XCJtdC01XCJcbiAgICAgICAgPlxuICAgICAgICAgIFNldCBMaW1pdFxuICAgICAgICA8L0J1dHRvbj5cbiAgICAgIDwvZm9ybT5cbiAgICA8L0Zvcm1Qcm92aWRlcj5cbiAgKTtcbn1cbiJdLCJuYW1lcyI6WyJ1c2VNdXRhdGlvbiIsIlBsdXMiLCJGb3JtUHJvdmlkZXIiLCJ1c2VGb3JtIiwidG9hc3QiLCJCdXR0b24iLCJJbnB1dCIsImFwaSIsIkxpbWl0Rm9ybSIsInJlZmV0Y2giLCJtZXRob2RzIiwibW9kZSIsImhhbmRsZVN1Ym1pdCIsInJlc2V0Iiwib25TdWJtaXQiLCJkYXRhIiwiZGF0YVRvU2VuZCIsImxpbWl0IiwiaWQiLCJtdXRhdGUiLCJwb3N0U2Vuc29yTGltaXQiLCJyZXMiLCJwdXQiLCJlcnJvciIsIm11dGF0aW9uIiwibXV0YXRpb25GbiIsIm9uU3VjY2VzcyIsImRpc21pc3MiLCJzdWNjZXNzIiwib25FcnJvciIsIm1lc3NhZ2UiLCJvbk11dGF0ZSIsImxvYWRpbmciLCJmb3JtIiwibGFiZWwiLCJzdHlsZSIsIndpZHRoIiwidmFsaWRhdGlvbiIsInJlcXVpcmVkIiwidHlwZSIsInJpZ2h0SWNvbiIsInZhcmlhbnQiLCJjbGFzc05hbWUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/admin/sensor/_components/SensorForm.tsx\n"));

/***/ })

});