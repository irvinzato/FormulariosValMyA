import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styleUrls: ['./basicos.component.css']
})
export class BasicosComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    nombreProducto: [ , [ Validators.required, Validators.minLength(3) ] ],
    precio        : [ , [ Validators.required, Validators.min(0) ] ],
    existencias   : [ , [ Validators.required, Validators.min(0) ]]
  })

              
  constructor( private fb: FormBuilder ) { }

  ngOnInit() {

    this.miFormulario.reset({  //Por eso mejor ocupo reset, aqui puedo poner los que quiera
      nombreProducto: 'RTW ASDS',   
      precio: 1200
    })
  }

  campoNoValido(campo: string) {
    return this.miFormulario.controls[campo].errors
          && this.miFormulario.controls[campo].touched;
  }

  guardar() {

    if(this.miFormulario.invalid){  
      this.miFormulario.markAllAsTouched();   
      return;
    }
    console.log("Mi Formulario value es ", this.miFormulario.value);
    this.miFormulario.reset();       
  }

}
