import { Component, Input } from '@angular/core';
import { ProductService} from '../../../services/product-service/product.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-updateproduct',
  templateUrl: './updateproduct.component.html',
  styleUrl: './updateproduct.component.css'
})
export class UpdateproductComponent {
  @Input() product: any = {
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
  selectedProduct: any;

  constructor(private productService: ProductService) {}

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  onSubmit(form: NgForm) {
    const formData: any = new FormData();

    for (let key in this.product) {
      if (key !== 'imgUrl') {
        formData.append(key, this.product[key]);
      }
    }
    formData.append('imgUrl', this.selectedFile);
    formData.append('businessId', "66864f8dad57296a97884bc0");

    console.log(formData);
    console.log(this.selectedFile);
    var obj: any = {};

    for (let x of formData) {
      let key = x[0];
      let value = x[1];
      obj[key as keyof typeof obj] = value;
    }

    

    console.log(obj);

    this.productService.createProduct(formData).subscribe({
      next: response => {
        console.log('Product added successfully', response);
        console.log(response)
        form.reset();
        this.closeModal();
      },
      error: error => {
        console.error('Error adding product', formData, error);
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
        console.log(this.imagePreview);
      };
    }
  }
}









