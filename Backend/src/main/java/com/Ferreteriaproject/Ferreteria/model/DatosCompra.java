package com.Ferreteriaproject.Ferreteria.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data
@NoArgsConstructor
public class DatosCompra {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String nombreCliente;

    @Column
    private String direccionCliente;

    @Temporal(TemporalType.TIMESTAMP)
    @Column
    private Date fechaEmision;

    @Column
    private String precioTotal;

    // Constructor
    public DatosCompra(String nombreCliente, String direccionCliente, Date fechaEmision, String precioTotal) {
        this.nombreCliente = nombreCliente;
        this.direccionCliente = direccionCliente;
        this.fechaEmision = fechaEmision;
        this.precioTotal = precioTotal;
    }
    public void setPrecioTotal(double precioTotal) {
        this.precioTotal = String.valueOf(precioTotal);
    }
}
