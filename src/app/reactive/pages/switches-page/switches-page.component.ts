import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches-page',
  templateUrl: './switches-page.component.html',
  styles: [
  ]
})
export class SwitchesPageComponent implements OnInit {

  constructor( private fb: FormBuilder){ }

  ngOnInit(): void {
    this.myForm.reset( this.person)
  }

  public myForm: FormGroup = this.fb.group({
    gender: ['M', Validators.required ],
    wantNotifications: [ true, Validators.required ],
    termsAndConditions: [ false, Validators.requiredTrue ]
  })

  public person = {
    gender: "F",
    wantNotifications: false
  }

  onSave():void {


    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    };

    const { termsAndConditions, ...newPerson } = this.myForm.value  //* esto es para que al objeto persona no se le agregue la propiedad de termsAndConditions. Posiblemente haya que devolverlo al backend y no espera mas argumentos de los que mandó.

    this.person = newPerson;
    console.log(this.myForm.value)
    console.log(this.person)
  }

  isValidField( field: string ): boolean | null {

    return this.myForm.controls[field].errors    //* errors me devuelve un objeto con los errores en las validaciones del formulario. Si no tiene errores, me devuelve null

            && this.myForm.controls[field].touched;
  }

}
