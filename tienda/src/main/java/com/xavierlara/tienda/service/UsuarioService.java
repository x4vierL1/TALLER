package com.xavierlara.tienda.service;

import com.xavierlara.tienda.entity.Usuario;
import java.util.List;

public interface UsuarioService {
    List<Usuario> listar();
    Usuario crear(Usuario usuario);
    Usuario actualizar(Integer id, Usuario usuario);
    Usuario buscarPorId(Integer id);
    void eliminar(Integer id);
    boolean existeCorreo(String correo);
    boolean existeNombreUsuario(String nombreUsuario);
    Usuario buscarPorCorreo(String correo);
    Usuario buscarPorNombreUsuario(String nombreUsuario);
}