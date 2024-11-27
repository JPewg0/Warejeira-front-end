import { Component } from '@angular/core';
import { Product } from '../../../Product';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-payment1',
  standalone: true,
  imports: [],
  templateUrl: './payment1.component.html',
  styleUrl: './payment1.component.css'
})
export class Payment1Component {
  baseApiUrl = environment.baseApiUrl
  product?: Product;

  constructor(private productService: ProductService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.productService.getProduct(id)
      .subscribe((item) => (this.product = item.data,
        console.log("deu certo", item.data)

      ));
  }

}
