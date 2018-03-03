import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from "lodash";

import { CookieService } from '../../../../services/browser/cookie.service';
import { COOKIES } from '../../../../config/keys.config';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'sc-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {
  public categories: Category[];
  private originalCategories: Category[];
  private errorMessage: string;

  constructor(
    private categoryService: CategoryService,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    this.categoryService
      .getAllCategories(this.cookieService.getCookie(COOKIES.username), this.cookieService.getCookie(COOKIES.accessToken))
      .subscribe(
        response => this.handleGetAllCategories(response),
        error => this.handleError(error)
      );
  }

  handleSearch(search: string) {
    this.categories = _.cloneDeep(this.originalCategories);
    this.categories = this.categories.filter(category => category.name.toLowerCase().indexOf(search.toLowerCase()) > -1);
    this.categories.forEach(category => {
      category.knowledges = category.knowledges.filter(knowledge => knowledge.title.toLowerCase().indexOf(search.toLocaleLowerCase()) > -1);
    });
  }

  private handleGetAllCategories(response) {
    this.categories = response.body;
    this.originalCategories = response.body;
  }

  private handleError(error) {
    this.errorMessage = `Erreur lors de la récupération des données : ${error.statusText}`;
  }
}