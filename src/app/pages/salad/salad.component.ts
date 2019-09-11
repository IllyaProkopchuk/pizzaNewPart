import { Component, OnInit } from '@angular/core';
import { IProducts } from 'src/app/shared/interfaces/products.interface';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-salad',
  templateUrl: './salad.component.html',
  styleUrls: ['./salad.component.scss']
})
export class SaladComponent implements OnInit {
  salad: Array<IProducts>;

  constructor(private productsService: ProductsService) { 
    this.getProdData();

  }

  ngOnInit() {
  }
  private getProdData(): void {
    this.productsService.getProduct().subscribe(
      data => {
        this.salad = data.filter(arr => arr.category === "salad");
      },
      err => {
        console.log(err);
      }
    )
  };

}
