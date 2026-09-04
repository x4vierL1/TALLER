import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductoService } from '../../services/producto';

@Component({
  selector: 'app-registro-producto',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro-producto.html',
  styleUrl: './registro-producto.css'
})
export class RegistroProducto {

  productoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService
  ) {
    this.productoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
      precio: [0, [Validators.required, Validators.min(0.01)]],
      categoria: ['', Validators.required],
      stock: [0, [Validators.required, Validators.min(0)]]
    });
  }

  get campo() {
    return this.productoForm.controls;
  }

  registrarProducto() {
    if (this.productoForm.valid) {
      this.productoService.registrarProducto(this.productoForm.value);
    } else {
      this.productoForm.markAllAsTouched();
    }
  }

}