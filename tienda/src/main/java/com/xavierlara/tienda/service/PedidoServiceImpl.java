package com.xavierlara.tienda.service;
import com.xavierlara.tienda.entity.Pedido;
import com.xavierlara.tienda.exception.ResourceNotFoundException;
import com.xavierlara.tienda.repository.PedidoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PedidoServiceImpl implements PedidoService {
    private final PedidoRepository pedidoRepository;

    public PedidoServiceImpl(PedidoRepository pedidoRepository) {
        this.pedidoRepository = pedidoRepository;
    }

    @Override
    public List<Pedido> listar() {
        return pedidoRepository.findAll();
    }

    @Override
    public Pedido crear(Pedido pedido) {
        pedido.setIdPedido(null);
        return pedidoRepository.save(pedido);
    }

    @Override
    public Pedido actualizar(Integer id, Pedido pedido) {
        Pedido existente = buscarPorId(id);
        existente.setFechaPedido(pedido.getFechaPedido());
        existente.setTotalPedido(pedido.getTotalPedido());
        existente.setIdUsuario(pedido.getIdUsuario());
        return pedidoRepository.save(existente);
    }

    @Override
    public Pedido buscarPorId(Integer id) {
        return pedidoRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Pedido con ID no encontrado " + id));
    }

    @Override
    public void eliminar(Integer id) {
        if (!pedidoRepository.existsById(id)) {
            throw new ResourceNotFoundException("Pedido no encontrado con ID:" + id);
        }
        pedidoRepository.deleteById(id);
    }
}
