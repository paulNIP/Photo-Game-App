import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';
import { NativeStorage } from '@ionic-native/native-storage';
import { HttpModule } from '@angular/http';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { UploadPage } from '../pages/upload/upload';
import { SignupPage } from '../pages/signup/signup';
import { ImagesPage } from '../pages/images/images';
import { LoginPage } from '../pages/login/login';
import { HeaderMenuComponent } from '../components/header-menu/header-menu';
import { MediaCapture } from '@ionic-native/media-capture';
import { FileChooser } from '@ionic-native/file-chooser';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    UploadPage,
    SignupPage,
    ImagesPage,
    LoginPage,
    HeaderMenuComponent
  ],
  imports: [
    BrowserModule,HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    UploadPage,
    SignupPage,
    ImagesPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,Camera,NativeStorage,FileTransfer, FileTransferObject,MediaCapture, FileChooser,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
