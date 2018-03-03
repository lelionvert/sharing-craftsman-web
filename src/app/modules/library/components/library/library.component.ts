import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from "lodash";

import { CookieService } from '../../../../services/browser/cookie.service';
import { COOKIES } from '../../../../config/keys.config';
import { Category } from '../../models/category.model';

@Component({
  selector: 'sc-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {
  public categories: Category[];
  private originalCategories: Category[];

  constructor() {
  }

  ngOnInit() {
    this.originalCategories = [
      {
        id: 'aaa',
        name: 'Architecture',
        knowledges: [
          {
            id: 'kaa',
            creator: 'John Doe',
            title: 'Hexagonale',
            content: 'Known as port and adapter',
          },
          {
            id: 'kbb',
            creator: 'John Doe',
            title: 'CQRS',
            content: 'Segregation of command and query'
          }
        ]
      },
      {
        id: 'bbb',
        name: 'SOLID',
        knowledges: [
          {
            id: 'kcc',
            creator: 'Foo Bar',
            title: 'Single responsibility principle',
            content: 'A thing must have one reason to change'
          },
          {
            id: 'kcd',
            creator: 'Foo Bar',
            title: 'Open close principle',
            content: 'Open to extension, closed to modification'
          }
        ]
      }
    ];

    this.categories = this.originalCategories;
  }

  handleSearch(search: string) {
    this.categories = _.cloneDeep(this.originalCategories);
    this.categories = this.categories.filter(category => category.name.toLowerCase().indexOf(search.toLowerCase()) > -1);
    this.categories.forEach(category => {
      category.knowledges = category.knowledges.filter(knowledge => knowledge.title.toLowerCase().indexOf(search.toLocaleLowerCase()) > -1);
    });
  }
}