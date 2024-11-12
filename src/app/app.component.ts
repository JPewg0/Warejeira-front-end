import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { HomeComponent } from "./components/pages/home/home.component";
import { LoginComponent } from "./components/pages/login/login.component";
import { UserRegistrationComponent } from "./components/pages/user-registration/user-registration.component";
import { UpdateUserInformationComponent } from "./components/pages/update-user-information/update-user-information.component";
import { CompanyRegistrationComponent } from "./components/pages/company-registration/company-registration.component";
import { YourProfileComponent } from "./components/pages/your-profile/your-profile.component";
import { UpdateCompanyInformationComponent } from "./components/pages/update-company-information/update-company-information.component";
import { NewCompanyComponent } from "./components/pages/new-company/new-company.component";
import { Payment1Component } from './components/pages/payment1/payment1.component';
import { Screen1Component } from './components/pages/screen1/screen1.component';
import { Screen2Component } from './components/pages/screen2/screen2.component';
import { Payment2Component } from './components/pages/payment2/payment2.component';
import { ProfileDataComponent } from './components/pages/profile-data/profile-data.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, HomeComponent, LoginComponent, UserRegistrationComponent, UpdateUserInformationComponent, CompanyRegistrationComponent, YourProfileComponent, UpdateCompanyInformationComponent, NewCompanyComponent, Payment1Component, Screen1Component, Screen2Component, Payment2Component, YourProfileComponent, ProfileDataComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Warejeira';
}
