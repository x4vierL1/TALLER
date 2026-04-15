package com.xavierlara.tienda.controller;
import com.xavierlara.tienda.entity.DetallePedido;
import com.xavierlara.tienda.service.DetallePedidoService;
import jakarta.validation.Valid;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


@Validated
@Controller
@RequestMapping("/detallepedido")
public class DetallePedidoController {
    private final DetallePedidoService detallePedidoService;

    public DetallePedidoController(DetallePedidoService detallePedidoService) {
        this.detallePedidoService = detallePedidoService;
    }

    @GetMapping
    public String listar(Model model) {
        model.addAttribute("detallepedido", detallePedidoService.listar());
        return "detallepedido";
    }

    @GetMapping("/nuevo")
    public String mostrarFormulario(Model model) {
        model.addAttribute("detallepedido", new DetallePedido());
        model.addAttribute("modoEdicion", false);
        return "detallepedido-form";
    }

    @PostMapping("/guardar")
    public String crear(@Valid @ModelAttribute("detallepedido") DetallePedido detallePedido, BindingResult result, Model model) {
        if (result.hasErrors()) {
            model.addAttribute("modoEdicion", false);
            return "detallepedido-form";
        }
        detallePedidoService.crear(detallePedido);
        return "redirect:/detallepedido";

    }
    @GetMapping("/editar/{id}")
    public String formularioEditar(Model model, @PathVariable Integer id) {

        model.addAttribute("detallepedido", detallePedidoService.buscarPorId(id));
        model.addAttribute("modoEdicion", true);

        return "detallepedido-form";
    }
    @PostMapping("/actualizar/{id}")
    public String actualizar(@PathVariable Integer id,
                             @Valid @ModelAttribute("detallepedido") DetallePedido detallePedido,
                             BindingResult result,
                             Model model) {

        if (result.hasErrors()) {
            model.addAttribute("modoEdicion", true);
            return "detallepedido-form";
        }

        detallePedidoService.actualizar(id, detallePedido);
        return "redirect:/detallepedido";
    }
    @GetMapping("/eliminar/{id}")
    public String eliminar(@PathVariable Integer id) {
        detallePedidoService.eliminar(id);
        return "redirect:/detallepedido";
    }

}
