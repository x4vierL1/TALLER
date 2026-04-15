package com.xavierlara.tienda.controller;

import com.xavierlara.tienda.entity.Categoria;
import com.xavierlara.tienda.service.CategoriaService;
import jakarta.validation.Valid;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;



@Validated
@Controller
@RequestMapping("/categoria")
public class CategoriaController {

    private final CategoriaService categoriaService;

    public CategoriaController(CategoriaService categoriaService) {
        this.categoriaService = categoriaService;
    }

    @GetMapping
    public String listar(Model model) {
        model.addAttribute("categoria", categoriaService.listar());
        return "categoria";
    }

    @GetMapping("/nuevo")
    public String mostrarFormulario(Model model) {
        model.addAttribute("categoria", new Categoria());
        model.addAttribute("modoEdicion", false);
        return "categoria-form";
    }

    @PostMapping("/guardar")
    public String crear(@Valid @ModelAttribute("categoria") Categoria categoria, BindingResult result, Model model) {
        if (result.hasErrors()) {
            model.addAttribute("modoEdicion", false);
            return "categoria-form";
        }
        categoriaService.crear(categoria);
        return "redirect:/categoria";

    }
    @GetMapping("/editar/{id}")
    public String formularioEditar(Model model, @PathVariable Integer id) {

        model.addAttribute("categoria", categoriaService.buscarPorId(id));
        model.addAttribute("modoEdicion", true);

        return "categoria-form";
    }
    @PostMapping("/actualizar/{id}")
    public String actualizar(@PathVariable Integer id,
                             @Valid @ModelAttribute("categoria") Categoria categoria,
                             BindingResult result,
                             Model model) {

        if (result.hasErrors()) {
            model.addAttribute("modoEdicion", true);
            return "categoria-form";
        }

        categoriaService.actualizar(id, categoria);
        return "redirect:/categoria";
    }
    @GetMapping("/eliminar/{id}")
    public String eliminar(@PathVariable Integer id) {
        categoriaService.eliminar(id);
        return "redirect:/categoria";
    }

}