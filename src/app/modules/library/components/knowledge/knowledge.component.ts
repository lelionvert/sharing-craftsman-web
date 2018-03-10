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
import { Knowledge } from '../../models/knowledge.model';
import { Comment } from '../../models/comment.model';
import { Score } from '../../models/score.model';
import { CommentService } from '../../services/comment.service';
import { ScoreService } from '../../services/score.service';

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
  public comments: Comment[];
  public scores: Score[];
  public averageScore: number;
  private showComments: boolean;
  private showActions: boolean;
  private errorMessage: string;

  constructor(
    private commentService: CommentService,
    private scoreService: ScoreService,
    private cookieService: CookieService
  ) {
    this.showComments = false;
    this.showActions = false;
    this.comments = [];
    this.scores = [];
  }

  ngOnInit() {
    this.commentService
    .getCommentsByContentId(this.cookieService.getCookie(COOKIES.username), this.cookieService.getCookie(COOKIES.accessToken), this.knowledge.id)
    .subscribe(
      response => this.handleGetComments(response),
      error => this.handleError(error)
    )

    this.scoreService
    .getScoresByContentId(this.cookieService.getCookie(COOKIES.username), this.cookieService.getCookie(COOKIES.accessToken), this.knowledge.id)
    .subscribe(
      response => this.handleGetScores(response),
      error => this.handleError(error)
    )
  }

  toggleShowComments() {
    this.showComments = !this.showComments;
  }

  toggleShowActions() {
    this.showActions = !this.showActions;
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