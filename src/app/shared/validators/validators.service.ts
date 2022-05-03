import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  public nombreApellidoPatern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern        : string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  //LA VENTAJA DE TENERLO EN SERVICIO ES QUE PUEDO HACER INYECCIONES DE OTROS SERVICIOS O DEPENDENCIAS PARA HACER VALIDACIONES MAS ROBUSTAS
  //ES PREFERIBLE USARLO DE ESTA MANERA POR CUESTIONES DE ROBUSTES, PARA USARLO SOLO ES INYECTAR EL SERVICIO
  constructor() { }

  noPuedeSerIrvinzato( control: FormControl ): ValidationErrors | null {
    if(control.value){  
      const valor: string = control.value.trim().toLowerCase();
      if(valor === 'irvinzato') {
        console.log("ERROR, USUARIO NO VALIDO");
        return {
          noIrvinzato: true
        }
      }
      return null;
    }
  } 

  camposIguales(campo1: string, campo2: string) {
            //Tal cual es la referencia de todo mi objeto o formGrup que defini
    return ( formGroupPass: AbstractControl ): ValidationErrors | null => { //El tipado puede ir para quitar marca en "this.fb.group"
      //console.log("formGroupPass en servicio es - ", formGroupPass);
      const pass1 = formGroupPass.get(campo1).value;
      const pass2 = formGroupPass.get(campo2).value;
      //console.log(pass1, pass2);
      if(pass1 !== pass2){
        formGroupPass.get(campo2).setErrors({ noIguales: true });
        return { noIguales: true }
      }
      formGroupPass.get(campo2).setErrors(null);  //Este setErrors en null quita todos los errores, cuidado si hay mas validaciones
      return null;
    }
  }
  
}
