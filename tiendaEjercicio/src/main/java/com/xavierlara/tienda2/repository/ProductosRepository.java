package com.xavierlara.tienda2.repository;

import com.xavierlara.tienda2.entity.Productos;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductosRepository extends JpaRepository<Productos,Integer> {
}
