import { ValidatorsService } from './../../../shared/validators/validators.service';
import { nombreApellidoPatern, emailPattern, noPuedeSerIrvinzato } from './../../../shared/validators/validaciones';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  /*RECICLAR CODIGO, MEJOR IMPORTAR DEL PATH DONDE ESTARAN TODAS
  nombreApellidoPatern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

                                //Se imprime en consola "any" y sabemos que es de tipo FormControl
  noPuedeSerIrvinzato( control: FormControl ) {
    //Le pongo la validacion de que exista por que el signo "value?." no me lo lee esta version
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
    
  }*/

  miFormulario: FormGroup = this.fb.group({
    nombre: [ '', [ Validators.required, Validators.pattern(this.validatorsService.nombreApellidoPatern) ] ],
    email: [ '', [ Validators.required, Validators.pattern(this.validatorsService.emailPattern) ] ],
    username: [ '', [ Validators.required, this.validatorsService.noPuedeSerIrvinzato ] ],
    password: [ '', [ Validators.required, Validators.minLength(6) ] ],
    confirmPassword: [ '', [ Validators.required ] ]
  },{ //Mi segunda coma es opcional y es para validaciones extras que quiero hacer con mi formGroup, tengo que ser capas de leer en tiempo real los campos que quiero comparar
    validators: [ this.validatorsService.camposIguales('password', 'confirmPassword') ]
  });

  constructor( private fb: FormBuilder,
               private validatorsService: ValidatorsService ) { }

  ngOnInit() {
    this.miFormulario.reset({
      nombre: 'Irving Rivera',
      email: 'lokillo@hotmail.com',
      username: 'lokillo',
    });
   
  }

  campoNoValido(campo: string) {
    return this.miFormulario.get(campo).invalid
           && this.miFormulario.get(campo).touched;
  }

  submitFormulario() {
    console.log("Mi formulario value es, ", this.miFormulario.value);
    this.miFormulario.markAllAsTouched();
  }

}
