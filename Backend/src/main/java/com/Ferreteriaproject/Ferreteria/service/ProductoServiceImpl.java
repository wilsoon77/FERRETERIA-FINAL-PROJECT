package com.Ferreteriaproject.Ferreteria.service;

import com.Ferreteriaproject.Ferreteria.model.Producto;
import com.Ferreteriaproject.Ferreteria.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductoServiceImpl implements ProductoService{
    @Autowired
    private ProductoRepository ProductoRepository;
    @Override
    public Producto newProducto(Producto newProducto) {
        return ProductoRepository.save(newProducto);
    }

    @Override
    public Iterable<Producto> getAll() {
        return this.ProductoRepository.findAll();
    }

    @Override
    public Producto modifyProducto(Producto producto) {
        Optional<Producto> productoEncontrado =this.ProductoRepository.findById(producto.getIdProducto());
        if (productoEncontrado.get() !=null){
            productoEncontrado.get().setNombre(producto.getNombre());
            productoEncontrado.get().setPrecio(producto.getPrecio());
            productoEncontrado.get().setCantidad(producto.getCantidad());
            productoEncontrado.get().setMarca(producto.getMarca());
            return this.newProducto(productoEncontrado.get());
        }
        return null;
    }

    @Override
    public Boolean deleteProducto(Long idProducto) {
        this.ProductoRepository.deleteById(idProducto);
        return true;
    }

    @Override
    public List<Producto> buscarProductosPorPalabraClave(String palabraClave) {
        return ProductoRepository.buscarPorPalabraClave(palabraClave);
    }
}
