import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Knowledge } from '../../forms/knowledge.form';
import { Category } from '../../models/category.model';
import { CookieService } from '../../../../services/browser/cookie.service';
import { CategoryService } from '../../services/category.service';
import { KnowledgeService } from '../../services/knowledge.service';
import { COOKIES } from '../../../../config/keys.config';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpResponse } from 'selenium-webdriver/http';
import { SEARCH_KEYS } from '../../../../config/app.config';

@Component({
  selector: 'sc-library-creation',
  templateUrl: './library-creation.component.html',
  styleUrls: ['./library-creation.component.scss']
})
export class LibraryCreationComponent implements OnInit {
  public model: Knowledge;
  private categories: Category[];
  private errorMessage: string;

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private categoryService: CategoryService,
    private knowledgeService: KnowledgeService
  ) {
    this.model = new Knowledge('', '', '', '');
    this.categories = [];
  }

  ngOnInit() {
    this.categoryService
    .getAllCategories(
      this.cookieService.getCookie(COOKIES.username), 
      this.cookieService.getCookie(COOKIES.accessToken)
    )
    .subscribe(
      response => this.handleGetAllCategories(response),
      error => this.handleErrorResponse(error)
    );
  }

  create() {
    if (this.model.categoryId.length === 0) {
      this.createCategory();
    } else {
      this.createKnowledge();
    }
  }

  cancel() {
    this.router.navigateByUrl('/library');
  }

  onSelectCategory(categoryId: string) {
    this.model.categoryId = categoryId;
    this.model.categoryName = this.categories.find(category => category.id === categoryId).name;
  }

  onTypeNewCategory(category: string) {
    this.model.categoryId = '';
    this.model.categoryName = category;
  }

  private handleGetAllCategories(response) {
    this.categories = response.body;
  }

  private createCategory() {
    this.categoryService
      .createCategory(
        this.cookieService.getCookie(COOKIES.username), 
        this.cookieService.getCookie(COOKIES.accessToken), 
        this.model.categoryName
      )
      .subscribe(
        response => this.searchCategories(),
        error => this.handleErrorResponse(error)
      );
  }

  private searchCategories() {
    const searchCriteria = {};
    searchCriteria[SEARCH_KEYS.categoryName] = this.model.categoryName;

    this.categoryService
      .searchCategories(
        this.cookieService.getCookie(COOKIES.username), 
        this.cookieService.getCookie(COOKIES.accessToken),
        searchCriteria
      )
      .subscribe(
        response => {
          this.model.categoryId = response.body[0].id;
          this.createKnowledge()
        },
        error => this.handleErrorResponse(error)
      );
  }

  private createKnowledge() {
    this.knowledgeService
    .addKnowledgeToCategory(
      this.cookieService.getCookie(COOKIES.username), 
        this.cookieService.getCookie(COOKIES.accessToken),
      this.model.categoryId,
      this.model.title,
      this.model.content
    )
    .subscribe(
      response => this.handleKnowledgeCreatedResponse(response),
      error => this.handleErrorResponse(error)
    );
  }

  private handleKnowledgeCreatedResponse(response: HttpResponse) {
    this.router.navigateByUrl('/library');
  }

  private handleErrorResponse(error: HttpErrorResponse) {
    this.errorMessage = `Erreur : ${error.statusText}`;
  }
}