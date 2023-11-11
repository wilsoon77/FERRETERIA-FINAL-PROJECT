package com.Ferreteriaproject.Ferreteria.model;

import jakarta.persistence.*;
import jakarta.transaction.Transactional;
import lombok.Data;

@Entity
@Data
@Transactional
public class CarritoItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "producto_id")
    private Producto producto;
    // Relación con la entidad Producto

    private int cantidad;
}
