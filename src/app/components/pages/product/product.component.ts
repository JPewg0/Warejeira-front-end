import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ProductService } from '../../../services/product.service';

import { Product } from '../../../Product';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  product?: Product;

  constructor(
    private productServise: ProductService,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.productServise
    .getProduct(id)
    .subscribe((item) => (this.product = item.data));
  }

}
