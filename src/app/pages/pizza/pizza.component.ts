import { Component, OnInit } from '@angular/core';
import { IProducts } from 'src/app/shared/interfaces/products.interface';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.scss']
})
export class PizzaComponent implements OnInit {
  pizza: Array<IProducts>;

  constructor(private productsService: ProductsService) {
    this.getProdData();
  }

  ngOnInit() {
  }

  private getProdData(): void {
    this.productsService.getProduct().subscribe(
      data => {
        this.pizza = data.filter(obj => obj.category === 'pizza');
      },
      err => {
        console.log(err);
      }
    )
  };

}
