import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('myform') form: NgForm | undefined;
  defaultQuestion = 'teacher';
  answer = '';
  genders = ['male', 'female'];

  suggestUserName() {
    const suggestedName = 'Superuser';
    this.form?.setValue({
      userData: {
        username: suggestedName,
        email: '',
      },
      secret: 'pet',
      qanswer: 'test',
      gender: 'male',
    });
  }

  onSubmit() {
    console.log(this.form);
  }
}
