import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {
  constructor(private http: HttpClient ,private router: Router) {
    const userData = localStorage.getItem('currentUser');
    if (!userData) {
      this.router.navigate(['/login']);
      return;
    }
  }

  submitForm(categoryName: string ) {
    const newCategory = { name: categoryName };

    this.http.post<any>('http://localhost:8080/api/v1/categories', newCategory)
      .subscribe(
        response => {
          console.log('Category added successfully:', response);
          this.router.navigate(['/categories']);
        },
        error => {
          console.error('Error adding category:', error);
        }
      );
  }
}
