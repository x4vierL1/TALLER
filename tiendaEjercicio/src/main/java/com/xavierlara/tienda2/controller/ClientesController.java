package com.xavierlara.tienda2.controller;

import com.xavierlara.tienda2.entity.Clientes;
import com.xavierlara.tienda2.service.ClientesService;
import jakarta.validation.Valid;
import org.springframework.ui.Model;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;



@Validated
@Controller
@RequestMapping("/clientes")
public class ClientesController {

    private final ClientesService clientesService;

    public ClientesController(ClientesService clientesService) {
        this.clientesService = clientesService;
    }


    @GetMapping
    public String listar(Model model) {
        model.addAttribute("clientes", clientesService.listar());
        return "clientes";
    }


    @GetMapping("/nuevo")
    public String mostrarFormulario(Model model) {
        model.addAttribute("cliente", new Clientes());
        model.addAttribute("modoEdicion", false);
        return "clientes-form";
    }


    @PostMapping("/guardar")
    public String crear(@Valid @ModelAttribute("cliente") Clientes cliente,
                        BindingResult result,
                        Model model) {

        if (result.hasErrors()) {
            model.addAttribute("modoEdicion", false);
            return "clientes-form";
        }

        clientesService.crear(cliente);
        return "redirect:/clientes";
    }


    @GetMapping("/editar/{dpi}")
    public String formularioEditar(@PathVariable Long dpi, Model model) {
        model.addAttribute("cliente", clientesService.buscarPorDpi(dpi));
        model.addAttribute("modoEdicion", true);
        return "clientes-form";
    }


    @PostMapping("/actualizar/{dpi}")
    public String actualizar(@PathVariable Long dpi,
                             @Valid @ModelAttribute("cliente") Clientes cliente,
                             BindingResult result,
                             Model model) {

        if (result.hasErrors()) {
            model.addAttribute("modoEdicion", true);
            return "clientes-form";
        }

        clientesService.actualizar(dpi, cliente);
        return "redirect:/clientes";
    }


    @GetMapping("/eliminar/{dpi}")
    public String eliminar(@PathVariable Long dpi) {
        clientesService.eliminar(dpi);
        return "redirect:/clientes";
    }
}