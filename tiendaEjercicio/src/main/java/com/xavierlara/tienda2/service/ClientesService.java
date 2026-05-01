package com.xavierlara.tienda2.service;

import com.xavierlara.tienda2.entity.Clientes;

import java.util.List;

public interface ClientesService {
    List<Clientes> listar();
    Clientes crear(Clientes clientes);
    Clientes actualizar(Long dpi, Clientes clientes);
    Clientes buscarPorDpi(Long dpi);
    void eliminar(Long dpi);
}
