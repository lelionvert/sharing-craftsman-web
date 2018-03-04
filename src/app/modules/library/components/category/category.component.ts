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

@Component({
  selector: 'sc-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  animations: [
    trigger(
      'showComments',
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
  private showComments: boolean;
  public averageScore: number;
  private errorMessage: string;

  constructor(
    private commentService: CommentService,
    private scoreService: ScoreService,
    private cookieSerivce: CookieService
  ) {
    this.showComments = false;
    this.comments = [];
    this.scores = [];
  }

  ngOnInit() {
    this.commentService
      .getCommentsByContentId(this.cookieSerivce.getCookie(COOKIES.username), this.cookieSerivce.getCookie(COOKIES.accessToken), this.category.id)
      .subscribe(
        response => this.handleGetComments(response),
        error => this.handleError(error)
      )

    this.scoreService
    .getScoresByContentId(this.cookieSerivce.getCookie(COOKIES.username), this.cookieSerivce.getCookie(COOKIES.accessToken), this.category.id)
    .subscribe(
      response => this.handleGetScores(response),
      error => this.handleError(error)
    )
  }

  toggleShowComments() {
    this.showComments = !this.showComments;
  }

  private handleGetComments(response) {
    this.comments = response.body;
  }

  private handleGetScores(response) {
    this.scores = response.body;
    this.averageScore = 0.0;
    this.scores.forEach(score => this.averageScore += score.mark);
    this.averageScore /= this.scores.length;
  }

  private handleError(error) {
    this.errorMessage = `Erreur lors de la récupération des données : ${error.statusText}`;
  }
}