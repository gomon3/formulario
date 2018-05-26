import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//Plugin
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    datos: FormGroup;

    fotos: any[] = [];

    constructor(public navCtrl: NavController, public formBuilder: FormBuilder,
                private imagePicker: ImagePicker) {
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

    abrirGaleria(){

        let options: ImagePickerOptions = {
            maximumImagesCount: 3
        };

        this.imagePicker.getPictures(options)
            .then((results) => {
                this.fotos = results;

                for (var i = 0; i < results.length; i++) {
                    console.log('Image URI: ' + results[i]);
                }
            }, (err) => { });

    }

    registrar(){

    }

}
