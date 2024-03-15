//* La idea de este archivo es que nos ayude a centralizar todas nuestra validaciones.
//* En cada funcion de validacion, se busca retornar un objeto para el caso de que haya error, o NULL en el caso de no haber errores.
//* Como se si una validacion es sincrona o asincrona? Una validacion asincrona se da por ejemplo cuando esta amarrada a un observable (la validacion me retorna un observable), o una promesa.

import { FormControl, ValidationErrors } from "@angular/forms";

//expresiones regulares 
export const firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
export const emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

export const cantBeStrider = ( control: FormControl): ValidationErrors | null => {

  const value: string = control.value.trim().toLowerCase()

  if ( value === 'strider') {
    return {
      noStrider: true
    }
  }

  return null;
}




