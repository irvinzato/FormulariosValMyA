import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';

//ESTAS SON LAS VALIDACIONES ASYNCRONAS Y DEPENDEN DE OTRO SERVICIO, EN ESTE CASO DEL "HTTP", por eso las hacemos aqui !!!
//Las validaciones que no dependen del "HTTP" pueden ir en el otro servicio "validator.service"

@Injectable({
  providedIn: 'root'
})                               //Al implementar el AsynValidator marca un error por que debemos satisfacer su interface con "validate"
export class EmailValidatorService implements AsyncValidator {

  constructor( private http: HttpClient ) { }

        //Recibe tal cual el campo que validare
  validate(control: AbstractControl): Observable<ValidationErrors | null> {

    const email = control.value;
    console.log("El email que llego en el servicio es ", email);
    return this.http.get<any[]>(`http://localhost:3000/usuarios?q=${ email }`)
            .pipe(
              //delay(3000), //Simplemente para dar un tiempo antes de la respuesta y ver el status en mi formulario
              map( res => {   //El map simplemente me devuelve mi respuesta en un arreglo
                  console.log("La respuesta del map en el servicio es ", res);
                  return ( res.length === 0 )
                    ? null
                    : { correoTomado: true }
                })
            )

  }




 /*  registerOnValidatorChange?(fn: () => void): void {
    throw new Error('Method not implemented.');
  } */
}
