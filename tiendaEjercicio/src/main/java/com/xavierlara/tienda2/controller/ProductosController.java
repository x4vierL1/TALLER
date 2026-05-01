package com.xavierlara.tienda2.controller;


import com.xavierlara.tienda2.entity.Productos;
import com.xavierlara.tienda2.service.ProductosService;
import jakarta.validation.Valid;
import org.springframework.ui.Model;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;



@Validated
@Controller
@RequestMapping("/productos")
public class ProductosController {

    private final ProductosService productosService;

    public ProductosController(ProductosService productosService) {
        this.productosService = productosService;
    }

    @GetMapping
    public String listar(Model model) {
        model.addAttribute("productos", productosService.listar());
        return "productos";
    }

    @GetMapping("/nuevo")
    public String mostrarFormulario(Model model) {
        model.addAttribute("producto", new Productos());
        model.addAttribute("modoEdicion", false);
        return "productos-form";
    }

    @PostMapping("/guardar")
    public String crear(@Valid @ModelAttribute("producto") Productos producto,
                        BindingResult result,
                        Model model) {

        if (result.hasErrors()) {
            model.addAttribute("modoEdicion", false);
            return "productos-form";
        }

        productosService.crear(producto);
        return "redirect:/productos";
    }

    @GetMapping("/editar/{codigo}")
    public String formularioEditar(@PathVariable Integer codigo, Model model) {
        model.addAttribute("producto", productosService.buscarPorCodigo(codigo));
        model.addAttribute("modoEdicion", true);
        return "productos-form";
    }

    @PostMapping("/actualizar/{codigo}")
    public String actualizar(@PathVariable Integer codigo,
                             @Valid @ModelAttribute("producto") Productos producto,
                             BindingResult result,
                             Model model) {

        if (result.hasErrors()) {
            model.addAttribute("modoEdicion", true);
            return "productos-form";
        }

        productosService.actualizar(codigo, producto);
        return "redirect:/productos";
    }

    @GetMapping("/eliminar/{codigo}")
    public String eliminar(@PathVariable Integer codigo) {
        productosService.eliminar(codigo);
        return "redirect:/productos";
    }
}