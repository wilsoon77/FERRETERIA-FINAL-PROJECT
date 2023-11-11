import { Producto } from './Producto';

export class CarritoItem {
    id: number; // Identificador del producto en el carrito
    producto: Producto; // Objeto de tipo Producto
    cantidad: number; // Cantidad de ese producto en el carrito
  }
  