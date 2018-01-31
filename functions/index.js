(function(e, a) { for(var i in a) e[i] = a[i]; }(this, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("firebase-functions");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("firebase-admin");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = {
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    // origin: API_URL,
    preflightContinue: false,
    origin: true
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const functions = __webpack_require__(0);
const admin = __webpack_require__(1);
const getData = __webpack_require__(5);
const updateData = __webpack_require__(6);
const credentials = __webpack_require__(7);
admin.initializeApp(functions.config().firebase);
// admin.initializeApp({
//     databaseURL: "https://xerkitfirebasefunction.firebaseio.com",
//     credential: admin.credential.cert(credentials)
// })
exports.getDataListener = getData.listener;
exports.updateDataListener = updateData.listener;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = __webpack_require__(0);
const admin = __webpack_require__(1);
const cors = __webpack_require__(2);
const cors_1 = __webpack_require__(3);
exports.listener = functions.https.onRequest((request, response) => {
    let todoRef = admin.database().ref('todo');
    let corFn = cors(cors_1.corsOptions); //Add CORS Options
    corFn(request, response, () => __awaiter(this, void 0, void 0, function* () {
        let id = request.query.id; //Get query parameter
        let snap;
        // console.log(request.query);
        /*
        if (id) { //if naay ID fetch 1 data
            snap = await todoRef.child(id).once("value"); //Wait for the data
        } else { // fetch all
            snap = await todoRef.once("value");
        }*/
        //Shortchut
        snap = yield todoRef.child((id || "/")).once("value");
        let todo = snap.val(); //Extract data from firebase data snapshot
        if (!todo) {
            return response.status(404).send("Todo not found");
        }
        if (id) {
            todo.id = snap.key;
        }
        response.status(200).json(todo);
    }));
});


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = __webpack_require__(0);
const admin = __webpack_require__(1);
const cors = __webpack_require__(2);
const cors_1 = __webpack_require__(3);
exports.listener = functions.https.onRequest((request, response) => {
    let todoRef = admin.database().ref("todo");
    let corsFn = cors(cors_1.corsOptions);
    corsFn(request, response, () => __awaiter(this, void 0, void 0, function* () {
        let id = request.body.id;
        let data = request.body;
        delete data.id;
        let snap = yield todoRef.child(id).once("value");
        let todoValue = snap.val();
        // todoValue = Object.assign(todoValue, data);
        todoValue = Object.assign({}, todoValue, data);
        yield todoRef.child(id).set(todoValue);
        response.status(200).json(todoValue);
    }));
});


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = {"type":"service_account","project_id":"xerkitfirebasefunction","private_key_id":"682db7dd0e6909f910795303495860d8188b6086","private_key":"-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC3ts4Vy6GQ9HsL\nydjRjQacaKtI+8sw4CiS3lC12IdPFT4dPQGv6fhTqq5JWcQtp3VAh/xT6ycMvohq\njjdXTQgVNH4/qNl66N61DayE+7bklv7DG08Wm7h9o/KvcGMZnGKV0hDt1jWKDQKU\nHVVU5u8L3wKVGru6kzC3ZfhiEBYNmoONQgqWQHGTKMy6gC1ScntqIFRzStOyIrOd\nLgI0M/AZGTtXQ+Tn3D7A7lGD3N0Lvrot7LuYt6Er/k+FRcpFNXKFDIFI79VYr7or\ncmlCx9eLhlVmpywk0axVUzW/zwFiWffBip+JuTS87J+EYAEYg+K4ABGqZlCGpbHl\nPewa3Qa1AgMBAAECggEAM77yWlJCfl1WgTIH97I0z/5tbH+7slcZJpEnA6lrJ1vQ\n5JRn8sBAuXREZhW6O6/Ex3nmGU8NbzoFm5nWPalNYwennc+1/jg0bqPc2ZI66DUd\nqh/5jWEsPHte4oqR50dUv2VtbkhdSTaz6LtAa0smvt3AUPY4NWu7F5VJunlUdNz6\nuCoWq6bRbrc3zQVDexBzlmta9N2yljgkTiz44b9tdn8wsuJZ/8ILN0Wr5Tsog6An\n1n5/bf91Jd4Rlh4CteAdBrK27Dsu/7rpzLQ8moytTDpo3x2BDYhJKUH4T9znqSFN\n4tvvFoOyBmGZRXYphqbIE7vTUZMYhmn40SOKn/Ng+wKBgQD7h0Kc+tGOJ81iPbWv\n3rIzjm3LdUrZR9r3t9m1kDryCpNGAxNX6mFVFoO4dzjGh3mbwWDFBub+xs33dpa6\nWdmYKF+52AUM2I1q7Y95/Eh2UR9oVnykJs2Vj8rZq4Tf4/qoTM/fp7ZGHhCeTa2c\nv6UL9t5E1NAbt86XIpUh4Sr1ewKBgQC6+umtnMyhGCABHtqVhdYPABhkTsewFTBP\na9qZJDGV6h/CxzuK/BQvN5301l+8MjPcQbsffqTNSPwfuN9+CNE6U1vtAPxEj0eA\n7gv3Ze7R37cMVCLKWd/M1SyV/sNb/wOiacwCXiKEMeb1YFZHkr7Aa2LlkA2DVF7H\n5XhxFm+FjwKBgQDQA3mUh118mfAh2fUC4EIxnw2wIG1pKiKtkO9MV15YQ2SuluaN\nY3lhPABtMrPSg8GPjSpxZxbsBw/ZIsrejGYGjwUzlbH/gKvbjWGFuZ1XtBksWbI0\nsx58HPHeeBmoa0slmnijd3innj+SG52Dr35YWa5R8Em3UphYpzH8VdIINwKBgFJ4\nXR0wLalYJLWZ0Dtm/pU7K4cCoFzv25EMNyyYpC5FR6D3kzGoIZb55veYnj05v1oE\nu+4WQ8YvzNSJDDpg1TfukHsmlh3/PECHvktucDmtfOU5LuclYOrNk47NAYnQHuBB\n3bOlpX+9KutLhIKpHO1t7/7k3LDyQ6PTeJ4YkTPNAoGAZD252B+UdNJTQMkJAetn\nIFoYX00NnHVX8z2cjTTuwiGhwlFu2hEDJQ9RZaYByHd/Ot6LYR/v35MfaS7s/Xz4\nsSLRcHMlVlpBOIMXJV+9xSKIfIpj9g+uCmvi/k6f/lmBlCin8Cdf43j2uFgTeGWA\nAJONpYGHLE1AuB3tIzxTu9k=\n-----END PRIVATE KEY-----\n","client_email":"firebase-adminsdk-qpfg9@xerkitfirebasefunction.iam.gserviceaccount.com","client_id":"118345892589276076072","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://accounts.google.com/o/oauth2/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-qpfg9%40xerkitfirebasefunction.iam.gserviceaccount.com"}

/***/ })
/******/ ])));