import { Component, OnInit } from '@angular/core';
import { Product } from '../../../interfaces/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product-service/product.service';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-view-one-product',
  templateUrl: './view-one-product.component.html',
  styleUrl: './view-one-product.component.css'
})


export class ViewOneProductComponent implements OnInit {
  product: any = {
    category: "",
    title: "",
    description: "",
    price: 0,
    stock: 0
  };
  selectedProduct: any = null;
  selectedFile!: File;
  reader!: FileReader;
  imagePreview: any;
  openedBox: string | null = null;
  id: string | null = null;
  errMessage: any;
  form: NgForm | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.id = id;
    if (id) {
      this.productService.getProduct(id).subscribe({
        next: (res: any) => {
          this.selectedProduct = res.product;
          this.product = { ...this.selectedProduct }; // Populate form with existing product data
        },
        error: (err: any) => {
          console.error("An error occurred while fetching product:", err);
        }
      });
    }
  }

  toggleBox(box: string): void {
    this.openedBox = this.openedBox === box ? null : box;
  }

  goBack() {
    this.location.back();
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const formData: FormData = new FormData();

      for (let key in this.product) {
        if (key !== 'imgUrl') {
          formData.append(key, this.product[key]);
        }
      }
      if (this.selectedFile) {
        formData.append('imgUrl', this.selectedFile);
        console.log(this.selectedFile)
      }

      formData.append('businessId', "66864f8dad57296a97884bc0");

      if (this.id) {
        this.productService.updateAProduct(this.id, formData).subscribe({
          next: response => {
            console.log('Product updated successfully', response);
            form.reset();
          },
          error: error => {
            console.error('Error updating product', formData, error);
          }
        });
      }
    }
  }

  onDeleteProduct(id: string): void {
    this.productService.deleteProduct(id).subscribe({
      next: (response) => {
        console.log('Product deleted successfully:', response);
        this.product = this.product.filter((product: { _id: string; }) => product._id !== id);
        if (this.selectedProduct._id === id) {
          this.selectedProduct = null;
        }
      },
      error: (error) => {
        console.error('Error deleting product:', error);
      }
    });
  }

  fileSelect(event: any) {
    if (event.target.files[0]) {
      this.selectedFile = event.target.files[0];
      this.reader = new FileReader();
      this.reader.readAsDataURL(this.selectedFile);

      this.reader.onload = (event: any) => {
        this.imagePreview = event.target.result;
      };
    }
  }
}