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
import { ShoppingCartComponent } from "./components/pages/shopping-cart/shopping-cart.component";
import { MessagesComponent } from "./components/messages/messages.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, MessagesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Warejeira';
}
