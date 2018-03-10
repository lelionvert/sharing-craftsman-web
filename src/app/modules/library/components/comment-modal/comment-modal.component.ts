import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Comment } from '../../forms/comment.form';
import { CookieService } from '../../../../services/browser/cookie.service';
import { CommentService } from '../../services/comment.service';
import { COOKIES } from '../../../../config/keys.config';
import { HttpResponse } from 'selenium-webdriver/http';

@Component({
  selector: 'comment-modal',
  templateUrl: './comment-modal.component.html',
  styleUrls: ['./comment-modal.component.scss'],
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
export class CommentModalComponent {
  @Input() visible: boolean;
  @Input() contentName: string;
  @Input() contentType: string;
  @Input() contentId: string;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() commented = new EventEmitter();
  public model: Comment;
  private errorMessage: string;

  constructor(
    private cookieService: CookieService,
    private commentService: CommentService
  ) {
    this.model = new Comment('');
  }

  addComment() {
    this.commentService
    .addComment(
      this.cookieService.getCookie(COOKIES.username), 
      this.cookieService.getCookie(COOKIES.accessToken),
      this.contentType,
      this.contentId,
      this.model.comment
    )
    .subscribe(
      response => this.handleAddedCommentResponse(response),
      error => this.handleError(error)
    );
  }

  cancel() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  private handleAddedCommentResponse(response: HttpResponse) {
    this.commented.emit(true);
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  private handleError(error) {
    this.errorMessage = `Erreur lors d'ajout d'un commentaire : ${error.statusText}`;
  }
}