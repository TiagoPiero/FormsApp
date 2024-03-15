import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, delay, of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class EmailValidator implements AsyncValidator {
  constructor() { }


  validate(control: AbstractControl): Observable<ValidationErrors | null> {

    const email = control.value;


    //El subscriber es como lo que ponemos al suscribirnos a un observable con el (.subscribe() ). Es la persona, ente o funcion que esta suscrita a nuestros cambios

    const httpCallObservable = new Observable<ValidationErrors|null>( (subscriber) => {

      console.log({ email })

      if ( email === 'fernando@google.com' )  {
        subscriber.next( { emailTaken: true }) //next: nuevo valor emitido
        subscriber.complete() //una vez se tiene el valor, el complete hace que no se siga emitiendo mas valores
        return;
      }

      subscriber.next(null);  // si no se tiene el email, emitimos el valor null
      subscriber.complete();
      return;

    }).pipe(
      delay( 3000 )
    )

    return httpCallObservable;
  }



  // validate(control: AbstractControl): Observable<ValidationErrors | null> {

  //   const email = control.value;
  //   console.log({ email })

  //   return of ({
  //     emailTaken: true
  //   }).pipe(
  //     delay(2000)
  //   );
  // }

}

// return this.http.get<any[]>(`http://localhost:3000/users?q=${ email }`)
// .pipe(
//   // delay(3000),
//   map( resp => {
//     return ( resp.length === 0 )
//         ? null
//         : { emailTaken: true }
//   })
// );

