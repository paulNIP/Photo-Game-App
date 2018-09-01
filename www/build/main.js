webpackJsonp([3],{

/***/ 106:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UploadPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_file_transfer__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_media_capture__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_file_chooser__ = __webpack_require__(163);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









/**
 * Generated class for the UploadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var UploadPage = /** @class */ (function () {
    function UploadPage(navCtrl, transfer, camera, loadingCtrl, mediaCapture, toastCtrl, storage, menuCtrl, http, fileChooser, alertCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.transfer = transfer;
        this.camera = camera;
        this.loadingCtrl = loadingCtrl;
        this.mediaCapture = mediaCapture;
        this.toastCtrl = toastCtrl;
        this.storage = storage;
        this.menuCtrl = menuCtrl;
        this.http = http;
        this.fileChooser = fileChooser;
        this.alertCtrl = alertCtrl;
        this.upload = {};
        this.submitted = false;
        this.baseURI = "http://www.nip-ye.com/PhotoGameApp/";
        this.menuCtrl.enable(true, 'myMenu');
        storage.get('user').then(function (val) {
            _this.uploader = val;
        });
    }
    UploadPage.prototype.getImage = function () {
        var _this = this;
        var options = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
        };
        this.camera.getPicture(options).then(function (imageData) {
            _this.imageURI = imageData;
        }, function (err) {
            console.log(err);
            _this.presentToast(err);
        });
        //browse file
        //   this.fileChooser.open()
        //  .then(uri =>{
        //   this.imageURI = uri;
        //   console.log(uri)})
        //   .catch(e => console.log(e));
    };
    UploadPage.prototype.uploadFile = function () {
        if (this.imageURI != null) {
            this.presentPrompt();
        }
        else {
            this.presentToast("Take Image for Upload");
        }
    };
    UploadPage.prototype.presentPrompt = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Photo Details',
            inputs: [
                {
                    name: 'title',
                    placeholder: 'Title'
                },
                {
                    name: 'description',
                    placeholder: 'Description',
                    type: 'text'
                },
                {
                    name: 'location',
                    placeholder: 'Location',
                    type: 'text'
                },
                {
                    name: 'category',
                    placeholder: 'People,Nature, City ,Life,Love,Family',
                    type: 'text'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Upload',
                    handler: function (data) {
                        //upload picture
                        console.log(data.title);
                        console.log(data.description);
                        console.log(data.category);
                        console.log(data.location);
                        var title00 = data.title;
                        var description00 = data.description;
                        var category00 = data.category;
                        var location00 = data.location;
                        if (data.title === "" && data.description === "" && data.category === "" && data.location === "") {
                            _this.presentToast("Enter All Fields");
                        }
                        else {
                            var loader_1 = _this.loadingCtrl.create({
                                content: "Uploading..."
                            });
                            loader_1.present();
                            var fileTransfer = _this.transfer.create();
                            var options = {
                                fileKey: 'ionicfile',
                                fileName: _this.imageFileName,
                                chunkedMode: false,
                                mimeType: "image/jpeg",
                                headers: {}
                            };
                            fileTransfer.upload(_this.imageURI, 'http://www.nip-ye.com/PhotoGameApp/' + _this.imageFileName, options)
                                .then(function (data) {
                                console.log(data + " Uploaded Successfully");
                                //insert data into database
                                var headers = new __WEBPACK_IMPORTED_MODULE_5__angular_http__["a" /* Headers */]();
                                headers.append('Content-Type', 'application/json');
                                var photo = _this.baseURI + _this.imageFileName;
                                var requestOptions = new __WEBPACK_IMPORTED_MODULE_5__angular_http__["d" /* RequestOptions */]({ headers: headers });
                                var data00 = JSON.stringify({ title: title00, description: description00, location: location00, owner: _this.uploader, photoUrl: photo });
                                _this.http.post("http://www.nip-ye.com/PhotoGameApp/picturedata.php", data00)
                                    .map(function (res) { return res.json(); })
                                    .subscribe(function (res) {
                                    if (res == "Sucess") {
                                    }
                                    else if (res == "Failed Check Your Credentials") {
                                        _this.presentToast("Failed Check Your Credentials");
                                    }
                                }, function (err) {
                                    _this.presentToast("Failed to Signup \n Check Internet Connection");
                                });
                                _this.imageFileName = 'http://www.nip-ye.com/PhotoGameApp/' + _this.imageFileName;
                                loader_1.dismiss();
                                _this.presentToast("Image uploaded successfully");
                            }, function (err) {
                                console.log(err);
                                loader_1.dismiss();
                                _this.presentToast(err);
                            });
                        } //end of download
                    }
                }
            ]
        });
        alert.present();
    };
    UploadPage.prototype.presentToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 6000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    UploadPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-upload',template:/*ion-inline-start:"/Users/Nipye/Desktop/PhotoGameApp/src/pages/upload/upload.html"*/'<ion-header>\n    <ion-navbar>\n      <ion-buttons start>\n          <button ion-button icon-only menuToggle>\n              <ion-icon name=\'menu\'></ion-icon>\n          </button>\n      </ion-buttons>\n      Upload \n      <ion-buttons end>\n        <button ion-button >\n          <ion-icon name="cloud-upload"></ion-icon>\n        </button>\n      </ion-buttons>\n    </ion-navbar>\n  </ion-header>\n  \n  <ion-content >    \n    <ion-item>\n      <p>{{imageURI}}</p>\n      <button ion-button (click)="getImage();">Take Picture</button>\n    </ion-item>\n    <ion-item>\n      <h4>Preview of Image </h4>\n      <img src="{{imageFileName}}" *ngIf="imageFileName" alt="Ionic File" width="300" />\n    </ion-item>\n    <ion-item>\n        <button ion-button (click)="uploadFile()">Upload</button>\n    </ion-item>\n\n\n  </ion-content>'/*ion-inline-end:"/Users/Nipye/Desktop/PhotoGameApp/src/pages/upload/upload.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_file_transfer__["a" /* FileTransfer */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_media_capture__["a" /* MediaCapture */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_5__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_file_chooser__["a" /* FileChooser */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], UploadPage);
    return UploadPage;
}());

//# sourceMappingURL=upload.js.map

/***/ }),

/***/ 107:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_native_storage__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__signup_signup__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__images_images__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(48);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, navParams, nativeStorage, http, menuCtrl, toastCtrl, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.nativeStorage = nativeStorage;
        this.http = http;
        this.menuCtrl = menuCtrl;
        this.toastCtrl = toastCtrl;
        this.storage = storage;
        this.baseURI = "http://www.nip-ye.com/";
        this.login = {};
        this.submitted = false;
        this.menuCtrl.enable(false, 'myMenu');
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage.prototype.onLogin = function (form) {
        var _this = this;
        this.submitted = true;
        if (form.valid) {
            var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Headers */]();
            headers.append('Content-Type', 'application/json');
            var requestOptions = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["d" /* RequestOptions */]({ headers: headers });
            var data = JSON.stringify({ username: this.login.username, password: this.login.password });
            this.http.post("http://www.nip-ye.com/PhotoGameApp/login.php", data)
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                console.log(res);
                if (res == "Sucess") {
                    _this.storage.set('user', _this.login.username);
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__images_images__["a" /* ImagesPage */]);
                }
                else if (res == "Failed Check Your Credentials") {
                    _this.presentToast("Failed Check Your Credentials");
                }
            }, function (err) {
                _this.presentToast("Failed to Signup \n Check Internet Connection");
            });
        }
    };
    //sign up
    LoginPage.prototype.signUp = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__signup_signup__["a" /* SignupPage */]);
    };
    //present toast
    LoginPage.prototype.presentToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/Users/Nipye/Desktop/PhotoGameApp/src/pages/login/login.html"*/'\n<ion-content>\n    <div class="logo">\n      <img src="assets/img/appicon.svg" alt="Ionic logo">\n    </div>\n  \n    <form #loginForm="ngForm" novalidate>\n      <ion-list no-lines>\n        <ion-item>\n          \n          <ion-input [(ngModel)]="login.username" name="username" type="text" #username="ngModel" spellcheck="false" autocapitalize="of" placeholder="Username or E-mail" required>\n          </ion-input>\n        </ion-item>\n        <p ion-text [hidden]="username.valid || submitted == false" color="danger" padding-left>\n          Username is required\n        </p>\n  \n        <ion-item>\n          <ion-input [(ngModel)]="login.password" name="password" type="password" #password="ngModel" placeholder="Password" required>\n          </ion-input>\n        </ion-item>\n        <p ion-text [hidden]="password.valid || submitted == false" color="danger" padding-left>\n          Password is required\n        </p>\n      </ion-list>\n  \n      <ion-row responsive-sm>\n        <ion-col>\n          <button ion-button (click)="onLogin(loginForm);" type="submit" block>  Login  </button>\n        </ion-col>\n      </ion-row>\n    </form>\n    <button ion-button (click)=\'signUp();\'clear>New Here? SignUp</button>  \n  </ion-content>'/*ion-inline-end:"/Users/Nipye/Desktop/PhotoGameApp/src/pages/login/login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_native_storage__["a" /* NativeStorage */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* MenuController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */], __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 116:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 116;

/***/ }),

/***/ 158:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/images/images.module": [
		284,
		2
	],
	"../pages/login/login.module": [
		285,
		1
	],
	"../pages/upload/upload.module": [
		286,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 158;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 206:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(229);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 229:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_camera__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_native_storage__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_http__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_file_transfer__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_storage__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__app_component__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_home_home__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_upload_upload__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_signup_signup__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_images_images__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_login_login__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__components_header_menu_header_menu__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_media_capture__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_file_chooser__ = __webpack_require__(163);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_10__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_11__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_upload_upload__["a" /* UploadPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_images_images__["a" /* ImagesPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_16__components_header_menu_header_menu__["a" /* HeaderMenuComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */], __WEBPACK_IMPORTED_MODULE_7__angular_http__["c" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_10__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/images/images.module#ImagesPageModule', name: 'ImagesPage', segment: 'images', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/upload/upload.module#UploadPageModule', name: 'UploadPage', segment: 'upload', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_9__ionic_storage__["a" /* IonicStorageModule */].forRoot()
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_10__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_11__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_upload_upload__["a" /* UploadPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_images_images__["a" /* ImagesPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_login_login__["a" /* LoginPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_native_storage__["a" /* NativeStorage */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_file_transfer__["a" /* FileTransfer */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_file_transfer__["b" /* FileTransferObject */], __WEBPACK_IMPORTED_MODULE_17__ionic_native_media_capture__["a" /* MediaCapture */], __WEBPACK_IMPORTED_MODULE_18__ionic_native_file_chooser__["a" /* FileChooser */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 282:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(49);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/Nipye/Desktop/PhotoGameApp/src/app/app.html"*/'<ion-menu id="myMenu" [content]="content">\n        <ion-header>\n          <ion-toolbar>\n            <ion-title>\n            Menu\n            </ion-title>\n          </ion-toolbar>\n        </ion-header>\n        <ion-content>\n           <header-menu></header-menu>\n        </ion-content>\n      </ion-menu>\n<ion-nav [root]="rootPage" #content></ion-nav>\n\n\n'/*ion-inline-end:"/Users/Nipye/Desktop/PhotoGameApp/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 283:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeaderMenuComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_home_home__ = __webpack_require__(49);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the HeaderMenuComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var HeaderMenuComponent = /** @class */ (function () {
    function HeaderMenuComponent(menuCtrl, app) {
        this.menuCtrl = menuCtrl;
        this.app = app;
        console.log('Hello HeaderMenuComponent Component');
        this.text = 'Hello World';
    }
    HeaderMenuComponent.prototype.logoutClicked = function () {
        console.log("Logout");
        this.menuCtrl.close();
        var nav = this.app.getRootNav();
        nav.setRoot(__WEBPACK_IMPORTED_MODULE_2__pages_home_home__["a" /* HomePage */]);
    };
    HeaderMenuComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'header-menu',template:/*ion-inline-start:"/Users/Nipye/Desktop/PhotoGameApp/src/components/header-menu/header-menu.html"*/'<!-- Generated template for the HeaderMenuComponent component -->\n<div>\n    <ion-list>\n      <ion-list-header>\n        Settings\n      </ion-list-header>\n      <ion-list>\n        <ion-item (click)="logoutClicked()">Logout</ion-item>\n      </ion-list>\n    </ion-list>\n  </div>\n'/*ion-inline-end:"/Users/Nipye/Desktop/PhotoGameApp/src/components/header-menu/header-menu.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */]])
    ], HeaderMenuComponent);
    return HeaderMenuComponent;
}());

//# sourceMappingURL=header-menu.js.map

/***/ }),

/***/ 49:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__signup_signup__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(107);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, menuCtrl) {
        this.navCtrl = navCtrl;
        this.menuCtrl = menuCtrl;
        this.menuCtrl.enable(false, 'myMenu');
    }
    HomePage.prototype.signIn = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
    };
    HomePage.prototype.signUp = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__signup_signup__["a" /* SignupPage */]);
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/Nipye/Desktop/PhotoGameApp/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Ionic Blank\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  Paul Otim Mini Project\n  <p>\n   Welcome to the PhotoGame App Where You can Upload A picture, Like It and View Most Liked Photos\n  </p>\n  <button ion-button (click)="signIn()" clear>Sign In</button>\n  <button ion-button (click)="signUp()" clear>New Here? Sign Up</button>\n</ion-content>\n'/*ion-inline-end:"/Users/Nipye/Desktop/PhotoGameApp/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* MenuController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 54:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ImagesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(254);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__upload_upload__ = __webpack_require__(106);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the ImagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ImagesPage = /** @class */ (function () {
    function ImagesPage(navCtrl, toastCtrl, navParams, menuCtrl, http) {
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.navParams = navParams;
        this.menuCtrl = menuCtrl;
        this.http = http;
        this.baseURI = "http://www.nip-ye.com/PhotoGameApp/";
        this.menuCtrl.enable(true, 'myMenu');
        this.load();
    }
    ImagesPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ImagesPage');
    };
    //load images from database
    ImagesPage.prototype.load = function () {
        var _this = this;
        this.http.get('http://www.nip-ye.com/PhotoGameApp/retrieve.php')
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            _this.images = data;
        });
    }; //end of load Images
    //refresh page
    ImagesPage.prototype.doRefresh = function (refresher) {
        console.log('Begin async operation', refresher);
        setTimeout(function () {
            console.log('Async operation has ended');
            refresher.complete();
        }, 2000);
    };
    // increase Likes if a user clicks on it
    ImagesPage.prototype.increaseLikes = function (image) {
        var _this = this;
        console.log(image);
        console.log(image.title);
        console.log(image.owner);
        var title = image.title;
        var owner = image.owner;
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        var requestOptions = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({ headers: headers });
        var data = JSON.stringify({ title: title, owner: owner });
        this.http.post("http://www.nip-ye.com/PhotoGameApp/likes.php", data, requestOptions)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            if (res == 'Photo Liked Reload Page') {
                _this.presentToast(res);
            }
            else if (res == "Failed to Like Check your Internet") {
                _this.presentToast("Failed to Like Check your Internet");
            }
        }, function (err) {
            _this.presentToast("Failed to Like \n Check Internet Connection");
        });
    };
    // increase disLikes if a user clicks on it
    ImagesPage.prototype.increaseDislikes = function (image) {
        var _this = this;
        console.log(image);
        console.log(image.title);
        console.log(image.owner);
        var title = image.title;
        var owner = image.owner;
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        var requestOptions = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({ headers: headers });
        var data = JSON.stringify({ title: title, owner: owner });
        this.http.post("http://www.nip-ye.com/PhotoGameApp/dislikes.php", data, requestOptions)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            if (res == "Sucess") {
                _this.presentToast(res);
            }
            else if (res == "Failed to Like Check your Internet") {
                _this.presentToast("Failed to Like Check your Internet");
            }
        }, function (err) {
            _this.presentToast("Failed to Dislike\n Check Internet Connection");
        });
    };
    //Method for presenting toast
    ImagesPage.prototype.presentToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    ImagesPage.prototype.upload = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__upload_upload__["a" /* UploadPage */]);
    };
    ImagesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-images',template:/*ion-inline-start:"/Users/Nipye/Desktop/PhotoGameApp/src/pages/images/images.html"*/'<!--\n  Generated template for the ImagesPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n    <ion-navbar>\n      <ion-buttons start>\n          <button ion-button icon-only menuToggle>\n              <ion-icon name=\'menu\'></ion-icon>\n          </button>\n      </ion-buttons>\n      Upload New image\n      <ion-buttons end>\n        <button ion-button (click)="upload()">\n          <ion-icon name="cloud-upload"></ion-icon>\n        </button>\n      </ion-buttons>\n    </ion-navbar>\n  </ion-header>\n\n\n<ion-content >\n\n<ion-card *ngFor="let image of images">\n  <ion-item>\n    <ion-avatar item-start>\n      <img src="http://www.nip-ye.com/PhotoGameApp/Profile.png">\n    </ion-avatar>\n    <h2>{{image.owner}}</h2>\n    <p>{{image.title}}</p>\n  </ion-item>\n\n  <img src="{{image.photoUrl}}">\n\n  <ion-card-content>\n    <p>{{image.category}}</p>\n    <p>{{image.description}}</p>\n  </ion-card-content>\n\n  <ion-row>\n    <ion-col>\n      <button ion-button (click)="increaseLikes(image)"  icon-only clear small>\n        <ion-icon name="thumbs-up"></ion-icon>\n        <div>{{image.likes}} Likes</div>\n      </button>\n    </ion-col>\n    <ion-col>\n      <button ion-button (click)="increaseDislikes(image)"  icon-only clear small>\n        <ion-icon name="thumbs-down"></ion-icon>\n        <div>{{image.dislikes}} Dislikes</div>\n      </button>\n\n    </ion-col>\n    <ion-col center text-center>\n    </ion-col>\n  </ion-row>\n\n</ion-card>\n</ion-content>\n'/*ion-inline-end:"/Users/Nipye/Desktop/PhotoGameApp/src/pages/images/images.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */]])
    ], ImagesPage);
    return ImagesPage;
}());

//# sourceMappingURL=images.js.map

/***/ }),

/***/ 84:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__images_images__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(48);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var SignupPage = /** @class */ (function () {
    function SignupPage(navCtrl, toastCtrl, storage, http, menuCtrl) {
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.storage = storage;
        this.http = http;
        this.menuCtrl = menuCtrl;
        this.baseURI = "http://www.nip-ye.com/PhotoGameApp/";
        this.signup = {};
        this.submitted = false;
        this.menuCtrl.enable(false, 'myMenu');
    }
    SignupPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SignupPage');
    };
    SignupPage.prototype.onSignup = function (form) {
        var _this = this;
        this.submitted = true;
        if (form.valid) {
            //compare passwords
            if (this.signup.password == this.signup.passwordconfirm) {
                var photoUrl = "http://www.nip-ye.com/PhotoGameApp/Profile.png";
                var data = JSON.stringify({ firstname: this.signup.firstname, lastname: this.signup.lastname, username: this.signup.username,
                    gender: this.signup.gender, photourl: photoUrl, contact: this.signup.contact, email: this.signup.email, password: this.signup.password });
                var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
                headers.append('Content-Type', 'application/json');
                var requestOptions = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({ headers: headers });
                this.http.post("http://www.nip-ye.com/PhotoGameApp/register.php", data)
                    .map(function (res) { return res.json(); })
                    .subscribe(function (res) {
                    if (res == "Sucessfully Registered") {
                        _this.storage.set('user', _this.signup.username);
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__images_images__["a" /* ImagesPage */]);
                    }
                    else if (res == "User Name Already Taken") {
                        _this.presentToast("User Name Already Taken");
                    }
                }, function (err) {
                    _this.presentToast("Failed to Signup \n Check Internet Connection");
                });
            }
            else {
                //present toast
                this.presentToast("Passwords Do not Match");
            }
        }
    };
    SignupPage.prototype.login = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */]);
    };
    //Method for presenting toast
    SignupPage.prototype.presentToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    SignupPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-signup',template:/*ion-inline-start:"/Users/Nipye/Desktop/PhotoGameApp/src/pages/signup/signup.html"*/'<!--\n  Generated template for the SignupPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Create an Account</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="home-page">\n  <form #signupForm="ngForm" novalidate>\n    <ion-list no-lines>\n      <ion-item>\n        <ion-input [(ngModel)]="signup.firstname" name="firstname" type="text" #firstname="ngModel" placeholder="First Name" required>\n        </ion-input>\n      </ion-item>\n      <p ion-text [hidden]="username.valid || submitted == false" color="danger" padding-left>\n        First Name is required\n      </p>\n\n      <ion-item>\n        <ion-input [(ngModel)]="signup.lastname" name="lastname" type="text" #lastname="ngModel" placeholder="Last Name" required>\n        </ion-input>\n      </ion-item>\n      <p ion-text [hidden]="password.valid || submitted == false" color="danger" padding-left>\n        Last Name is required\n      </p>\n      <ion-item>\n        <ion-input [(ngModel)]="signup.username" name="username" type="text" #username="ngModel" placeholder="UserName" required>\n        </ion-input>\n      </ion-item>\n      <p ion-text [hidden]="password.valid || submitted == false" color="danger" padding-left>\n        User Name is required\n      </p>\n      <ion-item>\n        <ion-label>Gender</ion-label>\n        <ion-select [(ngModel)]="signup.gender" name="gender" #gender="ngModel">\n               \n                <ion-option value="">Selcect Gender</ion-option>\n                <ion-option value="Male"> Male</ion-option>\n                <ion-option value="Female">Female</ion-option>\n            </ion-select>\n      </ion-item>\n      <p ion-text [hidden]="password.valid || submitted == false" color="danger" padding-left>\n        Select Gender\n      </p>\n      <ion-item>\n          //select field Required\n          <ion-select [(ngModel)]="signup.code" name="code" #code="ngModel">\n                <ion-option value="+256">+256</ion-option>\n                <ion-option value="+243"> +243</ion-option>\n                <ion-option value="+257"> +257 </ion-option>\n                </ion-select>\n        <ion-input [(ngModel)]="signup.contact" name="contact" type="text" #contact="ngModel" placeholder="Phone Number" required>\n        </ion-input>\n      </ion-item>\n      <p ion-text [hidden]="password.valid || submitted == false" color="danger" padding-left>\n        Contact is required\n      </p>\n      <ion-item>\n        <ion-input [(ngModel)]="signup.email" name="email" type="text" #email="ngModel" placeholder="E-mail Address" required>\n        </ion-input>\n      </ion-item>\n      <p ion-text [hidden]="username.valid || submitted == false" color="danger" padding-left>\n        E-mail  is required\n      </p>\n      <ion-item>\n        <ion-input [(ngModel)]="signup.password" name="password" type="password" #password="ngModel" placeholder="Password (Minimum 6 Characters)" required>\n        </ion-input>\n      </ion-item>\n      <p ion-text [hidden]="username.valid || submitted == false" color="danger" padding-left>\n        Password is required\n      </p>\n      <ion-item>\n        <ion-input [(ngModel)]="signup.passwordconfirm" name="passwordconfirm" type="password" #passwordconfirm="ngModel" placeholder="Confirm Password" required>\n        </ion-input>\n      </ion-item>\n      <p ion-text [hidden]="username.valid || submitted == false" color="danger" padding-left>\n        Please Confirm Password\n      </p>\n\n\n    </ion-list>\n\n    <div padding>\n      <button ion-button (click)="onSignup(signupForm)" type="submit" block>Create Account</button>\n    </div>\n    <div padding>\n      <button ion-button (click)="login()" type="submit" block>Already A Member? Login</button>\n    </div>\n  </form>\n\n'/*ion-inline-end:"/Users/Nipye/Desktop/PhotoGameApp/src/pages/signup/signup.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* MenuController */]])
    ], SignupPage);
    return SignupPage;
}());

//# sourceMappingURL=signup.js.map

/***/ })

},[206]);
//# sourceMappingURL=main.js.map