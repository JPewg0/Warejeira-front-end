import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { UserRegistrationComponent } from './components/pages/user-registration/user-registration.component';
import { ShoppingCartComponent } from './components/pages/shopping-cart/shopping-cart.component';
import { CompanyRegistrationComponent } from './components/pages/company-registration/company-registration.component';
import { ProductComponent } from './components/pages/product/product.component';
import { ProfileDataComponent } from './components/pages/profile-data/profile-data.component'; 
import { YourProfileComponent } from './components/pages/your-profile/your-profile.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', redirectTo:''},
    {path: 'login', component: LoginComponent},
    {path: 'user-registration', component: UserRegistrationComponent },
    {path: 'shopping-cart', component: ShoppingCartComponent},
    {path: 'Company-registration', component: CompanyRegistrationComponent},
    {path: 'products/:id', component: ProductComponent},
    {path: 'profile-data/:id', component: ProfileDataComponent},
    {path: 'profile-data', component: ProfileDataComponent},
    {path: 'your-profile', component: YourProfileComponent},
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}
