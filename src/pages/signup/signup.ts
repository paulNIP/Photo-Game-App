import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import {NgForm} from '@angular/forms';
import {Http,RequestOptions,Headers} from '@angular/http';
import {ImagesPage} from '../images/images';
import {HomePage} from '../home/home';
import { Storage } from '@ionic/storage';
import { MenuController } from 'ionic-angular';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  private baseURI     : string  = "http://www.nip-ye.com/PhotoGameApp/";
  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signup: {firstname?: string, lastname?: string,username?: string, gender?: string,
           code?: string,contact?: string, email?:string, password?: string,passwordconfirm?: string} = {};
  submitted = false;

  constructor(public navCtrl: NavController,public toastCtrl: ToastController,
              private storage: Storage, public http: Http,public menuCtrl: MenuController) {
                this.menuCtrl.enable(false, 'myMenu');

  }

  onSignup(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      //compare passwords
      if(this.signup.password==this.signup.passwordconfirm){
            var photoUrl="http://www.nip-ye.com/PhotoGameApp/Profile.png";
            var data=JSON.stringify({firstname:this.signup.firstname,lastname:this.signup.lastname,username:this.signup.username,
                    gender:this.signup.gender,photourl:photoUrl,contact:this.signup.contact,email:this.signup.email,password:this.signup.password});
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const requestOptions = new RequestOptions({ headers: headers });

        this.http.post("http://www.nip-ye.com/PhotoGameApp/register.php",data)
            .map(res => res.json())
            .subscribe(res => {
              if(res=="Sucessfully Registered"){
                this.storage.set('user', this.signup.username);
                this.navCtrl.push(ImagesPage);

              }else if(res=="User Name Already Taken"){
                  this.presentToast("User Name Already Taken")

              }
            }, (err) => {
                this.presentToast("Failed to Signup \n Check Internet Connection");
        });

      
      }else{
        //present toast
        this.presentToast("Passwords Do not Match");
      }

    }
  }

  login(){
   this.navCtrl.push(HomePage);
  }

  //Method for presenting toast
  presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
        });
      toast.present();
    }
}
