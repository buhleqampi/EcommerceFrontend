import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product-service/product.service';
import { ProductDbResponse } from '../../../interfaces/productDbResponse';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit {

  products: any[] = [];
  selectedProduct: any;
  isUpdateModalOpen: boolean = false;

  constructor(private _productService: ProductService) {

    this.getAllProducts();
   }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this._productService.getAllProducts().subscribe({
      next: (data: ProductDbResponse) => {
        this.products = data.products.reverse();
        console.log(this.products);
      },
      error: err => {
        console.log(err);
      }
    });
  }

  openUpdateModal(product: any) {
    this.selectedProduct = product;
    this.isUpdateModalOpen = true;
  }

  closeUpdateModal() {
    this.isUpdateModalOpen = false;
    this.selectedProduct = null;
    this.getAllProducts(); // Reload products to reflect updates
  }
}
function goBack() {
  throw new Error('Function not implemented.');
}

