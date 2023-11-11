package com.Ferreteriaproject.Ferreteria.controller;

import com.Ferreteriaproject.Ferreteria.model.CarritoItem;
import com.Ferreteriaproject.Ferreteria.model.DatosCompra;
import com.Ferreteriaproject.Ferreteria.model.DatosCompraRequest;
import com.Ferreteriaproject.Ferreteria.model.Orden;
import com.Ferreteriaproject.Ferreteria.service.CarritoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/carrito")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:8080"})
public class CarritoController {
    @Autowired
    private CarritoService carritoService;

    // Endpoint para agregar un producto al carrito
    @PostMapping("/agregar")
    public ResponseEntity<String> agregarAlCarrito(@RequestBody CarritoItem carritoItem) {
        // Lógica para agregar el elemento al carrito
        carritoService.agregarAlCarrito(carritoItem);
        return ResponseEntity.ok("Producto agregado al carrito.");
    }

    // Endpoint para obtener el contenido del carrito
    @GetMapping("/contenido")
    public List<CarritoItem> obtenerContenidoDelCarrito() {
        // Lógica para obtener y devolver el contenido del carrito
        return carritoService.obtenerContenidoDelCarrito();
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<String> eliminarDelCarrito(@PathVariable Long id) {
        // Lógica para eliminar el producto del carrito por su ID
        carritoService.eliminarDelCarrito(id);
        return ResponseEntity.ok("Producto eliminado del carrito.");
    }

    @PostMapping("/crear_orden")
    public ResponseEntity<String> crearOrdenDesdeCarrito(@RequestBody DatosCompraRequest datosCompraRequest) {
        try {
            carritoService.realizarCompra(datosCompraRequest);
            return ResponseEntity.ok("Orden creada correctamente a partir del carrito.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al crear la orden: " + e.getMessage());
        }
    }





}
