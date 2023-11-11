import { Component } from '@angular/core';
import { Producto } from 'src/app/Models/Producto';
import { CarritoItem } from 'src/app/Models/CarritoItem';
import { FormGroup,FormBuilder,Validators,FormControl } from '@angular/forms';
import { ProductoService } from 'src/app/Services/producto.service';
import { CarritoService } from 'src/app/Services/carrito.service';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import  pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { ToastrService } from 'ngx-toastr';





pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent {
  productos: Array<Producto>
  busqueda: string = '';
  formularioProducto: FormGroup
  display:boolean
  displayCreacion: boolean; // Agregar variable displayCreacion
  productosFiltrados: Array<Producto>; 
  
  productoAgregado = false;
  
  constructor(private fb: FormBuilder, private pService: ProductoService, private carritoService: CarritoService,router: Router,private toastr: ToastrService) {
  

    this.productos = new Array<Producto>()
    this.productosFiltrados = [];
    this.display = false
    this.formularioProducto = fb.group({
      idProducto: new FormControl('',[Validators.required]),
      nombre: new FormControl('',[Validators.required]),
      precio: new FormControl('',[Validators.required]),
      cantidad: new FormControl('',[Validators.required]),
      marca: new FormControl('',[Validators.required])
    })
  }
  
  ngOnInit() {
    // Llama a getProductos en el inicio del componente
    this.getProductos();
  }

  realizarBusqueda() {
    if (this.busqueda) {
      this.pService.buscarProductos(this.busqueda).subscribe(result => {
        this.productos = result;
      });
    } else {
      // Si el campo de búsqueda está vacío, muestra todos los productos
      this.productosFiltrados = this.productos;
    }
  }
  
  //Limpiar Busqueda
  LimpiarBusqueda() {
    this.busqueda = ''; // Borra el campo de búsqueda
    this.getProductos(); // Muestra todos los productos nuevamente
}
 
//para crear producto
mostrarDialogoCreacion() {
  this.displayCreacion = true; // Mostrar el diálogo de creación
}


  //Crear Producto
  crearProducto(){
    if(this.formularioProducto.valid){
      let producto = new Producto()
      producto.idProducto = this.formularioProducto.get('idProducto')?.value
      producto.nombre = this.formularioProducto.get('nombre')?.value
      producto.precio = this.formularioProducto.get('precio')?.value
      producto.cantidad = this.formularioProducto.get('cantidad')?.value
      producto.marca = this.formularioProducto.get('marca')?.value
      this.pService.crearProducto(producto).subscribe(res =>{
        this.getProductos()
        this.formularioProducto.reset()
      })
      this.displayCreacion = false;
    }
  }


  //Mostrar Producto
  getProductos(){
    this.pService.getProductos().subscribe(res=>{
      this.productos = res
    })
  }


  //Modificar Producto
  actualizarProducto(){
    if(this.formularioProducto.valid){
      let producto = new Producto()
      producto.idProducto = this.formularioProducto.get('idProducto')?.value
      producto.nombre = this.formularioProducto.get('nombre')?.value
      producto.precio = this.formularioProducto.get('precio')?.value
      producto.cantidad = this.formularioProducto.get('cantidad')?.value
      producto.marca = this.formularioProducto.get('marca')?.value
      this.pService.actualizarProducto(producto).subscribe(res =>{
        this.getProductos()
        this.formularioProducto.reset()
        this.display = !this.display
      })
    }
  }


  //Eliminar Producto
  eliminarProducto(idProducto: number){
    this.pService.eliminarProducto(idProducto).subscribe(res => {
      this.getProductos()
    })
  }

  activador(producto: Producto){

    this.formularioProducto.get('idProducto')?.setValue(producto.idProducto)
    this.formularioProducto.get('nombre')?.setValue(producto.nombre)
    this.formularioProducto.get('precio')?.setValue(producto.precio)
    this.formularioProducto.get('cantidad')?.setValue(producto.cantidad)
    this.formularioProducto.get('marca')?.setValue(producto.marca)
    this.display = !this.display
  }

  getFormattedDateTime(): string {
    const now = new Date();
    return formatDate(now, 'dd/MM/yyyy HH:mm:ss', 'en-US'); // Ajusta el formato como desees
  }
  

  generatePDF() {
    const content = [];
  
    // Obtén la fecha y hora actual
    const formattedDateTime = this.getFormattedDateTime();
  
    // Estilos personalizados
    const headerStyles = {
      tableHeader: { fontSize: 13, bold: true, fillColor: '#000', color: 'white' },
    };
  
    // Encabezado del PDF
    content.push({ text: `Lista de Productos - Generado el ${formattedDateTime}`, style: 'header', alignment: 'center' });
    content.push({ text: '\n', style: 'space' });
  
    const tableBody = this.productos.map((producto) => {
      return [
        { text: producto.idProducto.toString(), style: 'productId' }, // Agrega el código del producto
        { text: producto.nombre, style: 'productName' },
        { text: `Precio: Q${producto.precio}`, style: 'productDetails' },
        { text: `Cantidad: ${producto.cantidad}`, style: 'productDetails' },
        { text: `Marca: ${producto.marca}`, style: 'productDetails' },
      ];
    });
  
    const table = {
      table: {
        headerRows: 1,
        widths: ['auto', '*', '*', '*', '*'], // Ajusta las anchuras de las columnas
        body: [
          [
            { text: 'Código', style: 'tableHeader' }, // Agrega la columna para el código del producto
            { text: 'Nombre', style: 'tableHeader' },
            { text: 'Precio', style: 'tableHeader' },
            { text: 'Cantidad', style: 'tableHeader' },
            { text: 'Marca', style: 'tableHeader' },
          ],
          ...tableBody,
        ],
      },
      layout: 'lightHorizontalLines',
    };
  
    content.push(table);
  
    const documentDefinition = {
      content,
      styles: {
        header: { fontSize: 18, bold: true },
        space: { margin: [0, 10] },
        tableHeader: { bold: true, fontSize: 13, alignment: 'center' },
        productId: { fontSize: 12, bold: true }, // Estilo para el código del producto
        productName: { fontSize: 14, bold: true },
        productDetails: { fontSize: 12 },
        ...headerStyles,
      },
    };
  
    pdfMake.createPdf(documentDefinition).open(); // Abre el PDF en una nueva ventana
  }
  
  
  agregarAlCarrito(producto: Producto) {
    const carritoItem: CarritoItem = {
      id: null,
      producto: producto,
      cantidad: 1,
    };

    this.carritoService.agregarAlCarrito(carritoItem).subscribe(
      response => {
        console.log('Producto agregado al carrito:', producto);
        this.productoAgregado = true; // Mostrar el mensaje
        setTimeout(() => {
          this.productoAgregado = false; // Ocultar el mensaje después de un tiempo
        }, 3000); // Ajusta el tiempo según tus necesidades
        // Otras acciones si es necesario
      },
      error => {
        console.error('Error al agregar al carrito:', error);
        // Manejar el error si es necesario
      }
    );
  }
  
  

}
