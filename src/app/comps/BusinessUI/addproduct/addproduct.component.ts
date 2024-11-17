import { Component } from '@angular/core';
import { ProductService } from '../../../services/product-service/product.service';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddProductComponent {
  product: any = {
    category: "",
    title: "",
    description: "",
    price: 0,
    stock: 0
  };

  selectedFile!: File;
  reader!: FileReader;
  imagePreview: any;
  isModalOpen = false;
  openedBox: string | null = null;
  


  constructor(private productService: ProductService,  private location: Location) {}

  // openModal() {
  //   this.isModalOpen = true;
  // }

  // closeModal() {
  //   this.isModalOpen = false;
  // }
  toggleBox(box: string): void {
    this.openedBox = this.openedBox === box ? null : box;
  }
  goBack() {
    this.location.back();
  }

  onSubmit(form: NgForm) {
    const formData: any = new FormData();

      for (let key in this.product) {
        if (key !== 'imgUrl') {
          formData.append(key, this.product[key]);
        }
      }
      formData.append('imgUrl',this.selectedFile)
      formData.append('businessId',"66864f8dad57296a97884bc0")
      


  
      this.productService.createProduct(formData).subscribe({
        next: response  => {
          console.log('Product added successfully', response);
          form.reset();
        },
        error: error => {
          console.error('Error adding product',formData, error);
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
            console.log(this.imagePreview)
            
          };
    
          
        }
      }
    }








