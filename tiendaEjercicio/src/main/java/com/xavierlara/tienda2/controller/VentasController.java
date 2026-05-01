package com.xavierlara.tienda2.controller;

import com.xavierlara.tienda2.entity.Ventas;
import com.xavierlara.tienda2.service.VentasService;
import jakarta.validation.Valid;
import org.springframework.ui.Model;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;



@Validated
@Controller
@RequestMapping("/ventas")
public class VentasController {

    private final VentasService ventasService;

    public VentasController(VentasService ventasService) {
        this.ventasService = ventasService;
    }

    @GetMapping
    public String listar(Model model) {
        model.addAttribute("ventas", ventasService.listar());
        return "ventas";
    }

    @GetMapping("/nuevo")
    public String mostrarFormulario(Model model) {
        model.addAttribute("venta", new Ventas());
        model.addAttribute("modoEdicion", false);
        return "ventas-form";
    }

    @PostMapping("/guardar")
    public String crear(@Valid @ModelAttribute("venta") Ventas venta,
                        BindingResult result,
                        Model model) {

        if (result.hasErrors()) {
            model.addAttribute("modoEdicion", false);
            return "ventas-form";
        }

        ventasService.crear(venta);
        return "redirect:/ventas";
    }

    @GetMapping("/editar/{codigo}")
    public String formularioEditar(@PathVariable Integer codigo, Model model) {
        model.addAttribute("venta", ventasService.buscarPorCodigo(codigo));
        model.addAttribute("modoEdicion", true);
        return "ventas-form";
    }

    @PostMapping("/actualizar/{codigo}")
    public String actualizar(@PathVariable Integer codigo,
                             @Valid @ModelAttribute("venta") Ventas venta,
                             BindingResult result,
                             Model model) {

        if (result.hasErrors()) {
            model.addAttribute("modoEdicion", true);
            return "ventas-form";
        }

        ventasService.actualizar(codigo, venta);
        return "redirect:/ventas";
    }

    @GetMapping("/eliminar/{codigo}")
    public String eliminar(@PathVariable Integer codigo) {
        ventasService.eliminar(codigo);
        return "redirect:/ventas";
    }
}