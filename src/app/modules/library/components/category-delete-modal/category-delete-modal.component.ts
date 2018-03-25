import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { CookieService } from '../../../../services/browser/cookie.service';
import { COOKIES } from '../../../../config/keys.config';
import { HttpResponse } from 'selenium-webdriver/http';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../forms/category.form';

@Component({
  selector: 'category-delete-modal',
  templateUrl: './category-delete-modal.component.html',
  styleUrls: ['./category-delete-modal.component.scss'],
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
export class CategoryDeleteModalComponent {
  @Input() visible: boolean;
  @Input() categoryId: string;
  @Input() categoryName: string;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() deleted = new EventEmitter();
  private errorMessage: string;

  constructor(
    private cookieService: CookieService,
    private categoryService: CategoryService
  ) { }

  deleteCategory() {
    this.categoryService
      .deleteCategory(
        this.cookieService.getCookie(COOKIES.username),
        this.cookieService.getCookie(COOKIES.token),
        this.categoryId
      )
      .subscribe(
        response => this.handleDeletedCategoryResponse(response),
        error => this.handleError(error)
      );
  }

  cancel() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  private handleDeletedCategoryResponse(response: HttpResponse) {
    this.deleted.emit(this.categoryId);
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  private handleError(error) {
    this.errorMessage = `Erreur lors de la suppression de la catégorie : ${error.statusText}`;
  }
}