package com.xavierlara.tienda2.service;

import com.xavierlara.tienda2.entity.DetalleVenta;

import java.util.List;

public interface DetalleVentaService {
    List<DetalleVenta> listar();
    DetalleVenta crear(DetalleVenta detalleVenta);
    DetalleVenta actualizar(Integer codigo, DetalleVenta detalleVenta);
    DetalleVenta buscarPorCodigo(Integer codigo);
    void eliminar(Integer codigo);
}
