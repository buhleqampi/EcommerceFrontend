import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product-service/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../interfaces/product';
import { CartService } from '../../../services/cart-service/cart.service';
import { ProductDbResponse } from '../../../interfaces/productDbResponse';
import { TokenService } from '../../../service/token.service';

@Component({
  selector: 'app-singleproduct',
  templateUrl: './singleproduct.component.html',
  styleUrl: './singleproduct.component.css'
})
export class SingleproductComponent implements OnInit {
  products: any [] = []
  isAdded: any
  selectedProduct?: Product;
  errMessage: any = ""
  not = 0
  constructor(
    private route: ActivatedRoute,
    private _productService: ProductService,
    private cartService: CartService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    // this.getAllProducts()
    this.getProduct()
  }

  // getAllProducts(){

  //   this._productService.getAllProducts().subscribe({
  //     next: (data: ProductDbResponse) =>{
  //     this.products = data.products

  //     console.log(this.products)
  //     },
  //     error: err=>{
  //       console.log(err)
  //     }
  //   })
  // }

  getProduct(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id)
      this._productService.getProduct(id).subscribe({
        next: (res: any) => {
          console.log(res)
          this.selectedProduct = res.product;
        },
        error: (err: any) => {
          console.error("An error occurred while fetching product:", err);
        }
      });
  }

  addToCart(item: Product): void {
    const user = this.tokenService.getUser()
    this.cartService.addtoCart({productId: item.id, quantity: 1, id: user.id }).subscribe({
      next: (res)=>{
        console.log(res)
        this.cartService.updateCArt(1)
            }, error:(err)=>{
        console.error("here",err)
      }
    })

  }

  addToFavs(product: Product): void {
    const user = this.tokenService.getUser()
    this.cartService.addToWishlist({userId: user.id , itemId: product.id}).subscribe({
      next: (res)=>{
        console.log(res)
        this.cartService.updateFavCount(1)

      }, error:(err)=>{
        this.errMessage = err.error.message
        console.error(err.error.message)
      }
    });

  }

  getFavs(){
    
  }
}
