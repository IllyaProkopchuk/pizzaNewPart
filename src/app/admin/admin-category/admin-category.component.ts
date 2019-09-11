import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { Category } from 'src/app/shared/classes/category.model';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {
  categories: Array<ICategory>;
  cName: string;
  editStatus: boolean;
  id: number;

  constructor(private categoriesService: CategoriesService) {
    this.getData();
  }

  ngOnInit() { }

  private getData(): void {
    this.categoriesService.getCategories().subscribe(
      data => {
        this.categories = data;
      },
      err => { console.log(err); }
    );
  }

  public addCategory(): void {
    const newCat = new Category(1, this.cName);
    if (this.categories.length > 0) {
      newCat.id = this.categories.slice(-1)[0].id + 1;
    }
    this.categoriesService.addCategory(newCat).subscribe(
      () => {
        this.getData();
      }
    )
    this.cName = '';
  }

  public deleteCategory(obj: ICategory): void {
    this.categoriesService.deleteCategory(obj.id).subscribe(
      () => {
        this.getData();
      }
    )
  };

  public editDiscount(obj: ICategory): void {
    this.cName = obj.name;
    this.editStatus = true;
    this.id = obj.id;
  }

  public saveEditCategory(): void {
    const editProd = new Category(this.id, this.cName);
    this.categoriesService.editCategory(editProd).subscribe(
      () => {
        this.getData();
      }
    );
    this.cName = '';
    this.editStatus = false;
  }

}
