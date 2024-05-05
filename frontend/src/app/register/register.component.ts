import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  message: string | undefined;

  constructor(private http: HttpClient , private router: Router){}

  submitForm(form: NgForm) {
    const user = {
      username: form.value.username,
      password: form.value.password
    };
  
    this.http.get<any>(`http://localhost:8080/api/v1/register?username=${user.username}&password=${user.password}`)
  .subscribe(
    response => {
      console.log('Response:', response);
      if (response.success) {
        console.log('User added successfully:', user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        form.resetForm();
        this.router.navigate(['/items']); 
      }else {
        console.log('Login failed');
        this.message=response.message
      }
    },
    error => {
      console.error('Error adding user:', error);
      this.message = error.error.message; // Assign the error message to the message variable
    }
  );

  }
}
