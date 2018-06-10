import { Injectable } from '@angular/core';
import { File, FileEntry } from '@ionic-native/file';
import { Platform } from 'ionic-angular';


@Injectable()
export class CargarImgProvider {

    stack_aux: any[] = [];
    formulario: FormData;

    constructor(private file: File, private platform: Platform) {
      
    }

    /**
     * Este método se encarga de encapsular imágenes en un objeto FormData para el envio por http.
     * @param {array} fotos  Arreglo que contiene los URI de las imágenes seleccionadas por el usuario.
     * @returns {Promise} Retorna un objeto tipo FormData con las imágenes incrustadas listas para ser enviadas via http.
     */
    public getFormulario(fotos: string[]): Promise<any>{
      let promesa = new Promise((resolve, reject) => {
        this.formulario = new FormData();
        this.stack_aux = [];

        if(this.platform.is('cordova')){

          if(this.platform.is('ios')){

            for (let i = 0; i < fotos.length; i++) {

              this.file.resolveLocalFilesystemUrl("file://" + fotos[i])
              .then((entry) =>
                  (<FileEntry>entry).file(file =>  {

                      const reader = new FileReader();

                      reader.onload = (data) => {

                          console.log("Entre");

                          const imgBlob = new Blob([reader.result], { type: file.type });
                          this.formulario.append('foto' + (i+1), imgBlob, file.name);




                          this.stack_aux.push('foto' + (i+1));
                          if(this.stack_aux.length == fotos.length)
                            resolve(this.formulario);



                      };
                      reader.readAsArrayBuffer(file);
              })).catch( err =>{
                      reject(err)
                  })
              .catch( err =>
                  reject(err)
              );
            }

          }

          if(this.platform.is('android')){

            for (let i = 0; i < fotos.length; i++){

                this.file.resolveLocalFilesystemUrl(fotos[i])
                .then((entry) =>
                    (<FileEntry>entry).file(file =>  {
                        const reader = new FileReader();
                        reader.onload = (data) => {


                            console.log("Entre");

                            const imgBlob = new Blob([reader.result], { type: file.type });
                            this.formulario.append('foto' + (i+1), imgBlob, file.name);



                            this.stack_aux.push('foto' + (i+1));
                            if(this.stack_aux.length == fotos.length)
                              resolve(this.formulario)



                        };
                        reader.readAsArrayBuffer(file);
                })).catch( err =>{
                        reject(err)
                    })
                .catch( err =>
                    reject(err)
                );

            }


          }
        }else{
          reject(false);
        }
      });

      return promesa;
    }

}
