import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import { CookieService } from '../../../../services/browser/cookie.service';
import { COOKIES } from '../../../../config/keys.config';
import { Category } from '../../models/category.model';
import { Comment } from '../../models/comment.model';
import { Score } from '../../models/score.model';
import { CommentService } from '../../services/comment.service';
import { ScoreService } from '../../services/score.service';
import { CONTENT_TYPES } from '../../../../config/app.config';
import { FavoriteService } from '../../services/favorite.service';

@Component({
  selector: 'sc-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  animations: [
    trigger(
      'showAnimation',
      [
        transition(
          ':enter', [
            style({ opacity: 0 }),
            animate('300ms', style({ opacity: 1 }))
          ]
        ),
        transition(
          ':leave', [
            style({ 'opacity': 1 }),
            animate('300ms', style({ opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class CategoryComponent implements OnInit {
  @Input() public category: Category;
  @Output() deleted = new EventEmitter();
  public comments: Comment[];
  public scores: Score[];
  public averageScore: number;
  public isFavorite: boolean;
  private favoriteId: string;
  private showComments: boolean;
  private showActions: boolean;
  private showAddCommentDialog: boolean;
  private showAddScoreDialog: boolean;
  private showEditCategoryDialog: boolean;
  private showDeleteCategoryDialog: boolean;
  private errorMessage: string;
  private contentType: string;

  constructor(
    private commentService: CommentService,
    private scoreService: ScoreService,
    private cookieSerivce: CookieService,
    private favoriteService: FavoriteService
  ) {
    this.isFavorite = false;
    this.showComments = false;
    this.showActions = false;
    this.showAddCommentDialog = false;
    this.showAddScoreDialog = false;
    this.showEditCategoryDialog = false;
    this.showDeleteCategoryDialog = false;
    this.comments = [];
    this.scores = [];
    this.contentType = CONTENT_TYPES.category;
    this.favoriteId = '';
  }

  ngOnInit() {
    this.getCategoryComments();
    this.getCategoryScores();
    this.getFavorites();
  }

  toggleShowComments() {
    this.showComments = !this.showComments;
  }

  toggleShowActions() {
    this.showActions = !this.showActions;
  }

  onClickShowAddComments() {
    this.showAddCommentDialog = !this.showAddCommentDialog;
    this.showActions = false;
  }

  onClickShowAddScore() {
    this.showAddScoreDialog = !this.showAddScoreDialog;
    this.showActions = false;
  }

  onClickShowEdit() {
    this.showEditCategoryDialog = !this.showEditCategoryDialog;
    this.showActions = false;
  }

  onClickShowDelete() {
    this.showDeleteCategoryDialog = !this.showDeleteCategoryDialog;
    this.showActions = false;
  }

  onAddToFavorites() {
    this.favoriteService
      .addToMyFavorites(
        this.cookieSerivce.getCookie(COOKIES.username),
        this.cookieSerivce.getCookie(COOKIES.accessToken),
        CONTENT_TYPES.category,
        this.category.id
      )
      .subscribe(
        response => this.handleAddToMyFavoritesResponse(response),
        error => this.handleError(error)
      )
  }

  onRemoveFromFavorites() {
    this.favoriteService
      .deleteFavorite(
        this.cookieSerivce.getCookie(COOKIES.username),
        this.cookieSerivce.getCookie(COOKIES.accessToken),
        this.favoriteId
      )
      .subscribe(
        response => this.handleRemoveFromMyFavoritesResponse(response),
        error => this.handleError(error)
      )
  }

  private handleAddedComment(event) {
    this.getCategoryComments();
  }

  private handleAddedScore(event) {
    this.getCategoryScores();
  }

  private handleEditedCategory(event: string) {
    this.category.name = event;
  }

  private handleDeletedCategory(event) {
    this.deleted.emit(true);
  }

  private handleDeleteKnowledge(event) {
    this.category.knowledges = this.category.knowledges.filter(knowledge => knowledge.id !== event);
  }

  private handleAddToMyFavoritesResponse(response) {
    this.getFavorites();
  }

  private handleRemoveFromMyFavoritesResponse(response) {
    this.getFavorites();
  }

  private getFavorites() {
    this.favoriteService
      .getFavorites(this.cookieSerivce.getCookie(COOKIES.username), this.cookieSerivce.getCookie(COOKIES.accessToken))
      .subscribe(
        response => this.checkIfIsFavorite(response.body),
        error => this.handleError(error)
      )
  }

  private getCategoryComments() {
    this.commentService
      .getCommentsByContentId(this.cookieSerivce.getCookie(COOKIES.username), this.cookieSerivce.getCookie(COOKIES.accessToken), this.category.id)
      .subscribe(
        response => this.handleGetComments(response),
        error => this.handleError(error)
      );
  }

  private getCategoryScores() {
    this.scoreService
      .getScoresByContentId(this.cookieSerivce.getCookie(COOKIES.username), this.cookieSerivce.getCookie(COOKIES.accessToken), this.category.id)
      .subscribe(
        response => this.handleGetScores(response),
        error => this.handleError(error)
      );
  }

  private checkIfIsFavorite(favorites) {
    const favorite = favorites.find(favorite => favorite.contentId === this.category.id);
    this.isFavorite = favorite !== undefined;
    if (this.isFavorite) this.favoriteId = favorite.id;
  }

  private handleGetComments(response) {
    this.comments = response.body;
  }

  private handleGetScores(response) {
    this.scores = response.body;
    this.averageScore = 0.0;
    this.scores.forEach(score => this.averageScore += score.mark);
    if (this.scores.length > 0)
      this.averageScore /= this.scores.length;
  }

  private handleError(error) {
    this.errorMessage = `Erreur lors de la récupération des données : ${error.statusText}`;
  }
}