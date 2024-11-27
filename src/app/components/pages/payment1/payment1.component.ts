import { Component, OnInit } from '@angular/core';
import { Product } from '../../../Product';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { User } from '../../../User';
import { UserService } from '../../../services/user.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-payment1',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './payment1.component.html',
  styleUrl: './payment1.component.css'
})
export class Payment1Component implements OnInit {
  baseApiUrl = environment.baseApiUrl;
  product?: Product;
  user?: User;

  constructor(
    private productService: ProductService,
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));

    // Carregar os dados do produto
    this.productService.getProduct(productId).subscribe((item) => {
      this.product = item.data;
      console.log('Produto carregado:', this.product);
    });

    // Obter o ID do usuário (por exemplo, do localStorage)
    const userId = String(localStorage.getItem('userId'));

    // Carregar os dados do usuário pelo ID
    this.userService.getUserData(userId).subscribe((userData) => {
      this.user = userData.data;
      console.log('Usuário carregado:', this.user);
    });
  }
}

  


