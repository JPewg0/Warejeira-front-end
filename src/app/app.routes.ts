import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { UserRegistrationComponent } from './components/pages/user-registration/user-registration.component';
import { ShoppingCartComponent } from './components/pages/shopping-cart/shopping-cart.component';
import { CompanyRegistrationComponent } from './components/pages/company-registration/company-registration.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'user-registration', component: UserRegistrationComponent },
    {path: 'shopping-cart', component: ShoppingCartComponent},
    {path: 'Company-registration', component: CompanyRegistrationComponent}
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}
