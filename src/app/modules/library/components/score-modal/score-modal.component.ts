import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Score } from '../../forms/score.form';
import { CookieService } from '../../../../services/browser/cookie.service';
import { COOKIES } from '../../../../config/keys.config';
import { HttpResponse } from 'selenium-webdriver/http';
import { ScoreService } from '../../services/score.service';

@Component({
  selector: 'score-modal',
  templateUrl: './score-modal.component.html',
  styleUrls: ['./score-modal.component.scss'],
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
export class ScoreModalComponent {
  @Input() visible: boolean;
  @Input() contentName: string;
  @Input() contentType: string;
  @Input() contentId: string;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() scored = new EventEmitter();
  public model: Score;
  private errorMessage: string;

  constructor(
    private cookieService: CookieService,
    private scoreService: ScoreService
  ) {
    this.model = new Score(0);
  }

  addScore() {
    this.scoreService
    .addScore(
      this.cookieService.getCookie(COOKIES.username), 
      this.cookieService.getCookie(COOKIES.token),
      this.contentType,
      this.contentId,
      this.model.score  
    )
    .subscribe(
      response => this.handleAddedScoreResponse(response),
      error => this.handleError(error)
    );
  }

  cancel() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  private handleAddedScoreResponse(response: HttpResponse) {
    this.scored.emit(true);
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  private handleError(error) {
    this.errorMessage = `Erreur lors d'ajout de note : ${error.statusText}`;
  }
}