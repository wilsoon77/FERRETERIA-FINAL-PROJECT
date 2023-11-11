package com.Ferreteriaproject.Ferreteria.service;

import com.Ferreteriaproject.Ferreteria.model.*;
import com.Ferreteriaproject.Ferreteria.repository.OrdenRepository;
import com.Ferreteriaproject.Ferreteria.repository.ProductoRepository;
import com.Ferreteriaproject.Ferreteria.repository.DatosCompraRepository;
import com.Ferreteriaproject.Ferreteria.repository.CarritoItemRepository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class CarritoService {
    @Autowired
    private CarritoItemRepository carritoItemRepository;
    @Autowired
    private ProductoRepository productoRepository;
    @Autowired
    private OrdenRepository ordenRepository;

    @PersistenceContext
    private EntityManager entityManager;

    private List<CarritoItem> carrito = new ArrayList<>();

    public void agregarAlCarrito(CarritoItem carritoItem) {
        carrito.add(carritoItem);
    }

    public List<CarritoItem> obtenerContenidoDelCarrito() {
        return carrito;
    }

    @Autowired
    private DatosCompraRepository datosCompraRepository;

    public void incrementarCantidad(CarritoItem carritoItem, int cantidad) {
        int index = carrito.indexOf(carritoItem);
        if (index != -1) {
            carritoItem.setCantidad(carritoItem.getCantidad() + cantidad);
            carrito.set(index, carritoItem);
        }
    }

    public void disminuirCantidad(CarritoItem carritoItem, int cantidad) {
        int index = carrito.indexOf(carritoItem);
        if (index != -1) {
            int nuevaCantidad = carritoItem.getCantidad() - cantidad;
            if (nuevaCantidad <= 0) {
                carrito.remove(index);
            } else {
                carritoItem.setCantidad(nuevaCantidad);
                carrito.set(index, carritoItem);
            }
        }
    }

    public void eliminarDelCarrito(Long id) {
        carrito.removeIf(item -> item.getProducto().getIdProducto().equals(id));
    }

    public double calcularPrecioTotal() {
        double precioTotal = 0;
        for (CarritoItem item : carrito) {
            double precioProducto = Double.parseDouble(item.getProducto().getPrecio());
            precioTotal += precioProducto * item.getCantidad();
        }
        return precioTotal;
    }

    @Transactional
    public void realizarCompra(DatosCompraRequest datosCompraRequest) {
        DatosCompra datosCompra = new DatosCompra();
        datosCompra.setNombreCliente(datosCompraRequest.getNombreCliente());
        datosCompra.setDireccionCliente(datosCompraRequest.getDireccionCliente());
        datosCompra.setFechaEmision(new Date());
        datosCompra.setPrecioTotal(calcularPrecioTotal());

        // Guarda los datos de la compra en la tabla DatosCompra
        datosCompraRepository.save(datosCompra);

        Orden orden = new Orden();
        orden.setItems(carrito);
        orden.setFechaCompra(new Date());
        orden.setPrecioTotal(calcularPrecioTotal());

        ordenRepository.save(orden);

        carrito.clear();
    }
}
