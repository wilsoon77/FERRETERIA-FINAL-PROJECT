import { Component, OnInit } from '@angular/core';
import { CarritoItem } from 'src/app/Models/CarritoItem';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DatosCompraRequest } from 'src/app/Models/DatosCompraRequest';
import { CarritoService } from 'src/app/Services/carrito.service';
import { ProductoService } from 'src/app/Services/producto.service';
@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  productosEnCarrito: CarritoItem[] = [];
  total: number = 0;
  nombreCliente: string = '';
  direccionCliente: string = '';
  fechaEmision: string = ''; // Asegúrate de tener un formato adecuado para la fecha
  compraRealizada = false; // Nueva propiedad para indicar si la compra se realizó con éxito


  constructor(private carritoService: CarritoService, private router: Router,private toastr: ToastrService) {}

  ngOnInit() {
    this.cargarProductosEnCarrito();
  }

  cargarProductosEnCarrito() {
    this.carritoService.obtenerContenidoDelCarrito().subscribe(
      (carritoItems: CarritoItem[]) => {
        this.productosEnCarrito = carritoItems;
      },
      error => {
        console.error('Error al cargar productos del carrito', error);
      }
    );
  }

  eliminarDelCarrito(productoId: number) {
    this.carritoService.eliminarDelCarrito(productoId).subscribe(
      response => {
        console.log('Producto eliminado del carrito');
        this.cargarProductosEnCarrito();
      },
      error => {
        console.error('Error al eliminar producto del carrito', error);
      }
    );
  }

  calcularTotal() {
    this.total = this.productosEnCarrito.reduce((total: number, carritoItem: CarritoItem) => total + (+carritoItem.producto.precio * +carritoItem.cantidad), 0);
    return this.total;
  }
  
  terminarCompra() {
    const datosCompra: DatosCompraRequest = {
      nombreCliente: this.nombreCliente,
      direccionCliente: this.direccionCliente,
      fechaEmision: new Date(this.fechaEmision), // Convertir cadena a Date si es necesario
      precioTotal: this.calcularTotal(),
    };
  
    this.carritoService.crearOrdenDesdeDatosCompra(datosCompra).subscribe(
      response => {
        console.log('Compra realizada correctamente:', response);
        this.compraRealizada = true; // Mostrar el mensaje después de realizar la compra
        setTimeout(() => {
          this.compraRealizada = false; // Ocultar el mensaje después de un tiempo
          this.carritoService.limpiarCarrito(); // Vaciar el carrito

          // Redirigir al componente de inicio
        this.router.navigate(['/inicio']);
        
      }, 3000); // Ajusta el tiempo según tus necesidades
      },
      (error: any) => {
        console.error('Error al realizar la compra', error);
        // Maneja el error aquí según sea necesario, por ejemplo, muestra un mensaje al usuario
        // También puedes redirigir al usuario a una página de error si es apropiado
      }
    );
  }
  
  

}

