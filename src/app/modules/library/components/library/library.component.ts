import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from "lodash";

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
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.getAllCategories();
  }

  handleSearch(search: string) {
    this.categories = _.cloneDeep(this.originalCategories);
    const categoriesToKeep = this.categories.filter(category => category.name.toLowerCase().indexOf(search.toLowerCase()) !== -1);
    const categoriesToAnalyze = this.categories.filter(category => category.name.toLowerCase().indexOf(search.toLowerCase()) === -1);
    categoriesToAnalyze.forEach(category => {
      const knowledgesToKeep = category.knowledges.filter(knowledge => knowledge.title.toLowerCase().indexOf(search.toLocaleLowerCase()) !== -1);
      if (knowledgesToKeep.length > 0) {
        category.knowledges = knowledgesToKeep;
        categoriesToKeep.push(category);
      }
    });
    this.categories = categoriesToKeep;
  }

  handleDeleteCategory(event) {
    this.getAllCategories();
  }

  private getAllCategories() {
    this.categoryService
      .getAllCategories()
      .subscribe(
        response => this.handleGetAllCategories(response),
        error => this.handleError(error)
      );
  }

  private handleGetAllCategories(response) {
    this.categories = response.body;
    this.originalCategories = response.body;
  }

  private handleError(error) {
    this.errorMessage = `Erreur lors de la récupération des données : ${error.statusText}`;
  }
}