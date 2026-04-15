package com.xavierlara.tienda.service;
import com.xavierlara.tienda.entity.DetallePedido;
import com.xavierlara.tienda.exception.ResourceNotFoundException;
import com.xavierlara.tienda.repository.DetallePedidoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DetallePedidoServiceImpl implements DetallePedidoService {
    private final DetallePedidoRepository detallePedidoRepository;

    public DetallePedidoServiceImpl(DetallePedidoRepository detallePedidoRepository) {
        this.detallePedidoRepository = detallePedidoRepository;
    }

    @Override
    public List<DetallePedido> listar() {
        return detallePedidoRepository.findAll();
    }

    @Override
    public DetallePedido crear(DetallePedido detallePedido) {
        detallePedido.setIdDetalle(null);
        return detallePedidoRepository.save(detallePedido);
    }

    @Override
    public DetallePedido actualizar(Integer id, DetallePedido detallePedido) {
        DetallePedido existente = buscarPorId(id);
        existente.setCantidadPedido(detallePedido.getCantidadPedido());
        existente.setPrecioUnitario(detallePedido.getPrecioUnitario());
        existente.setIdPedido(detallePedido.getIdPedido());
        existente.setIdProducto(detallePedido.getIdProducto());
        return detallePedidoRepository.save(existente);
    }

    @Override
    public DetallePedido buscarPorId(Integer id) {
        return detallePedidoRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Detalle con ID no encontrado " + id));
    }

    @Override
    public void eliminar(Integer id) {
        if (!detallePedidoRepository.existsById(id)) {
            throw new ResourceNotFoundException("Detalle no encontrado con ID: " + id);
        }
        detallePedidoRepository.deleteById(id);
    }
}
