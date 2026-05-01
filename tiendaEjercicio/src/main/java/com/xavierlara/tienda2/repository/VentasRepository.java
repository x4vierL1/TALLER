package com.xavierlara.tienda2.repository;

import com.xavierlara.tienda2.entity.Ventas;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VentasRepository extends JpaRepository<Ventas,Integer> {
}
