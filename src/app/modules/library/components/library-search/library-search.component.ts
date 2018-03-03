import {
  Component,
  Input, 
  Output,
  EventEmitter
} from '@angular/core';

import { Search } from '../../forms/search.form';

@Component({
  selector: 'sc-library-search',
  templateUrl: './library-search.component.html',
  styleUrls: ['./library-search.component.scss']
})
export class LibrarySearchComponent {
  public model: Search;
  @Output() search = new EventEmitter();

  constructor() {
    this.model = new Search('');
  }

  onSearch() {
    this.search.emit(this.model.search);
  }
}