import { Component, inject, Input, signal, WritableSignal } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { Recipe } from '../../model/recipe';
import { FireService } from '../../services/fire.service';
import { FormModalComponent } from '../../modal/form-modal/form-modal.component';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-list-recipes',
  standalone: true,
  imports: [NgClass, FormModalComponent],
  templateUrl: './list-recipes.component.html',
  styleUrl: './list-recipes.component.css'
})
export class ListRecipesComponent {
  api = inject(ApiService);
  router = inject(Router);
  fire = inject(FireService);
  itemCollection!: AngularFirestoreCollection<any>;


  @Input()
  type: string = '';

  @Input()
  subtype: string = '';

  isModalOpen: boolean = false;

  $state: WritableSignal<any> = signal({
    loading: false,
    error: false,
    data: []
  });

  ngOnInit() {
    // Al inicio del componente
    this.fetchData();
  }

  fetchData() {
    // Llamamos al Servicio
    this.$state.update(state => (
      { ...state, loading: true }
    ));

    let request;

    switch (this.type) {
      case 'category':
        request = this.api.getRecipesByCategory(this.subtype);
        break;
      case 'nationality':
        request = this.api.getRecipesByNationality(this.subtype);
        break;
      case undefined:
        request = this.fire.getRecipesWithID();
        break;
      default:
        console.log('Fetching Favorites')
        // let recipe:Recipe= {
        //   strMeal: 'Test',
        //   strMealThumb: 'test',
        //   strInstructions: 'test',
        //   strYoutube: 'test',
        //   strIngredients: 'test'
        // };
        // this.fire.createRecipe(recipe);
        this.fire.getRecipes().subscribe(data => {
          console.log(data);
        })
        request = null;
    }

    if (request) {
      // Subscribimos al observable
      (request as any).subscribe({
        next: (data: any) => {
          this.$state.update(state => (
            { ...state, loading: false, error: false, data: data }
          ));
        },
        error: (err: any) => {
          this.$state.update(state => (
            { ...state, loading: false, error: err, data: [] }
          ));
        }
      })
    } else
      //Error
      this.$state.update(state => (
        { ...state, loading: false, error: 'Categoría incorrecta' }
      ));
  }


  goToRecipe(idMeal: string) {
    // Ir a la pagina /recipe/:id
    this.router.navigate(['recipe', idMeal]);
  }

  goToFavoriteRecipe(idMeal: string) {
    // Ir a la pagina /favorite/:id
    this.router.navigate(['favorite', idMeal]);
  }

  openModal() {
    this.isModalOpen = true;
    history.pushState({}, document.title);
    //luego añadimos algo más
  }

  closeModal($event?: any) {
    if ($event) {
      console.log('Desde el componente que abre el modal' + $event);
    }
    this.isModalOpen = false;
  }

  async deleteRecipe(event: any, idMeal: string) {
    event.stopPropagation();
    try {
      console.log(idMeal)
      // Llamamos a la función deleteRecipe del servicio FireService para eliminar la receta
      await this.fire.deleteRecipe(idMeal);
      console.log('Receta eliminada con éxito');

    } catch (error) {
      console.error('Error al eliminar la receta:', error);
    }
  }

}
