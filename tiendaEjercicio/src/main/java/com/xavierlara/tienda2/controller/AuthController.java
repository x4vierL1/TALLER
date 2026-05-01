package com.xavierlara.tienda2.controller;
import com.xavierlara.tienda2.entity.Usuarios;
import com.xavierlara.tienda2.repository.UsuariosRepository;
import com.xavierlara.tienda2.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;

@Controller
public class AuthController {

    private final AuthService authService;
    private final UsuariosRepository usuariosRepository;

    public AuthController(AuthService authService, UsuariosRepository usuariosRepository) {
        this.authService = authService;
        this.usuariosRepository = usuariosRepository;
    }

    @GetMapping("/login")
    public String login(){
        return "login";
    }

    @GetMapping("/home")
    public String home(Model model, Principal principal){
        Usuarios usuario = usuariosRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));

        model.addAttribute("username", usuario.getUsername());
        model.addAttribute("rol", usuario.getRol());
        return "/home";
    }

    @GetMapping("/")
    public String redirectToHome(){
        return "redirect:/home";
    }

    @GetMapping("/register")
    public String register(Model model){
        model.addAttribute("usuario", new Usuarios());
        return "register";
    }

    @PostMapping("/register")
    public String registerFormulario(@Valid @ModelAttribute("usuario") Usuarios usuario, BindingResult result, Model model){
        if(result.hasErrors()){
            model.addAttribute("errores",result.getAllErrors());
            return "register";
        }

        authService.register(usuario.getUsername(),usuario.getPassword(),usuario.getEmail(), usuario.getRol(), usuario.getEstado());
        return "redirect:/login";

    }
}
