package com.xavierlara.tienda2.controller;

import com.xavierlara.tienda2.entity.DetalleVenta;
import com.xavierlara.tienda2.service.DetalleVentaService;
import jakarta.validation.Valid;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.ui.Model;

@Validated
@Controller
@RequestMapping("/detalleventa")
public class DetalleVentaController {

    private final DetalleVentaService detalleVentaService;

    public DetalleVentaController(DetalleVentaService detalleVentaService) {
        this.detalleVentaService = detalleVentaService;
    }

    @GetMapping
    public String listar(Model model) {
        model.addAttribute("detalles", detalleVentaService.listar());
        return "detalleventa";
    }

    @GetMapping("/nuevo")
    public String mostrarFormulario(Model model) {
        model.addAttribute("detalleVenta", new DetalleVenta());
        model.addAttribute("modoEdicion", false);
        return "detalleventa-form";
    }

    @PostMapping("/guardar")
    public String crear(@Valid @ModelAttribute("detalleVenta") DetalleVenta detalleVenta,
                        BindingResult result,
                        Model model) {

        if (result.hasErrors()) {
            model.addAttribute("modoEdicion", false);
            return "detalleventa-form";
        }

        detalleVentaService.crear(detalleVenta);
        return "redirect:/detalleventa";
    }

    @GetMapping("/editar/{id}")
    public String formularioEditar(Model model, @PathVariable Integer id) {
        model.addAttribute("detalleVenta", detalleVentaService.buscarPorCodigo(id));
        model.addAttribute("modoEdicion", true);
        return "detalleventa-form";
    }

    @PostMapping("/actualizar/{id}")
    public String actualizar(@PathVariable Integer id,
                             @Valid @ModelAttribute("detalleVenta") DetalleVenta detalleVenta,
                             BindingResult result,
                             Model model) {

        if (result.hasErrors()) {
            model.addAttribute("modoEdicion", true);
            return "detalleventa-form";
        }

        detalleVentaService.actualizar(id, detalleVenta);
        return "redirect:/detalleventa";
    }

    @GetMapping("/eliminar/{id}")
    public String eliminar(@PathVariable Integer id) {
        detalleVentaService.eliminar(id);
        return "redirect:/detalleventa";
    }
}