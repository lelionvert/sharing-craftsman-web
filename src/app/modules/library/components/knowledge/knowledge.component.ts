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
import { Knowledge } from '../../models/knowledge.model';
import { Comment } from '../../models/comment.model';
import { Score } from '../../models/score.model';
import { CommentService } from '../../services/comment.service';
import { ScoreService } from '../../services/score.service';
import { CONTENT_TYPES, HTTP_RESPONSE } from '../../../../config/app.config';
import { FavoriteService } from '../../services/favorite.service';
import { AuthorizationService } from '../../../../services/authorization/authorization.service';

@Component({
  selector: 'sc-knowledge',
  templateUrl: './knowledge.component.html',
  styleUrls: ['./knowledge.component.scss'],
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
export class KnowledgeComponent implements OnInit {
  @Input() public knowledge: Knowledge;
  @Input() public categoryId: string;
  @Output() deleted = new EventEmitter();
  public comments: Comment[];
  public scores: Score[];
  public isFavorite: boolean;
  public averageScore: number;
  private favoriteId: string;
  private showComments: boolean;
  private showActions: boolean;
  private showAddCommentDialog: boolean;
  private showAddScoreDialog: boolean;
  private showEditCategoryDialog: boolean;
  private showDeleteCategoryDialog: boolean;
  private errorMessage: string;
  private contentType: string;
  private isAuthenticated: boolean;

  constructor(
    private commentService: CommentService,
    private scoreService: ScoreService,
    private cookieService: CookieService,
    private favoriteService: FavoriteService,
    private authorizationService: AuthorizationService
  ) {
    this.showComments = false;
    this.showActions = false;
    this.comments = [];
    this.scores = [];
    this.contentType = CONTENT_TYPES.knowledge;
    this.isAuthenticated = false;
  }

  ngOnInit() {
    this.getKnowledgeComments();
    this.getKnowledgeScores();
    this.checkIfAuthenticated();
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
        this.cookieService.getCookie(COOKIES.username),
        this.cookieService.getCookie(COOKIES.token),
        CONTENT_TYPES.knowledge,
        this.knowledge.id
      )
      .subscribe(
        response => this.handleAddToMyFavoritesResponse(response),
        error => this.handleError(error)
      )
  }

  onRemoveFromFavorites() {
    this.favoriteService
      .deleteFavorite(
        this.cookieService.getCookie(COOKIES.username),
        this.cookieService.getCookie(COOKIES.token),
        this.favoriteId
      )
      .subscribe(
        response => this.handleRemoveFromMyFavoritesResponse(response),
        error => this.handleError(error)
      )
  }

  handleAddedComment(event) {
    this.getKnowledgeComments();
  }

  handleAddedScore(event) {
    this.getKnowledgeScores();
  }

  handleEditedKnowledge(event) {
    this.knowledge.title = event.title;
    this.knowledge.content = event.content;
  }

  handleDeletedKnowledge(event) {
    this.deleted.emit(this.knowledge.id);
  }

  private handleAddToMyFavoritesResponse(response) {
    this.showActions = false;
    this.getFavorites();
  }

  private handleRemoveFromMyFavoritesResponse(response) {
    this.showActions = false;
    this.getFavorites();
  }

  private getFavorites() {
    this.favoriteService
      .getFavorites(this.cookieService.getCookie(COOKIES.username), this.cookieService.getCookie(COOKIES.token))
      .subscribe(
        response => this.checkIfIsFavorite(response.body),
        error => this.handleError(error)
      )
  }

  private getKnowledgeComments() {
    this.commentService
      .getCommentsByContentId(this.knowledge.id)
      .subscribe(
        response => this.handleGetComments(response),
        error => this.handleError(error)
      )
  }

  private getKnowledgeScores() {
    this.scoreService
      .getScoresByContentId(this.knowledge.id)
      .subscribe(
        response => this.handleGetScores(response),
        error => this.handleError(error)
      )
  }

  private checkIfIsFavorite(favorites) {
    const favorite = favorites.find(favorite => favorite.contentId === this.knowledge.id);
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

  private checkIfAuthenticated() {
    this.authorizationService
      .isAuthenticated()
      .subscribe(
        response => this.handleAuthenticatedResponse(response),
        error => this.handleAuthenticatedResponse(error)
      );
  }

  private handleAuthenticatedResponse(response) {
    if (response.status === HTTP_RESPONSE.OK) {
      this.isAuthenticated = true;
      this.getFavorites();
    } else {
      this.isAuthenticated = false;
    }
  }
}