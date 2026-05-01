package com.xavierlara.tienda2.service;

import com.xavierlara.tienda2.entity.DetalleVenta;
import com.xavierlara.tienda2.exception.ResourceNotFoundException;
import com.xavierlara.tienda2.repository.DetalleVentaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DetalleVentaServiceImpl implements DetalleVentaService{
    private final DetalleVentaRepository detalleVentaRepository;

    public DetalleVentaServiceImpl(DetalleVentaRepository detalleVentaRepository) {
        this.detalleVentaRepository = detalleVentaRepository;
    }


    @Override
    public List<DetalleVenta> listar() {
        return detalleVentaRepository.findAll();
    }

    @Override
    public DetalleVenta crear(DetalleVenta detalleVenta) {
        detalleVenta.setCodigoDetalleVenta(null);
        return detalleVentaRepository.save(detalleVenta);
    }

    @Override
    public DetalleVenta buscarPorCodigo(Integer codigo) {
        return detalleVentaRepository.findById(codigo).orElseThrow(()-> new ResourceNotFoundException("Detalle con codigo, no encontrado: "+ codigo));
    }

    @Override
    public DetalleVenta actualizar(Integer codigo, DetalleVenta detalleVenta) {
        DetalleVenta detalleVentaExistente = buscarPorCodigo(codigo);

        detalleVentaExistente.setCantidad(detalleVenta.getCantidad());
        detalleVentaExistente.setPrecioUnitario(detalleVenta.getPrecioUnitario());
        detalleVentaExistente.setSubtotal(detalleVenta.getSubtotal());
        detalleVentaExistente.setProductosCodigoProducto(detalleVenta.getProductosCodigoProducto());
        detalleVentaExistente.setVentasCodigoVenta(detalleVenta.getVentasCodigoVenta());

        return detalleVentaRepository.save(detalleVentaExistente);
    }

    @Override
    public void eliminar(Integer codigo) {
        if (!detalleVentaRepository.existsById(codigo)){
            throw new ResourceNotFoundException("Detalle con codigo, no encontrado: "+ codigo);
        }
        DetalleVenta detalleVentaExistente = buscarPorCodigo(codigo);
        detalleVentaRepository.deleteById(codigo);
    }
}
