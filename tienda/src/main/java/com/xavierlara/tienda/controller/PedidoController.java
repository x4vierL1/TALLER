package com.xavierlara.tienda.controller;
import com.xavierlara.tienda.entity.Pedido;
import com.xavierlara.tienda.entity.Producto;
import com.xavierlara.tienda.service.PedidoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Validated
@Controller
@RequestMapping("/pedido")
public class PedidoController {
    private final PedidoService pedidoService;

    public PedidoController(PedidoService pedidoService) {
        this.pedidoService = pedidoService;
    }

    @GetMapping
    public String listar(Model model){
        model.addAttribute("pedidos", pedidoService.listar());
        return "pedido";
    }

    @GetMapping ("/nuevo")
    public String mostrarFormulario(Model model){
        model.addAttribute("pedido", new Pedido());
        model.addAttribute("modoEdicion", false);
        return "pedido-form";
    }

    @PostMapping("/guardar")
    public String crear(@Valid @ModelAttribute("pedido")Pedido pedido, BindingResult result, Model model) {
        if (result.hasErrors()) {
            model.addAttribute("modoEdicion", false);
            return "pedido-form";
        }
        pedidoService.crear(pedido);
        return "redirect:/pedido";
    }

    @GetMapping("/editar/{id}")
    public String formularioEditar(Model model, @PathVariable Integer id) {

        model.addAttribute("pedido", pedidoService.buscarPorId(id));
        model.addAttribute("modoEdicion", true);

        return "pedido-form";
    }

    @PostMapping("/actualizar/{id}")
    public String actualizar(@PathVariable Integer id,
                             @Valid @ModelAttribute("pedido") Pedido pedido,
                             BindingResult result,
                             Model model) {

        if (result.hasErrors()) {
            model.addAttribute("modoEdicion", true);
            return "pedido-form";
        }

        pedidoService.actualizar(id, pedido);
        return "redirect:/pedido";
    }
    @GetMapping("/eliminar/{id}")
    public String eliminar(@PathVariable Integer id) {
        pedidoService.eliminar(id);
        return "redirect:/pedido";
    }

}