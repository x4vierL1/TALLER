package com.xavierlara.tienda.repository;

import com.xavierlara.tienda.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

    Optional<Usuario> findByCorreo(String correo);

    Optional<Usuario> findByNombreUsuario(String nombreUsuario);

    boolean existsByCorreo(String correo);

    boolean existsByNombreUsuario(String nombreUsuario);
}