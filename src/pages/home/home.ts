import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//Plugin
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';

//Providers
import { CargarImgProvider }  from '../../providers/cargar-img/cargar-img';
import { ServiceProvider }  from '../../providers/service/service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    datos: FormGroup;
    fotos: any[] = [];

    formulario: FormData;
    loading: any;

    constructor(public navCtrl: NavController, public formBuilder: FormBuilder,
                private imagePicker: ImagePicker, public toastCtrl: ToastController,
                private cargarimg: CargarImgProvider, private serv: ServiceProvider,
                public loadingCtrl: LoadingController, private alertCtrl: AlertController) {
        this.datos = this.formBuilder.group({
            nombre: ['', Validators.required],
            correo: ['', [
                            Validators.required,
                            Validators.email
                        ]
                    ],
            contrasena: ['', [
                                Validators.required,
                                Validators.minLength(6)
                            ]
                        ],
        });
    }

    presentarAlerta(mensaje) {
      let alert = this.alertCtrl.create({
        title: 'El sitio web dice',
        subTitle: mensaje,
        buttons: ['Ok']
      });
      alert.present();
    }


    presentarLoader() {
      this.loading = this.loadingCtrl.create({
        content: 'Registrando...'
      });

      this.loading.present();
    }

    mostrar_mensaje(msj){
        let toast = this.toastCtrl.create({
            message: msj,
            duration: 3000,
            position: 'buttom'
        });
        toast.present();
    }

    abrirGaleria(){

        /*let arr = [];
        arr[0] = 'assets/imgs/Chrysanthemum.jpg';
        arr[1] = 'assets/imgs/Desert.jpg';
        arr[2] = 'assets/imgs/Hydrangeas.jpg';

        this.fotos = arr;
        console.log(this.fotos);*/

        let options: ImagePickerOptions = {
            maximumImagesCount: 3
        };

        this.imagePicker.getPictures(options)
            .then((results) => {
                this.fotos = results;
            }, (err) => {
                this.mostrar_mensaje(err);
            });

    }

    borrarFoto(index){

        this.fotos.splice(index, 1);


    }

    registrar(){



        if( this.fotos.length < 1 ){
            this.mostrar_mensaje('Debes seleccionar por lo menos una foto');
            return;
        }

        this.presentarLoader();

        this.cargarimg.getFormulario(this.fotos)
          .then((result) => {
            this.formulario = result;


            this.formulario.append('nombre', this.datos.get('nombre').value);
            this.formulario.append('correo', this.datos.get('correo').value);
            this.formulario.append('contrasena', this.datos.get('contrasena').value);

            this.serv.addUser(this.formulario)
              .then((result) => {

                if(result['error']){

                  this.presentarAlerta(result['mensaje']);
                }else{

                  //Eliminación de los valores
                  this.datos.get('nombre').setValue('');
                  this.datos.get('correo').setValue('');
                  this.datos.get('contrasena').setValue('');
                  /*------------------------------------------*/
                  this.fotos = [];

                  this.presentarAlerta(result['mensaje']);
                }



                this.loading.dismiss();
              }, err => {


                console.log(err);
                this.loading.dismiss();
              });



          })
          .catch(err =>{
            this.mostrar_mensaje(err);
          });
    }

}
