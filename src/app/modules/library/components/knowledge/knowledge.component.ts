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

@Component({
  selector: 'sc-knowledge',
  templateUrl: './knowledge.component.html',
  styleUrls: ['./knowledge.component.scss'],
  animations: [
    trigger(
      'showComments',
      [
        transition(
          ':enter', [
            style({  opacity: 0 }),
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

  constructor() {
    this.showComments = false;
  }

  ngOnInit() {
    switch (this.knowledge.id) {
      case 'kaa':
        this.comments = [
          {
            id: 'caa',
            commenter: 'John Doe',
            contentType: 'KNOWLEDGE',
            contentId: 'kaa',
            content: 'This is a very good architecture'
          },
          {
            id: 'cbb',
            commenter: 'Foo Bar',
            contentType: 'KNOWLEDGE',
            contentId: 'kaa',
            content: 'Advanced technique'
          },
          {
            id: 'ccc',
            commenter: 'Mr Smith',
            contentType: 'KNOWLEDGE',
            contentId: 'kaa',
            content: 'I have it'
          }
        ];
        this.scores = [
          {
            id: 'saa',
            giver: 'John Doe',
            contentType: 'KNOWLEDGE',
            contentId: 'kaa',
            mark: 5
          }
        ];
        break;
      case 'kbb':
        this.comments = [
        ];
        this.scores = [
          {
            id: 'sbb',
            giver: 'John Doe',
            contentType: 'KNOWLEDGE',
            contentId: 'kbb',
            mark: 5
          }
        ];
        break;
      case 'kcc':
        this.comments = [
          {
            id: 'cab',
            commenter: 'John Doe',
            contentType: 'KNOWLEDGE',
            contentId: 'kcc',
            content: 'Often poorly understood'
          }
        ];
        this.scores = [
          {
            id: 'sab',
            giver: 'John Doe',
            contentType: 'KNOWLEDGE',
            contentId: 'kcc',
            mark: 5
          },
          {
            id: 'sac',
            giver: 'Foo Bar',
            contentType: 'KNOWLEDGE',
            contentId: 'kcc',
            mark: 3
          }
        ];
        break;
      case 'kcd':
        this.comments = [
          {
            id: 'cab',
            commenter: 'John Doe',
            contentType: 'KNOWLEDGE',
            contentId: 'kcd',
            content: 'Often poorly understood'
          },
          {
            id: 'cac',
            commenter: 'Foo Bar',
            contentType: 'KNOWLEDGE',
            contentId: 'kcd',
            content: 'Very hard to understand'
          }
        ];
        this.scores = [
          {
            id: 'sbd',
            giver: 'John Doe',
            contentType: 'KNOWLEDGE',
            contentId: 'kcd',
            mark: 5
          }
        ];
        break;
    }

    this.averageScore = 0.0;
    this.scores.forEach(score => this.averageScore += score.mark);
    this.averageScore /= this.scores.length;
  }

  toggleShowComments() {
    this.showComments = !this.showComments;
  }
  /*
    Will fetch its own comments and marks
  */
}