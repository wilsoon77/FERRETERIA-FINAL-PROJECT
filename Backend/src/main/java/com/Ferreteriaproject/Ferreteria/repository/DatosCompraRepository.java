package com.Ferreteriaproject.Ferreteria.repository;

import com.Ferreteriaproject.Ferreteria.model.DatosCompra;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DatosCompraRepository extends JpaRepository<DatosCompra, Long> {
    // Puedes agregar métodos de consulta adicionales si es necesario
    List<DatosCompra> findByNombreCliente(String nombreCliente);

}
