import { Component, OnInit } from '@angular/core';
import { IProducts } from 'src/app/shared/interfaces/products.interface';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.scss']
})
export class DrinksComponent implements OnInit {
  drinks: Array<IProducts>;

  constructor(private productsService: ProductsService) {
    this.getProdData();
  }
  ngOnInit() {
  }

  private getProdData(): void {
    this.productsService.getProduct().subscribe(
      data => {
        this.drinks = data.filter(arr => arr.category === "drinks");
      },
      err => {
        console.log(err);
      }
    )
  };
}
