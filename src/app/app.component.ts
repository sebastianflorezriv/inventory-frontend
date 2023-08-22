import { Component, OnInit } from '@angular/core';
import { Product } from './model/product';
import { ProductService } from './service/product-service.service';
import { ProductBody } from './model/product-body';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'inventory-frontend';

  public products: Product[] = [];
  public showCreateModal: boolean = false;
  public createProductBody: ProductBody = new ProductBody();

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  public getAllProducts() {
    this.productService.getAllProducts().subscribe({
      next: (dataBackend) => {
        this.products = dataBackend;
      },
      error: (error) => {
        console.log(error);
        alert('Hubo un error en el servidor. (Ver consola)');
      },
    });
  }

  public crearProducto() {
    this.productService.createProduct(this.createProductBody).subscribe({
      next: (dataBackend: Product) => {
        this.showCreateModal = false;
        this.getAllProducts();
        this.createProductBody = new ProductBody();
        alert('¡Producto Agregado!');
      },
      error: (error) => {
        console.log(error);
        alert('Hubo un error en la creación del producto. Ver consola');
      },
    });
  }

  public showEditModal: boolean = false;
  public editProductBody: ProductBody = new ProductBody();
  public idProductUpdated: number = 0;

  public obtenerProducto(idProducto: number) {
    this.idProductUpdated = idProducto;
    this.productService.getOneProduct(idProducto).subscribe({
      next: (dataBackend: Product) => {
        this.editProductBody = dataBackend;
        this.showEditModal = true;
      },
      error: (error) => {
        console.log(error);
        alert('Hubo un error en la obtención del producto. Ver consola');
      },
    });
  }

  public actualizarProducto() {
    this.productService
      .updateProduct(this.editProductBody, this.idProductUpdated)
      .subscribe({
        next: (dataBackend: Product) => {
          this.showEditModal = false;
          this.getAllProducts();
          this.editProductBody = new ProductBody();
          this.idProductUpdated = 0;
          alert('¡Producto Actualizado!');
        },
        error: (error) => {
          console.log(error);
          alert('Hubo un error en la actualización del producto. Ver consola');
        },
      });
  }

  public eliminarProducto(idProducto: number) {
    if (confirm('¿Está seguro que desea eliminar este producto?')) {
      this.productService.deleteProduct(idProducto).subscribe({
        next: (dataBackend) => {
          this.getAllProducts();
          alert('¡Producto Borrado!');
        },
        error: (error) => {
          console.log(error);
          alert('Hubo un error en la eliminación del producto. Ver consola');
        },
      });
    }
  }
}
