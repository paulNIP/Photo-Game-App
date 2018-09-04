import { Component } from '@angular/core';
import { IonicPage, NavController,ToastController,LoadingController,AlertController } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Storage } from '@ionic/storage';
import { Http, Headers, RequestOptions} from '@angular/http';
import { MenuController } from 'ionic-angular';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture';
import { FileChooser } from '@ionic-native/file-chooser';

/**
 * Generated class for the UploadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
})

export class UploadPage {
  imageURI:any;
  imageFileName:any;
  uploader:any;
  upload: {title?: string, description?: string,location?: string} = {};
  submitted = false;
  private baseURI     : string  = "http://www.nip-ye.com/PhotoGameApp/";


  constructor(public navCtrl: NavController,
    private transfer: FileTransfer,
    public  camera: Camera,
    public loadingCtrl: LoadingController,
    private mediaCapture: MediaCapture,
    public toastCtrl: ToastController,
    private storage: Storage,
    public menuCtrl: MenuController,
    public http:Http,private fileChooser: FileChooser,
    private alertCtrl: AlertController) {
      this.menuCtrl.enable(true, 'myMenu');
      storage.get('user').then((val) => {
        this.uploader= val;
      });

    }

  getImage() {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.camera.getPicture(options).then((imageData) => {
      this.imageURI = imageData;
    }, (err) => {
      console.log(err);
      this.presentToast(err);
    });

    //browse file
  //   this.fileChooser.open()
  //  .then(uri =>{
  //   this.imageURI = uri;
  //   console.log(uri)})
  //   .catch(e => console.log(e));

  }

  uploadFile() {
   if(this.imageURI!=null){
     this.presentPrompt();
   }else{
     this.presentToast("Take Image for Upload");
   }


  }
  presentPrompt() { 
      let alert = this.alertCtrl.create({
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
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Upload',
            handler: data => {
              //upload picture
              
              console.log(data.title);
              console.log(data.description);
              console.log(data.category);
              console.log(data.location);

              let title00=data.title;
              let description00=data.description;
              let category00=data.category;
              let location00=data.location;
              if(data.title===""&&data.description===""&&data.category===""&&data.location===""){
                this.presentToast("Enter All Fields");
              }else{      
                  let loader = this.loadingCtrl.create({
                    content: "Uploading..."
                  });
                  loader.present();
                  const fileTransfer: FileTransferObject = this.transfer.create();
              
                  let options: FileUploadOptions = {
                    fileKey: 'ionicfile',
                    fileName: this.imageFileName,
                    chunkedMode: false,
                    mimeType: "image/jpeg",
                    headers: {}
                  }
              
                  fileTransfer.upload(this.imageURI, 'http://www.nip-ye.com/PhotoGameApp/pictureupload.php', options)
                    .then((data) => {
                    console.log(data+" Uploaded Successfully");
                    //insert data into database
                    let headers = new Headers();
                    headers.append('Content-Type', 'application/json');
                    var photo=this.baseURI+ this.imageFileName;
                    const requestOptions = new RequestOptions({ headers: headers });
                    var data00=JSON.stringify({title:title00,description:description00,location:location00,owner:this.uploader,photoUrl:photo});
                    this.http.post("http://www.nip-ye.com/PhotoGameApp/picturedata.php",data00)
                    .map(res => res.json())
                    .subscribe(res => {
                      if(res=="Sucess"){
            
                      }else if(res=="Failed Check Your Credentials"){
                          this.presentToast("Failed Check Your Credentials")
            
                      }
                    }, (err) => {
                        this.presentToast("Failed to Signup \n Check Internet Connection");
                });
            
                    this.imageFileName = 'http://www.nip-ye.com/PhotoGameApp/'+this.imageFileName;
                    loader.dismiss();
                    this.presentToast("Image uploaded successfully");
            
                    
                  }, (err) => {
                    console.log(err);
                    loader.dismiss();
                    this.presentToast(err);
                  });
            
              }//end of download
              
  
            }
          }
        ]
      });
      alert.present();
    
  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 6000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }



}
