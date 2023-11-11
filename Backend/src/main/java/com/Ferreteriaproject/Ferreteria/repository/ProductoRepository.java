package com.Ferreteriaproject.Ferreteria.repository;

import com.Ferreteriaproject.Ferreteria.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductoRepository extends JpaRepository<Producto, Long> {
    @Query("SELECT p FROM Producto p WHERE p.nombre LIKE %:palabraClave% OR p.marca LIKE %:palabraClave% OR CAST(p.idProducto AS string) LIKE :palabraClave")
    List<Producto> buscarPorPalabraClave(String palabraClave);


}
