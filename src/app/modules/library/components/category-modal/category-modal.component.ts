import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { CookieService } from '../../../../services/browser/cookie.service';
import { COOKIES } from '../../../../config/keys.config';
import { HttpResponse } from 'selenium-webdriver/http';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../forms/category.form';

@Component({
  selector: 'category-modal',
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.scss'],
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
      ])
    ])
  ]
})
export class CategoryModalComponent {
  @Input() visible: boolean;
  @Input() categoryId: string;
  @Input() categoryName: string;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() edited = new EventEmitter();
  public model: Category;
  private errorMessage: string;

  constructor(
    private cookieService: CookieService,
    private categoryService: CategoryService
  ) {
    this.model = new Category('');
  }

  updateCategory() {
    this.categoryService
      .updateCategory(
        this.cookieService.getCookie(COOKIES.username),
        this.cookieService.getCookie(COOKIES.accessToken),
        this.categoryId,
        this.model.category
      )
      .subscribe(
        response => this.handleUpdatedCategoryResponse(response),
        error => this.handleError(error)
      );
  }

  cancel() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  private handleUpdatedCategoryResponse(response: HttpResponse) {
    this.edited.emit(this.model.category);
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  private handleError(error) {
    this.errorMessage = `Erreur de l'édition de la catégorie : ${error.statusText}`;
  }
}