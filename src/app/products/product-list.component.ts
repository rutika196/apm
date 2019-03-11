import { Component, OnInit } from "@angular/core";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
  
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle: string = 'Product-List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  errorMessage: string;

  private _listFliter: string;
  public get listFliter(): string {
    return this._listFliter;
  }
  public set listFliter(value: string) {
    this._listFliter = value;
    this.fliterProducts = this.listFliter ? this.performFilter(this.listFliter) : this.products;
  }

  fliterProducts: IProduct[];
  products: IProduct[] = [];

  constructor(private productService : ProductService) {
    
  }

  onRatingClicked(message: string): void{
    this.pageTitle = 'Prodcut-List: ' + message;

  }

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) =>
      product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  toggleImage(): void {

    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    this.productService.getProduct().subscribe(
      products => {
        this.products = products;
        this.fliterProducts = this.products;

      },
      error => this.errorMessage = <any>error
    );
    
  }



}