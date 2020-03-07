import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-listings.component.html',
  styleUrls: ['./product-listings.component.scss']
})
export class ProductListComponent implements OnInit {

  constructor(private productService: ProductService) { }
  product : any;
  ngOnInit() {

    const productsObservable = this.productService.getProducts();
    productsObservable.subscribe(
      
      (data)=>{ this.product = data},
      (error)=>{console.error('something wrong occurred: ' + error)}
    )
  }

}
