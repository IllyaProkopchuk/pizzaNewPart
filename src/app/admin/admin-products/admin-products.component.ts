import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products.service';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { IProducts } from 'src/app/shared/interfaces/products.interface';
import { Products } from 'src/app/shared/classes/products.model';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { TouchSequence } from 'selenium-webdriver';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {
  productCategories: Array<IProducts> = [];
  productImage: string;
  categories: Array<ICategory>;


  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  urlImage: string;
  url: string;
  productName: string;
  productDescription: string;
  productPrice: number;
  category: string;
  editStatus: boolean;
  id: number;
  saveImage: string;

  constructor(private prStorage: AngularFireStorage,
    private productsService: ProductsService,
    private categoriesService: CategoriesService) {
    this.getProdData();
    this.getCatData();
    this.url = 'http://localhost:3000/products';

  }

  ngOnInit() { }
  private getProdData(): void {
    this.productsService.getProduct().subscribe(
      data => {
        this.productCategories = data;
      },
      err => {
        console.log(err);
      }
    )
  };
  private getCatData(): void {
    this.categoriesService.getCategories().subscribe(
      data => {
        this.categories = data;
      },
      err => { console.log(err); }
    );
  }

  public addProduct(): void {
    const newProd = new Products(1,
                                this.category,
                                this.productName,
                                this.productDescription,
                                this.productPrice,
                                this.productImage);
    if (this.productCategories.length > 0) {
      newProd.id = this.productCategories.slice(-1)[0].id + 1;
    }
    this.productsService.addProduct(newProd).subscribe(
      () => {
        this.getProdData();
      }
    );
    this.category = '';
    this.productName = '';
    this.productDescription = '';
    this.productPrice = null;
  }

  public deleteProducts(obj: IProducts): void {
    this.productsService.deleteProducts(obj.id).subscribe(
      () => {
        this.getProdData();
      }
    )
  };

  public editProducts(obj: IProducts): void {
    this.category = obj.category;
    this.productName = obj.name;
    this.productDescription = obj.description;
    this.productPrice = obj.price;
    this.id = obj.id;
    this.editStatus = true;
    this.saveImage = obj.image;
  }

  public saveEditProduct(): void {
    const editProd = new Products(this.id, this.category, this.productName, this.productDescription, this.productPrice, this.productImage);
    this.productsService.editProducts(editProd).subscribe(
      () => {
        this.getProdData();
      }
    );
    this.category = '';
    this.productName = '';
    this.productDescription = '';
    this.productPrice = null;
    this.editStatus = false;
  }

  public upload(event): void {
    const id = Math.random().toString(36).substring(2)
    this.ref = this.prStorage.ref(`images/${id}`)
    this.task = this.ref.put(event.target.files[0])
    this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
    this.uploadProgress = this.task.percentageChanges();
    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = this.ref.getDownloadURL()
        this.downloadURL.subscribe(url => this.productImage = url)
      })
    ).subscribe();
  }

}
