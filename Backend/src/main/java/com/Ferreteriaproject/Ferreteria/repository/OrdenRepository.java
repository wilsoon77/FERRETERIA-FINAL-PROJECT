package com.Ferreteriaproject.Ferreteria.repository;
import com.Ferreteriaproject.Ferreteria.model.Orden;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrdenRepository extends JpaRepository<Orden, Long> {
    // Puedes agregar métodos personalizados aquí si es necesario
    void deleteById(Long id); // Método para eliminar una orden por su id
}
