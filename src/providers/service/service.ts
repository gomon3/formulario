import { Http } from '@angular/http';
import { Injectable } from '@angular/core';


@Injectable()
export class ServiceProvider {

  dominio: string = 'http://192.168.0.10/ionic/insertar.php';


  constructor(public http: Http) {


  }

  public addUser(data:FormData){

    return new Promise((resolve, reject) => {

      this.http.post(this.dominio, data).subscribe(resp => {



        resolve(resp.json());
      }, err =>{

        reject(err.json());
      });

    });

  }

}
