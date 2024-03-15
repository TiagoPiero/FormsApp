import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { EmailValidator } from 'src/app/shared/validators/email-validator.service';
// import * as customValidators from 'src/app/shared/validators/validators';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styles: [
  ]
})
export class RegisterPageComponent {

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    private emailValidator: EmailValidator
    ) { }

  public myForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required, Validators.pattern(this.validatorsService.firstNameAndLastnamePattern)] ],
    // email: ['', [ Validators.required, Validators.pattern(this.validatorsService.emailPattern)], [ new EmailValidator() ] ],
    email: ['', [ Validators.required, Validators.pattern(this.validatorsService.emailPattern)], [ this.emailValidator ] ],
    username: ['', [ Validators.required, this.validatorsService.cantBeStrider ]],
    password: ['', [ Validators.required, Validators.minLength(6) ] ],
    password2: ['', [ Validators.required, ] ],
  },{
    validators: [
      this.validatorsService.isFieldOneEqualFieldTwo('password','password2')
    ]


    // Lo ponemos afuera ya que en este lugar tiene acceso a todo el formulario. Si lo ponemos en la declaracion del control, tiene acceso a solo ese control. Como necesitamos ocupar dos campos para validar que el password1 sea igual a password2, lo tenemos q hacer a nivel de formulario y no de control
  });


  isValidField( field: string ) {
    return this.validatorsService.isValidField( this.myForm, field )
  }


  onSave() {
    this.myForm.markAllAsTouched();
  }


}
