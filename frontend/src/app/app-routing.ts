import { RouterModule, Routes } from "@angular/router";
import { ItemsComponent } from "./items/items.component";
import { CategoriesComponent } from "./categories/categories.component";
import { AddCategoryComponent } from "./add-category/add-category.component";
import { AddItemComponent } from "./add-item/add-item.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";


const APP_ROUTING : Routes=[
    {path: '', component: LoginComponent },
    {path: 'items', component: ItemsComponent },
    {path: 'categories', component: CategoriesComponent},
    {path: 'add_item', component: AddItemComponent},
    {path: 'add_category', component: AddCategoryComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
];

export const ROUTING = RouterModule.forRoot(APP_ROUTING); 