import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';


import { SignupPage } from '../signup/signup';
import { ImagesPage } from '../images/images';
import {LoginPage} from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,public menuCtrl: MenuController) {
    this.menuCtrl.enable(false, 'myMenu');

  }

  signIn(){
    this.navCtrl.push(LoginPage);

  }
  signUp(){
    this.navCtrl.push(SignupPage);
    
  }

}
