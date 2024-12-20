import { Component, EventEmitter, HostListener, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FireService } from '../../services/fire.service';

@Component({
  selector: 'app-form-modal',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './form-modal.component.html',
  styleUrl: './form-modal.component.css'
})
export class FormModalComponent {
  @Input() isOpen = false;
  @Output() onClose = new EventEmitter<any>();

  fb = inject(FormBuilder); // injecta la librería que permite crear formularios
  recipeForm!: FormGroup; // donde almacenamos el puntero al formulario
  fire = inject(FireService);

  constructor() {
    // Configurar el formulario con todos los campos requeridos
    this.recipeForm = this.fb.group({
      strMeal: new FormControl('', [Validators.required, Validators.minLength(3)]),
      strMealThumb: new FormControl('', Validators.required), // URL de la imagen
      strCategory: new FormControl('', Validators.required), // Categoría
      strArea: new FormControl('', Validators.required), // Área o país
      strIngredient1: new FormControl('', Validators.required), // Ingredientes
      strInstructions: new FormControl('', Validators.required), // Instrucciones
      strYoutube: new FormControl('', Validators.required), // URL de YouTube
    });
  }

  closeModal() {
    history.back();
  }

  // Escucha cambios en el historial del navegador
  @HostListener('window:popstate', ['$event'])
  onPopState(event: PopStateEvent) {
    this.onClose.emit("Me cierro");
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.closeModal();
    }
  }

  async createRecipe() {
    if (this.recipeForm.invalid) return;
    try {
      const recipe = await this.fire.createRecipe(this.recipeForm.value);
      this.recipeForm.reset();
      this.closeModal();
    } catch (err) {
      alert("Error al crear la receta " + err);
    }
  }
}
