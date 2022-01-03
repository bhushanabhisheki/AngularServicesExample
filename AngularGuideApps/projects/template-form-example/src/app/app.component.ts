import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('signupform') signupform: NgForm | undefined;
  defaultQuestion = 'teacher';
  answer = '';
  genders = ['male', 'female'];
  user = {
    username: '',
    email: '',
    secretQuestion: '',
    answer: '',
    gender: '',
  };
  submittted = false;

  suggestUserName() {
    const suggestedName = 'Superuser';
    this.signupform?.setValue({
      userData: {
        username: suggestedName,
        email: 'bhushanabhisheki@gmail.com',
      },
      secret: 'pet',
      qanswer: 'test',
      gender: 'male',
    });

    this.signupform?.form.patchValue({
      userData: {
        username: suggestedName,
      },
    });
  }

  onSubmit() {
    this.user.username = this.signupform?.value.userData?.username;
    console.log(this.signupform?.value);
    this.user.email = this.signupform?.value.userData?.email;
    this.user.secretQuestion = this.signupform?.value.secret;
    this.user.answer = this.signupform?.value.qanswer;
    this.user.gender = this.signupform?.value.gender;
    this.submittted = true;
  }
}
