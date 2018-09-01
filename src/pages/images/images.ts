import { Component } from '@angular/core';
import { IonicPage, NavController,ToastController , NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {UploadPage} from '../upload/upload';
import { MenuController } from 'ionic-angular';

/**
 * Generated class for the ImagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-images',
  templateUrl: 'images.html',
})
export class ImagesPage {
  images : any;
  private baseURI     : string  = "http://www.nip-ye.com/PhotoGameApp/";

  constructor(public navCtrl: NavController,public toastCtrl: ToastController, 
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public http : Http) {
    this.menuCtrl.enable(true, 'myMenu');
    this.load();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImagesPage');
  }

  //load images from database
  load(){
	  this.http.get('http://www.nip-ye.com/PhotoGameApp/retrieve.php')
	      .map(res => res.json())
	      .subscribe(data =>
	      {
	         this.images = data;
	      });
  }//end of load Images


  //refresh page
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }




  // increase Likes if a user clicks on it
  increaseLikes(image){
          console.log(image);
          console.log(image.title);
          console.log(image.owner);

          let title=image.title;
          let owner=image.owner;

           let headers = new Headers();
           headers.append('Content-Type', 'application/json');
           const requestOptions = new RequestOptions({ headers: headers });
           var data=JSON.stringify({title:title,owner:owner});
           this.http.post("http://www.nip-ye.com/PhotoGameApp/likes.php",data,requestOptions)
              .map(res => res.json())
              .subscribe(res => {
                 if(res=='Photo Liked Reload Page'){
                   this.presentToast(res);


                 }else if(res=="Failed to Like Check your Internet"){
                    this.presentToast("Failed to Like Check your Internet");

                 }
              }, (err) => {
                  this.presentToast("Failed to Like \n Check Internet Connection");
          });

  }

  // increase disLikes if a user clicks on it
  increaseDislikes(image){
        console.log(image);
        console.log(image.title);
        console.log(image.owner);

        let title=image.title;
        let owner=image.owner;

           let headers = new Headers();
           headers.append('Content-Type', 'application/json');
           const requestOptions = new RequestOptions({ headers: headers });
           var data=JSON.stringify({title:title,owner:owner});
           this.http.post("http://www.nip-ye.com/PhotoGameApp/dislikes.php",data,requestOptions)
              .map(res => res.json())
              .subscribe(res => {
                 if(res=="Sucess"){
                   this.presentToast(res);


                 }else if(res=="Failed to Like Check your Internet"){
                    this.presentToast("Failed to Like Check your Internet")

                 }
              }, (err) => {
                  this.presentToast("Failed to Dislike\n Check Internet Connection");
          });


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

  upload(){
    this.navCtrl.push(UploadPage);
  }
}
