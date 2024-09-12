import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.services';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-component.html',
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      (data: Product[]) => {
        this.products = data;
      },
      (error) => {
        console.error('Error en el listado del producto:', error);
      }
    );
  }

  enableProduct(id: number | undefined): void {
    if (id === undefined) {
      console.error('No se encuentra el ID');
      return;
    }
    this.updateProductStatus(id, Product.ENABLE);
  }

  disableProduct(id: number | undefined): void {
    if (id === undefined) {
      console.error('No se encuentra el ID');
      return;
    }
    this.updateProductStatus(id, Product.DISABLE);
  }

  deleteProduct(id: number | undefined): void {
    if (id === undefined) {
      console.error('No se encuentra el ID');
      return;
    }
    
    if (confirm('Estás seguro que quieres eliminarlo?')) {
      this.updateProductStatus(id, Product.DELETE);
    }
  }

  private updateProductStatus(id: number, status: number): void {
    this.productService.updateProduct(id, { status }).subscribe(
      () => {
        this.loadProducts();
      },
      (error) => {
        console.error('Error actualizando el estado del producto:', error);
      }
    );
  }

  getStatusText(status: number | undefined): string {
    switch (status) {
      case Product.ENABLE:
        return 'Habilitado';
      case Product.DISABLE:
        return 'Deshabilitado';
      case Product.LOCK:
        return 'Bloqueado';
      case Product.PENDING:
        return 'Pendiente';
      case Product.DELETE:
        return 'Eliminado';
      default:
        return 'Desconocido';
    }
  }

  isDisabled(product: Product): boolean {
    return product.status === Product.DISABLE || product.status === Product.DELETE;
  }

  isDeleted(product: Product): boolean {
    return product.status === Product.DELETE;
  }
}