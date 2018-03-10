import { Component, OnInit, Input } from '@angular/core';
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
  public comments: Comment[];
  public scores: Score[];
  public averageScore: number;
  private showComments: boolean;
  private showActions: boolean;
  private showAddCommentDialog: boolean;
  private showAddScoreDialog: boolean;
  private errorMessage: String;
  private contentType: String;

  constructor(
    private commentService: CommentService,
    private scoreService: ScoreService,
    private cookieSerivce: CookieService
  ) {
    this.showComments = false;
    this.showActions = false;
    this.showAddCommentDialog = false;
    this.showAddScoreDialog = false;
    this.comments = [];
    this.scores = [];
    this.contentType = CONTENT_TYPES.category;
  }

  ngOnInit() {
    this.getCategoryComments();
    this.getCategoryScores();
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

  handleAddedComment(event) {
    this.getCategoryComments();
  }

  handleAddedScore(event) {
    this.getCategoryScores();
  }

  private getCategoryComments() {
    this.commentService
      .getCommentsByContentId(this.cookieSerivce.getCookie(COOKIES.username), this.cookieSerivce.getCookie(COOKIES.accessToken), this.category.id)
      .subscribe(
        response => this.handleGetComments(response),
        error => this.handleError(error)
      )
  }

  private getCategoryScores() {
    this.scoreService
      .getScoresByContentId(this.cookieSerivce.getCookie(COOKIES.username), this.cookieSerivce.getCookie(COOKIES.accessToken), this.category.id)
      .subscribe(
        response => this.handleGetScores(response),
        error => this.handleError(error)
      )
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