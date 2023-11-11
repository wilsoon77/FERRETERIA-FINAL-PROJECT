package com.Ferreteriaproject.Ferreteria.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Producto {

    @Id
    private Long idProducto;

    @Column
    private String nombre;

    @Column
    private String cantidad;

    @Column
    private String precio;

    @Column
    private String marca;
}
