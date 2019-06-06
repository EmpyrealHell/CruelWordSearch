(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/app.component.html":
/*!**************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/app.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>\r\n  <h1>Cruel Word Search</h1>\r\n  <input [(ngModel)]=\"width\" placeholder=\"width\" size=\"4\">X<input [(ngModel)]=\"height\" placeholder=\"height\" size=\"4\"><br>\r\n  <input [(ngModel)]=\"word\" placeholder=\"enter word\">\r\n  <button (click)=\"generate()\">Generate</button>\r\n  <p>{{word}} occurs {{count}} times</p>\r\n  <table>\r\n      <tr *ngFor=\"let row of data.data\">\r\n          <td *ngFor=\"let column of row\">{{column}}</td>\r\n      </tr>\r\n  </table>\r\n</div>"

/***/ }),

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: Table, AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Table", function() { return Table; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//our root app component

var Table = /** @class */ (function () {
    function Table(rows, columns) {
        this.resize(rows, columns);
    }
    Table.prototype.resize = function (rows, columns) {
        this.rows = rows;
        this.columns = columns;
        this.data = new Array(this.rows);
        for (var i = 0; i < this.rows; i++) {
            this.data[i] = new Array(this.columns);
            for (var j = 0; j < this.columns; j++) {
                this.data[i][j] = Table.nbsp;
            }
        }
    };
    Table.nbsp = '\u00A0';
    return Table;
}());

var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.width = 10;
        this.height = 10;
        this.word = '';
        this.retryCount = 20;
        this.data = new Table(this.height, this.width);
    }
    AppComponent_1 = AppComponent;
    AppComponent.random = function (lowerBound, upperBound) {
        return Math.floor(Math.random() * (upperBound - lowerBound)) + lowerBound;
    };
    AppComponent.placeLetters = function (word, x, y, table, xDir, yDir, keyWord) {
        var width = table.columns;
        var height = table.rows;
        var xEnd = x + word.length * xDir;
        var yEnd = y + word.length * yDir;
        var xStart = x;
        if (xStart > xEnd) {
            xStart = xEnd;
            xEnd = x;
        }
        var yStart = y;
        if (yStart > yEnd) {
            yStart = yEnd;
            yEnd = y;
        }
        if (xStart < 0 || yStart < 0 || xEnd >= width || yEnd >= height) {
            return false;
        }
        for (var i = 0; i < word.length; i++) {
            if (table.data[y + i * yDir][x + i * xDir] != Table.nbsp)
                return false;
        }
        for (var i = 0; i < word.length; i++) {
            var char = word.substr(i, 1);
            table.data[y + i * yDir][x + i * xDir] = char;
        }
        if (AppComponent_1.totalWordCount(keyWord, table) > 1) {
            for (var i = 0; i < word.length; i++) {
                table.data[y + i * yDir][x + i * xDir] = Table.nbsp;
            }
            return false;
        }
        return true;
    };
    AppComponent.placeLtR = function (word, x, y, table, keyWord) {
        return AppComponent_1.placeLetters(word, x, y, table, 1, 0, keyWord);
    };
    AppComponent.placeRtL = function (word, x, y, table, keyWord) {
        return AppComponent_1.placeLetters(word, x, y, table, -1, 0, keyWord);
    };
    AppComponent.placeTtB = function (word, x, y, table, keyWord) {
        return AppComponent_1.placeLetters(word, x, y, table, 0, 1, keyWord);
    };
    AppComponent.placeBtT = function (word, x, y, table, keyWord) {
        return AppComponent_1.placeLetters(word, x, y, table, 0, -1, keyWord);
    };
    AppComponent.placeDDR = function (word, x, y, table, keyWord) {
        return AppComponent_1.placeLetters(word, x, y, table, 1, 1, keyWord);
    };
    AppComponent.placeDDL = function (word, x, y, table, keyWord) {
        return AppComponent_1.placeLetters(word, x, y, table, -1, 1, keyWord);
    };
    AppComponent.placeDUR = function (word, x, y, table, keyWord) {
        return AppComponent_1.placeLetters(word, x, y, table, 1, -1, keyWord);
    };
    AppComponent.placeDUL = function (word, x, y, table, keyWord) {
        return AppComponent_1.placeLetters(word, x, y, table, -1, -1, keyWord);
    };
    AppComponent.listAlgorithms = function (length, width, height) {
        var arrangements = new Array();
        var canHorizontal = length <= width;
        var canVertical = length <= height;
        if (canHorizontal) {
            arrangements.push(AppComponent_1.placeLtR);
            arrangements.push(AppComponent_1.placeRtL);
            if (canVertical) {
                arrangements.push(AppComponent_1.placeDDL);
                arrangements.push(AppComponent_1.placeDDR);
                arrangements.push(AppComponent_1.placeDUL);
                arrangements.push(AppComponent_1.placeDUR);
            }
        }
        if (canVertical) {
            arrangements.push(AppComponent_1.placeTtB);
            arrangements.push(AppComponent_1.placeBtT);
        }
        return arrangements;
    };
    AppComponent.placeWord = function (word, algs, table, keyWord) {
        var x = AppComponent_1.random(0, table.columns);
        var y = AppComponent_1.random(0, table.rows);
        var alg = AppComponent_1.random(0, algs.length);
        return algs[alg](word, x, y, table, keyWord);
    };
    AppComponent.placeWordPart = function (word, algs, table, minLength, maxLength) {
        var segmentLength = AppComponent_1.random(minLength, maxLength + 1);
        var segmentStart = AppComponent_1.random(0, word.length - segmentLength + 1);
        var segment = word.substr(segmentStart, segmentLength);
        if (AppComponent_1.placeWord(segment, algs, table, word)) {
            return segment.length;
        }
        return 0;
    };
    AppComponent.findWordInDirection = function (word, xStart, yStart, xDir, yDir, table) {
        if (word.length == 0)
            return false;
        for (var i = 0; i < word.length; i++) {
            var x = xStart + i * xDir;
            var y = yStart + i * yDir;
            if (x < 0 || x >= table.columns || y < 0 || y >= table.rows || table.data[y][x] != word.substr(i, 1))
                return false;
        }
        return true;
    };
    AppComponent.findWord = function (word, x, y, table) {
        var count = 0;
        for (var xDir = -1; xDir <= 1; xDir++) {
            for (var yDir = -1; yDir <= 1; yDir++) {
                if (AppComponent_1.findWordInDirection(word, x, y, xDir, yDir, table)) {
                    count++;
                }
            }
        }
        return count;
    };
    AppComponent.totalWordCount = function (word, table) {
        var count = 0;
        for (var i = 0; i < table.rows; i++) {
            for (var j = 0; j < table.columns; j++) {
                count += AppComponent_1.findWord(word, j, i, table);
            }
        }
        return count;
    };
    AppComponent.prototype.generate = function () {
        this.data.resize(this.height, this.width);
        this.word = this.word.toUpperCase();
        var arrangements = AppComponent_1.listAlgorithms(this.word.length, this.width, this.height);
        for (var i = 0; i < this.retryCount; i++) {
            if (AppComponent_1.placeWord(this.word, arrangements, this.data, '')) {
                break;
            }
        }
        var remaining = this.width * this.height - this.word.length;
        var min = 2;
        var max = this.word.length - 1;
        var attemptMax = this.width * this.height * 100;
        for (var i = 0; i < attemptMax && remaining > 0; i++) {
            remaining -= AppComponent_1.placeWordPart(this.word, arrangements, this.data, min, max);
        }
        for (var i = 0; i < attemptMax && remaining > 0; i++) {
            remaining -= AppComponent_1.placeWordPart(this.word, arrangements, this.data, 1, 1);
        }
        this.count = AppComponent_1.totalWordCount(this.word, this.data);
    };
    var AppComponent_1;
    AppComponent = AppComponent_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! raw-loader!./app.component.html */ "./node_modules/raw-loader/index.js!./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormsModule"]
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\Code\CruelWordSearch\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map