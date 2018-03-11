import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { CookieService } from '../../../../services/browser/cookie.service';
import { COOKIES } from '../../../../config/keys.config';
import { HttpResponse } from 'selenium-webdriver/http';
import { KnowledgeService } from '../../services/knowledge.service';

@Component({
  selector: 'knowledge-delete-modal',
  templateUrl: './knowledge-delete-modal.component.html',
  styleUrls: ['./knowledge-delete-modal.component.scss'],
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
export class KnowledgeDeleteModalComponent {
  @Input() visible: boolean;
  @Input() categoryId: string;
  @Input() knowledgeId: string;
  @Input() knowledgeTitle: string;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() deleted = new EventEmitter();
  private errorMessage: string;

  constructor(
    private cookieService: CookieService,
    private knowledgeService: KnowledgeService
  ) { }

  deleteKnowledge() {
    this.knowledgeService
      .deleteKnowledge(
        this.cookieService.getCookie(COOKIES.username),
        this.cookieService.getCookie(COOKIES.accessToken),
        this.categoryId,
        this.knowledgeId
      )
      .subscribe(
        response => this.handleDeletedKnowledgeResponse(response),
        error => this.handleError(error)
      );
  }

  cancel() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  private handleDeletedKnowledgeResponse(response: HttpResponse) {
    this.deleted.emit(this.knowledgeId);
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  private handleError(error) {
    this.errorMessage = `Erreur lors de la suppression du principe : ${error.statusText}`;
  }
}