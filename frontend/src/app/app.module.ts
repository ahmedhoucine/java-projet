import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ROUTING } from './app-routing';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AddItemComponent } from './add-item/add-item.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { ItemsComponent } from './items/items.component';
import { CategoriesComponent } from './categories/categories.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AddItemComponent,
    AddCategoryComponent,
    ItemsComponent,
    CategoriesComponent,
    LoginComponent,
    RegisterComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ROUTING
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
