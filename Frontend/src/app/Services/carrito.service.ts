import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarritoItem } from '../Models/CarritoItem';
import { DatosCompraRequest } from '../Models/DatosCompraRequest';
import { Orden } from '../Models/Orden';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  rutaGlobal = 'http://localhost:8080/carrito/';
  
  compraRealizada = false; // Nueva propiedad para indicar si la compra se realizó con éxito

  // Propiedad para almacenar los elementos del carrito
  private carrito: CarritoItem[] = [];
  
  constructor(private http: HttpClient, private toastr: ToastrService) {}

  agregarAlCarrito(item: CarritoItem): Observable<any> {
    return this.http.post(this.rutaGlobal + 'agregar', item, {
      observe: 'response',
      responseType: 'text' // Cambia el tipo de respuesta a 'text'
    }).pipe(
      tap(() => {
        // Muestra la notificación cuando se añade al carrito
        this.toastr.success('Producto añadido al carrito', 'Éxito', {
          timeOut: 3000,
          positionClass: 'toast-top-right'
        });
      }),
      catchError(this.handleError)
    );
  }

  obtenerContenidoDelCarrito() {
    return this.http.get<CarritoItem[]>(this.rutaGlobal + 'contenido');
  }

  eliminarDelCarrito(productoId: number): Observable<any> {
    return this.http.delete(this.rutaGlobal + `eliminar/${productoId}`, {
      observe: 'response',
      responseType: 'text' // Cambia el tipo de respuesta a 'text'
    });
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error en la solicitud:', error);
    return throwError('Error en la solicitud. Por favor, revisa la consola para más detalles.');
  }

  // Función para crear una orden a partir del carrito
  crearOrdenDesdeCarrito(orden: Orden): Observable<any> {
    return this.http.post(`${this.rutaGlobal}crear_orden`, orden, { responseType: 'text' })
      .pipe(
        catchError((error: any) => {
          // Si el estado es 200, considera el cuerpo como un mensaje de éxito
          if (error instanceof HttpErrorResponse && error.status === 200) {
            return of(error.error);
          } else {
            // Si es otro tipo de error, lánzalo normalmente
            return throwError(error);
          }
        })
      );
  }
  

  crearOrdenDesdeDatosCompra(datosCompra: DatosCompraRequest): Observable<any> {
    // Crear una orden a partir de DatosCompraRequest
    const orden: Orden = {
      items: [], // Necesitas proporcionar los elementos del carrito aquí
      fechaCompra: datosCompra.fechaEmision, // Usar la fechaEmision de datosCompra
      precioTotal: datosCompra.precioTotal,
      nombreCliente: datosCompra.nombreCliente, // Agregar nombreCliente
      direccionCliente: datosCompra.direccionCliente, // Agregar direccionCliente
    };
  
    return this.http.post(`${this.rutaGlobal}crear_orden`, orden, { responseType: 'text' })
      .pipe(
        catchError((error: any) => {
          if (error instanceof HttpErrorResponse && error.status === 200) {
            // Si el estado es 200, considera el cuerpo como un mensaje de éxito
            return of(error.error);
          } else {
            // Si es otro tipo de error, lánzalo normalmente
            return throwError(error);
          }
        })
      );
  }
  
  limpiarCarrito() {
    // Lógica para limpiar el carrito, por ejemplo, establecerlo como un array vacío
    this.carrito = [];
  }

}
