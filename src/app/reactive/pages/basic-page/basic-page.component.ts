//* Angular ofrece ya los validadores para los formularios. Para evitar tener que desarrollar la logica de los mismos. Para eso importamos "Validators"



import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


const lampara = {
  name: 'lampara',
  price: 2000,
  inStorage: 12
}



@Component({
  selector: 'app-basic-page',
  templateUrl: './basic-page.component.html',
  styles: [
  ]
})
export class BasicPageComponent  implements OnInit{

  //* creacion de un formulario reactivo de forma tradicional

  // public myForm: FormGroup = new FormGroup({
  //   name: new FormControl('', [], []),
  //   price: new FormControl(0),
  //   inStorage: new FormControl(0),

  //   // (valor por defecto, validaciones sincronas, validaciones asincronas). Si no tiene validaciones solo se pone el valor por defecto
  // })


  //* para construir este mismo formulario pero con el Form FormBuilder, inyectamos el servicio formBuilder

  constructor( private fb: FormBuilder){ }

  public myForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required, Validators.minLength(3)]],  //requerido y un minimo de 3 caracteres
    price: [0, [ Validators.required, Validators.min(0)]],
    inStorage: [0,[ Validators.required, Validators.min(0)]]
  })
  
  ngOnInit(): void {

    //  this.myForm.reset({ price: 0, inStorage: 0}) //* establecer valores del form al cargar la pagina

    //  this.myForm.reset(lampara) //* podemos recibir los valores a traves de un objeto. Podría ser el backend quien me lo mande
  }


  isValidField( field: string ): boolean | null {

    return this.myForm.controls[field].errors         //* errors me devuelve un objeto con los errores en las validaciones del formulario. Si no tiene errores, me devuelve null

            && this.myForm.controls[field].touched;
  }

  getFieldError( field: string ): string | null{

    if ( !this.myForm.controls[field] ) return null;

    const errors = this.myForm.controls[field].errors || {};

    // este for me va a dar todas las llaves (errores) que  estan en errors. Y segun el error, lo muestra
    for (const key of Object.keys(errors)) {
      switch( key ) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Minimo ${ errors['minlength'].requiredLength } caracters.`;
      }
    }
    return null;
  }


  onSave():void {

    if ( this.myForm.invalid ) {

      this.myForm.markAllAsTouched();   //* marca todos los campos como que fueron tocados. Es interesante para que al apretar el boton guardar, se muestren los errores de las validaciones.

      return;

    }

    console.log(this.myForm.value)

    this.myForm.reset({ price: 0, inStorage: 0});

    //* el reset sirve para re-establecer el formulario original luego de haber hecho las acciones necesarios al hacer el submit. Permite recibir un objeto para establecer valores al resetear el formulario que esta compuesto de las propiedades que tiene el form.
  }


}
