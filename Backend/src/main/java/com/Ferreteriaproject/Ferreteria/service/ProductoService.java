package com.Ferreteriaproject.Ferreteria.service;

import com.Ferreteriaproject.Ferreteria.model.Producto;

import java.util.List;

public interface ProductoService {

    Producto newProducto(Producto newProducto);

    Iterable<Producto> getAll();

    Producto modifyProducto(Producto producto);

    Boolean deleteProducto(Long idProducto);

    List<Producto> buscarProductosPorPalabraClave(String palabraClave);
}
