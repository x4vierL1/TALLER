package com.xavierlara.tienda2.repository;

import com.xavierlara.tienda2.entity.Clientes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientesRepository extends JpaRepository<Clientes,Long> {
}
