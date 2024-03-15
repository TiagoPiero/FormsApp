//* La idea de este servicio es que nos ayude a centralizar todas nuestra validaciones.
//* En cada funcion de validacion, se busca retornar un objeto para el caso de que haya error, o NULL en el caso de no haber errores.
//* Como se si una validacion es sincrona o asincrona? Una validacion asincrona se da por ejemplo cuando esta amarrada a un observable (la validacion me retorna un observable), o una promesa.

import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({providedIn: 'root'})
export class ValidatorsService {

  constructor() { }

  public  firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  public cantBeStrider = ( control: FormControl ): ValidationErrors | null => {

    const value: string = control.value.trim().toLowerCase()

    if ( value === 'strider') {
      return {
        noStrider: true
      }
    }

    return null;
  }

  isValidField( form: FormGroup, field: string ): boolean | null {

    return form.controls[field].errors && form.controls[field].touched;

  }


  isFieldOneEqualFieldTwo( field1: string, field2: string){

    return ( formGroup: AbstractControl ): ValidationErrors | null => {

      //obtenemos los dos valores de la caja de texto
      const fieldValue1 = formGroup.get(field1)?.value;
      const fieldValue2 = formGroup.get(field2)?.value;

      if ( fieldValue1 !== fieldValue2 ) {
        formGroup.get(field2)?.setErrors({ notEqual: true })
        return { notEqual: true }
      }

      formGroup.get(field2)?.setErrors(null)

      return null;

    }

  }
}
