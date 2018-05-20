import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    datos: FormGroup;

    constructor(public navCtrl: NavController, public formBuilder: FormBuilder) {
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

    registrar(){
        console.log("Hola Mundo");
    }

}
