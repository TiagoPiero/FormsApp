import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-page',
  templateUrl: './dynamic-page.component.html',
  styles: [
  ]
})
export class DynamicPageComponent {

  constructor( private fb: FormBuilder){

  }


  public myForm: FormGroup = this.fb.group({
    name: ['',[ Validators.required, Validators.minLength(3) ]],
    favoriteGames: this.fb.array([        // un FormsArray. Internamente tiene los controles que son de tipo FormsControl
      ['Metal Gear', Validators.required ],
      ['Death Strandind', Validators.required ]
    ])
  })

  public newFavorite: FormControl = new FormControl ('',[Validators.required])

  onAddToFavorites():void {
    if ( this.newFavorite.invalid ) return;
    const newGame = this.newFavorite.value;

    // this.favoriteGames.push( new FormControl( newGame, Validators.required ))  // agregado sin trabajar con formBuilder
    this.favoriteGames.push(
      this.fb.control( newGame, Validators.required )
    );

    this.newFavorite.reset();


  }

  onDeleteFavorite( i: number): void {
    this.favoriteGames.removeAt(i);
  }


  onSubmit(): void {

    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched()
      return ;
    }

    console.log(this.myForm.value);
    (this.myForm.controls['favoriteGames'] as FormArray ) = this.fb.array([]); //* deja el arreglo vacio para que cuando se haga un submit se quite la lista 
    this.myForm.reset()

  }

    get favoriteGames() {
      return this.myForm.get('favoriteGames') as FormArray;
    }


    isValidField( field: string ): boolean | null {

      return this.myForm.controls[field].errors         //* errors me devuelve un objeto con los errores en las validaciones del formulario. Si no tiene errores, me devuelve null

              && this.myForm.controls[field].touched;
    }


    isValidFieldInArray( formArray: FormArray, i: number) {

      return formArray.controls[i].errors
            && formArray.controls[i].touched;
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


}

