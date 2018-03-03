import { Component, Input } from '@angular/core';

import { Score } from '../../models/score.model';

@Component({
  selector: 'sc-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent {
  @Input() public score: Score;
}