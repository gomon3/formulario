import { Component } from '@angular/core';
import { NavController, ToastController  } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//Plugin
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';

//Providers
import { CargarImgProvider }  from '../../providers/cargar-img/cargar-img';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    datos: FormGroup;

    fotos: any[] = [];

    constructor(public navCtrl: NavController, public formBuilder: FormBuilder,
                private imagePicker: ImagePicker, public toastCtrl: ToastController,
                private cargarimg: CargarImgProvider) {
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

    mostrar_mensaje(msj){
        let toast = this.toastCtrl.create({
            message: msj,
            duration: 3000,
            position: 'buttom'
        });
        toast.present();
    }

    abrirGaleria(){

        let arr = [];
        arr[0] = 'http://lorempixel.com/350/230/';
        arr[1] = 'http://lorempixel.com/500/200/';
        arr[2] = 'http://lorempixel.com/700/200/';

        this.fotos = arr;

        /*let options: ImagePickerOptions = {
            maximumImagesCount: 3
        };

        this.imagePicker.getPictures(options)
            .then((results) => {
                this.fotos = results;
            }, (err) => {
                this.mostrar_mensaje(err);
            });*/

    }

    borrarFoto(index){

        this.fotos.splice(index, 1);

    }

    registrar(){
        if( this.fotos.length < 1 ){
            this.mostrar_mensaje('Debes seleccionar por lo menos una foto');
            return;
        }

        this.cargarimg.getFormulario(this.fotos);
    }

}
