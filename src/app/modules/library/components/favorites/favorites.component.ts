import {
  Component,
  OnInit
} from '@angular/core';

import { CookieService } from '../../../../services/browser/cookie.service';
import { COOKIES } from '../../../../config/keys.config';
import { Favorite } from '../../models/favorite.model';
import { FavoriteService } from '../../services/favorite.service';
import { CategoryService } from '../../services/category.service';
import { KnowledgeService } from '../../services/knowledge.service';
import { HttpResponse } from 'selenium-webdriver/http';
import { Category } from '../../models/category.model';
import { CONTENT_TYPES } from '../../../../config/app.config';

@Component({
  selector: 'sc-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  public categories: Category[];
  private errorMessage: string;

  constructor(
    private cookieService: CookieService,
    private favoriteService: FavoriteService,
    private categoryService: CategoryService,
    private knowledgeService: KnowledgeService
  ) {
    this.categories = [];
  }

  ngOnInit() {
    this.getAllFavorites();
  }

  private getAllFavorites() {
    this.favoriteService
      .getFavorites(this.cookieService.getCookie(COOKIES.username), this.cookieService.getCookie(COOKIES.accessToken))
      .subscribe(
        response => this.handleGetFavoritesResponse(response.body),
        error => this.handleError(error)
      );
  }

  private handleGetFavoritesResponse(favorites) {
    console.log(favorites);
    favorites.forEach(favorite => {
      if (favorite.contentType === CONTENT_TYPES.category) {
        this.getCategory(favorite.contentId);
      } else {
        this.getKnowledge(favorite.contentId);
      }
    });
  }

  private getCategory(categoryId: string) {
    this.categoryService
      .getCategoryById(
        this.cookieService.getCookie(COOKIES.username),
        this.cookieService.getCookie(COOKIES.accessToken),
        categoryId
      )
      .subscribe(
        response => this.handleGetContentResponse(response.body),
        error => this.handleError(error)
      );
  }

  private getKnowledge(knowledgeId: string) {
    this.knowledgeService
      .getKnowledgeById(
        this.cookieService.getCookie(COOKIES.username),
        this.cookieService.getCookie(COOKIES.accessToken),
        knowledgeId
      )
      .subscribe(
        response => this.handleGetContentResponse(response.body),
        error => this.handleError(error)
      );
  }

  private handleGetContentResponse(category: Category) {
    console.log(category);
    this.categories.push(category);
  }

  private handleError(error) {
    this.errorMessage = `Erreur lors de la récupération des données : ${error.statusText}`;
  }
}