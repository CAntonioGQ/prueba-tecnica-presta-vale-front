import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.services';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form-component.html',
})
export class ProductFormComponent implements OnInit {
  product: Product = new Product();
  isEditMode = false;
  productStatusOptions = [
    { value: Product.ENABLE, label: 'Enable' },
    { value: Product.DISABLE, label: 'Disable' },
    { value: Product.LOCK, label: 'Lock' },
    { value: Product.PENDING, label: 'Pending' }
  ];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.loadProduct(+id);
    }
  }

  loadProduct(id: number): void {
    this.productService.getProduct(id).subscribe(
      (data: Product) => {
        this.product = data;
      },
      (error) => {
        console.error('Error obteniendo el producto:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.updateProduct();
    } else {
      this.createProduct();
    }
  }

  private createProduct(): void {
    this.productService.createProduct(this.product).subscribe(
      () => {
        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Error creando el producto:', error);
      }
    );
  }

  private updateProduct(): void {
    if (this.product.idProduct === undefined) {
      console.error('Error: idProduct is undefined');
      return;
    }
    this.productService.updateProduct(this.product.idProduct, this.product).subscribe(
      () => {
        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Error actualizando el producto:', error);
      }
    );
  }
}