import { Component } from '@angular/core';
import { ProductService } from '../../../services/product-service/product.service';
import { ProductDbResponse } from '../../../interfaces/productDbResponse';
import { Product } from '../../../interfaces/product';

@Component({
  selector: 'app-deleteproduct',
  templateUrl: './deleteproduct.component.html',
  styleUrl: './deleteproduct.component.css'
})
export class DeleteproductComponent {
  
  products: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    // Load products or other initialization logic
  }

  onDeleteProduct(id: string): void {
    this.productService.deleteProduct(id).subscribe({
      next: (response) => {
        console.log('Product deleted successfully:', response);
        // Optionally, remove the deleted product from the products array
        this.products = this.products.filter(product => product._id !== id);
      },
      error: (error) => {
        console.error('Error deleting product:', error);
      }
    });
  }
}

