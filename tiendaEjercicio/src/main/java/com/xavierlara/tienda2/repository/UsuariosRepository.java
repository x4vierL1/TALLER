package com.xavierlara.tienda2.repository;

import com.xavierlara.tienda2.entity.Usuarios;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuariosRepository extends JpaRepository<Usuarios,Integer> {
    Optional<Usuarios> findByEmail(String email);
}
