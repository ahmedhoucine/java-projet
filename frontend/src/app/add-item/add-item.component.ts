import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent {
  categories: any[] = [];

  constructor(private http: HttpClient , private router: Router) {
    const userData = localStorage.getItem('currentUser');
    if (!userData) {
      this.router.navigate(['/login']);
      return;
    }
    this.http.get('http://localhost:8080/api/v1/categories').subscribe(
      (response: any) => {
        console.log('response', response);
        this.categories = response;
      },
      (error) => {
        console.log('error', error);
      },
      () => {
        console.log('complete');
      }
    );
  }

  submitForm(form: NgForm) {
    const newItem = {
      name: form.value.itemName,
      description: form.value.description,
      price: form.value.price,
      categoryId: form.value.category
    };
  
    this.http.post<any>('http://localhost:8080/api/v1/items', newItem)
      .subscribe(
        response => {
          console.log('Item added successfully:', response);
          form.resetForm();
          this.router.navigate(['/items']); // Navigate to the items route
        },
        error => {
          console.error('Error adding item:', error);
        }
      );
  }
  
}

