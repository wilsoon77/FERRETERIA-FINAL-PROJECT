package com.Ferreteriaproject.Ferreteria.repository;

import com.Ferreteriaproject.Ferreteria.model.CarritoItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CarritoItemRepository extends JpaRepository<CarritoItem, Long> {
}
