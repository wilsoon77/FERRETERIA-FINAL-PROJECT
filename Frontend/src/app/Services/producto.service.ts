import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../Models/Producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  rutaGlobal = 'http://localhost:8080/producto/'

  constructor(private http: HttpClient) { }

  //Crear Producto
  crearProducto(producto: Producto){
    return this.http.post<Producto>(this.rutaGlobal + 'nuevo', producto, {
      observe: 'response'
    })
  }

  //Mostrar Productos
  getProductos(){
    return this.http.get<Producto[]>(this.rutaGlobal + 'mostrar')
  }


  //Modificar Productos
  actualizarProducto(producto: Producto){
    return this.http.post<Producto>(this.rutaGlobal + 'update' , producto,{
      observe: 'response'
    })
  }

  //Eliminar Productos
  eliminarProducto(idProducto: number){
    return this.http.post<Boolean>(this.rutaGlobal + idProducto,{
      observe: 'response'
    })

  }

  // Buscar productos por palabra clave
  buscarProductos(palabraClave: string) {
  return this.http.get<Producto[]>(`${this.rutaGlobal}buscar?palabraClave=${palabraClave}`
  );
}


}
