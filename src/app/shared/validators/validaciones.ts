import { FormControl } from '@angular/forms';
//Podemos utilizar esta carpeta con todas las validaciones que podemos volver a utilizar en cualquier
//otro modulo,de esta manera no copiamos y pegamos algo que ya hicimos, tendremos todo ordenado
//FUNCIONA PARA VALIDACIONES CENSILLAS, QUE NO DEPENDAN DE MAS COSAS



//Expresiones regulares
export const nombreApellidoPatern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
export const emailPattern        : string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

//Transformo mi metodo a una funcion flecha para que funcione
export const noPuedeSerIrvinzato = ( control: FormControl ) => {
   
    if(control.value){  
      const valor: string = control.value.trim().toLowerCase();
      //console.log(valor);
      if(valor === 'irvinzato') {
        console.log("ERROR, USUARIO NO VALIDO");
        return {
          noIrvinzato: true
        }
      }
      return null;
    }
    
  }
