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

  constructor() {
    this.showComments = false;
  }

  ngOnInit() {
    switch (this.category.id) {
      case 'aaa':
        this.comments = [
          {
            id: 'cdd',
            commenter: 'Mr Smith',
            contentType: 'CATEGORY',
            contentId: 'aaa',
            content: 'Very important topic'
          }
        ];
        this.scores = [
          {
            id: 'scc',
            giver: 'John Doe',
            contentType: 'CATEGORY',
            contentId: 'aaa',
            mark: 5
          }
        ];
        break;
      case 'bbb':
        this.comments = [
          {
            id: 'cza',
            commenter: 'Mr Smith',
            contentType: 'CATEGORY',
            contentId: 'bbb',
            content: 'Must known'
          }
        ];
        this.scores = [
          {
            id: 'sza',
            giver: 'John Doe',
            contentType: 'CATEGORY',
            contentId: 'bbb',
            mark: 5
          }
        ];
        break;
    }
  }

  toggleShowComments() {
    this.showComments = !this.showComments;
  }
}