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
import { CompanyOrdersComponent } from './components/pages/company-orders/company-orders.component';
import { NewCompanyComponent } from './components/pages/new-company/new-company.component';
import { Payment1Component } from './components/pages/payment1/payment1.component';
import { ProductRegistrationComponent } from './components/pages/product-registration/product-registration.component';
import { Screen1Component } from './components/pages/screen1/screen1.component';
import { Screen2Component } from './components/pages/screen2/screen2.component';
import { UpdateCompanyInformationComponent } from './components/pages/update-company-information/update-company-information.component';
import { UpdateUserInformationComponent } from './components/pages/update-user-information/update-user-information.component';
import { YourCompanyComponent } from './components/pages/your-company/your-company.component';
import { YourOrdersComponent } from './components/pages/your-orders/your-orders.component';

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
    {path: 'company-orders', component: CompanyOrdersComponent},
    {path: 'new-company', component: NewCompanyComponent},
    {path: 'payment1', component: Payment1Component},
    {path: 'product-registration', component: ProductRegistrationComponent},
    {path: 'screen1', component: Screen1Component},
    {path: 'scren2', component: Screen2Component},
    {path: 'update-company-information', component: UpdateCompanyInformationComponent},
    {path: 'update-user-information', component: UpdateUserInformationComponent},
    {path: 'your-company', component: YourCompanyComponent},
    {path: 'your-orders', component: YourOrdersComponent},
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}
