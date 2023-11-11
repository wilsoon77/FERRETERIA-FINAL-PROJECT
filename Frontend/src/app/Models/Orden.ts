import { CarritoItem } from './CarritoItem';
export interface Orden {
    id?: number; // Puedes omitir este campo si no lo necesitas al crear una nueva orden
    items: CarritoItem[];
    fechaCompra: Date;
    precioTotal: number;
    nombreCliente: string;
    direccionCliente: string;
    // Puedes agregar más propiedades según sea necesario
  }
  