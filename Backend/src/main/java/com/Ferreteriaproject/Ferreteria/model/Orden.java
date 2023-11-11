package com.Ferreteriaproject.Ferreteria.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Entity
@Data
public class Orden {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany
    private List<CarritoItem> items; // Lista de elementos del carrito en la orden

    @Column
    private Date fechaCompra;

    @Column
    private double precioTotal; // Precio total de la orden
    @Column
    private String nombreCliente;
    @Column
    private String direccionCliente;


}
