import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { CookieService } from '../../../../services/browser/cookie.service';
import { COOKIES } from '../../../../config/keys.config';
import { HttpResponse } from 'selenium-webdriver/http';
import { Knowledge } from '../../forms/knowledge.form';
import { KnowledgeService } from '../../services/knowledge.service';

@Component({
  selector: 'knowledge-update-modal',
  templateUrl: './knowledge-update-modal.component.html',
  styleUrls: ['./knowledge-update-modal.component.scss'],
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
export class KnowledgeUpdateModalComponent {
  @Input() visible: boolean;
  @Input() categoryId: string;
  @Input() categoryName: string;
  @Input() knowledgeId: string;
  @Input() knowledgeTitle: string;
  @Input() knowledgeContent: string;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() edited = new EventEmitter();
  public model: Knowledge;
  private errorMessage: string;

  constructor(
    private cookieService: CookieService,
    private knowledgeService: KnowledgeService
  ) {
    this.model = new Knowledge('', '', '', '');
  }

  updateKnowledge() {
    this.knowledgeService
      .updateKnowledge(
        this.cookieService.getCookie(COOKIES.username),
        this.cookieService.getCookie(COOKIES.accessToken),
        this.categoryId,
        this.knowledgeId,
        this.model.title,
        this.model.content
      )
      .subscribe(
        response => this.handleUpdatedKnowledgeResponse(response),
        error => this.handleError(error)
      );
  }

  cancel() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  private handleUpdatedKnowledgeResponse(response: HttpResponse) {
    this.edited.emit(this.model);
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  private handleError(error) {
    this.errorMessage = `Erreur de l'édition du principe : ${error.statusText}`;
  }
}