import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProducts } from 'src/app/shared/interfaces/products.interface';
import { Location } from '@angular/common';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  productId: number;
  view: IProducts;
  constructor(private productsServices: ProductsService,
    private route: ActivatedRoute,
    private location: Location) {
    this.getMoreDetails();
  }

  ngOnInit() {
  }

  public getMoreDetails(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.productsServices.getOneProduct(this.productId).subscribe(
      data => {
        this.view = data;
      }
    )
  }

  public goBack(): void {
    this.location.back();
  }

}
