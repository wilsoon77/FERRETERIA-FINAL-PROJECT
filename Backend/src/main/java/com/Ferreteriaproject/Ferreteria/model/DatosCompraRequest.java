package com.Ferreteriaproject.Ferreteria.model;

import java.util.List;

public class DatosCompraRequest {
    private String nombreCliente;
    private String direccionCliente;

    public String getNombreCliente() {
        return nombreCliente;
    }

    public void setNombreCliente(String nombreCliente) {
        this.nombreCliente = nombreCliente;
    }

    public String getDireccionCliente() {
        return direccionCliente;
    }

    public void setDireccionCliente(String direccionCliente) {
        this.direccionCliente = direccionCliente;
    }

    // Otros getters y setters, si es necesario
}

