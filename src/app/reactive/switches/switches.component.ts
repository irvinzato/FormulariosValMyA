import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styleUrls: ['./switches.component.css']
})
export class SwitchesComponent implements OnInit {

  //Formulario que utilizo en el HTML
  miFormulario: FormGroup = this.fb.group({
    genero: [ 'M', Validators.required ],
    notificaciones: [ true, Validators.required ],
    condiciones: [ false, Validators.requiredTrue ] 
  });

  //Objeto que tiene los datos que me interesan pasar o trabajar
  persona = {
    id: 123,
    genero: 'F',
    notificaciones: true
  }

  constructor( private fb: FormBuilder ) { }

  ngOnInit() {

    this.miFormulario.reset({
      ...this.persona,
      condiciones: false
    }); 


  }

  guardar() {

    if(this.miFormulario.invalid){ return; }

    const formValue = this.miFormulario.value;
    delete formValue.condiciones;    

    this.persona = formValue;
    //this.persona.genero = formValue.genero;   
    //this.persona.notificaciones = formValue.notificaciones;

    console.log("formValue tiene ", formValue);
    console.log("objeto persona tine ", this.persona);
  }


}
