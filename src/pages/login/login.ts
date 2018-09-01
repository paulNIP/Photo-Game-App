import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { NgForm } from '@angular/forms';
import { Http, Headers, RequestOptions} from '@angular/http';
import { SignupPage } from '../signup/signup';
import { ImagesPage } from '../images/images';
import { Storage } from '@ionic/storage';
import { MenuController } from 'ionic-angular';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  private baseURI     : string  = "http://www.nip-ye.com/";
  login: {username?: string, password?: string} = {};
  submitted = false;
  public response : any ;
  constructor(public navCtrl: NavController, public navParams: NavParams,private nativeStorage: NativeStorage,
              public http:Http,public menuCtrl: MenuController,public toastCtrl: ToastController,public storage: Storage) {
                this.menuCtrl.enable(false, 'myMenu');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  onLogin(form:NgForm){
    this.submitted = true;

    if (form.valid) {

           let headers = new Headers();
           headers.append('Content-Type', 'application/json');
           const requestOptions = new RequestOptions({ headers: headers });
           var data=JSON.stringify({username:this.login.username,password:this.login.password});
          this.http.post("http://www.nip-ye.com/PhotoGameApp/login.php",data)
            .map(res => res.json())
            .subscribe(res => {
              console.log(res);
              if(res=="Sucess"){
                this.storage.set('user', this.login.username);
                this.navCtrl.push(ImagesPage);

              }else if(res=="Failed Check Your Credentials"){
                  this.presentToast("Failed Check Your Credentials")

              }
            }, (err) => {
                this.presentToast("Failed to Signup \n Check Internet Connection");
        });
      
    }

  }

  //sign up
  signUp(){
    this.navCtrl.push(SignupPage);
  }
  //present toast
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }


}
