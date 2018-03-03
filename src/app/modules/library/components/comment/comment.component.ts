import { Component, Input } from '@angular/core';

import { Comment } from '../../models/comment.model';

@Component({
  selector: 'sc-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {
  @Input() public comment: Comment;
}