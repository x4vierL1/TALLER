package com.xavierlara.tienda.controller;
import com.xavierlara.tienda.entity.Producto;
import com.xavierlara.tienda.entity.Usuario;
import com.xavierlara.tienda.service.ProductoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.xml.transform.Result;
import java.util.List;

@Validated
@Controller
@RequestMapping("/producto")
public class ProductoController {

    private final ProductoService productoService;

    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }

    @GetMapping
    public String listar(Model model){
        model.addAttribute("productos", productoService.listar());
                return "producto";
    }

    @GetMapping ("/nuevo")
    public String mostrarFormulario(Model model){
        model.addAttribute("producto", new Producto());
        model.addAttribute("modoEdicion", false);
        return "producto-form";
    }

    @PostMapping("/guardar")
        public String crear(@Valid @ModelAttribute("producto")Producto producto, BindingResult result, Model model) {
        if (result.hasErrors()) {
            model.addAttribute("modoEdicion", false);
            return "producto-form";
        }
        productoService.crear(producto);
        return "redirect:/producto";
    }

    @GetMapping("/editar/{id}")
    public String formularioEditar(Model model, @PathVariable Integer id) {

        model.addAttribute("producto", productoService.buscarPorId(id));
        model.addAttribute("modoEdicion", true);

        return "producto-form";
    }

    @PostMapping("/actualizar/{id}")
    public String actualizar(@PathVariable Integer id,
                             @Valid @ModelAttribute("producto") Producto producto,
                             BindingResult result,
                             Model model) {

        if (result.hasErrors()) {
            model.addAttribute("modoEdicion", true);
            return "producto-form";
        }

        productoService.actualizar(id, producto);
        return "redirect:/producto";
    }
    @GetMapping("/eliminar/{id}")
    public String eliminar(@PathVariable Integer id) {
        productoService.eliminar(id);
        return "redirect:/producto";
    }

}
