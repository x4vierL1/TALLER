package com.xavierlara.tienda2.service;

import com.xavierlara.tienda2.entity.Ventas;
import com.xavierlara.tienda2.exception.ResourceNotFoundException;
import com.xavierlara.tienda2.repository.VentasRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VentasServiceImpl implements VentasService {
    private final VentasRepository ventasRepository;

    public VentasServiceImpl(VentasRepository ventasRepository) {
        this.ventasRepository = ventasRepository;
    }

    @Override
    public List<Ventas> listar() {
        return ventasRepository.findAll();
    }

    @Override
    public Ventas crear(Ventas ventas) {
        ventas.setCodigoVenta(null);
        return ventasRepository.save(ventas);
    }

    @Override
    public Ventas buscarPorCodigo(Integer codigo) {
        return ventasRepository.findById(codigo).orElseThrow(()-> new ResourceNotFoundException("Venta con codigo, no encontrado: "+ codigo));
    }

    @Override
    public Ventas actualizar(Integer codigo, Ventas ventas) {
        Ventas ventaExistente = buscarPorCodigo(codigo);

        ventaExistente.setFechaVenta(ventas.getFechaVenta());
        ventaExistente.setTotal(ventas.getTotal());
        ventaExistente.setEstado(ventas.getEstado());
        ventaExistente.setClientesDpiCliente(ventas.getClientesDpiCliente());
        ventaExistente.setUsuariosCodigoUsuario(ventas.getUsuariosCodigoUsuario());

        return ventasRepository.save(ventaExistente);
    }


    @Override
    public void eliminar(Integer codigo) {
        if (!ventasRepository.existsById(codigo)){
            throw new ResourceNotFoundException("Detalle con codigo, no encontrado: "+ codigo);
        }
        Ventas ventaExistente = buscarPorCodigo(codigo);
        ventasRepository.deleteById(codigo);
    }

}
