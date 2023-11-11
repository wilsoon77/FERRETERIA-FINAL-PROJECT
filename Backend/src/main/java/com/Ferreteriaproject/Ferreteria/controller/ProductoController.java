package com.Ferreteriaproject.Ferreteria.controller;


import com.Ferreteriaproject.Ferreteria.model.Producto;
import com.Ferreteriaproject.Ferreteria.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.lang.model.util.Elements;
import java.util.List;

@RestController
@RequestMapping("/producto")
@CrossOrigin(origins = {"http://localhost:4200","http://localhost:8080"})
public class ProductoController {
    @Autowired
    private ProductoService productoService;

    @PostMapping("/nuevo")
    public Producto newProducto(@RequestBody Producto newProducto){
        return this.productoService.newProducto(newProducto);
    }

    @GetMapping({"/mostrar","/"})
    public Iterable<Producto>getAll(){
        return productoService.getAll();
    }

    @PostMapping("/update")
    public Producto updateProducto(@RequestBody Producto producto){

        return this.productoService.modifyProducto(producto);
    }

    @PostMapping(value = "/{id}")
    public Boolean deleteProducto(@PathVariable(value = "id") Long id){

        return this.productoService.deleteProducto(id);
    }

    @GetMapping("/buscar")
    public List<Producto> buscarProductos(@RequestParam("palabraClave") String palabraClave) {
        return productoService.buscarProductosPorPalabraClave(palabraClave);
    }

}
