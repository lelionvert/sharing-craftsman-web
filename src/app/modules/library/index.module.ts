import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { LibraryRoutingModule } from './routing.module';
import { LibraryComponent } from './components/library/library.component';
import { CategoryComponent } from './components/category/category.component';
import { KnowledgeComponent } from './components/knowledge/knowledge.component';
import { CommentComponent } from './components/comment/comment.component';
import { ScoreComponent } from './components/score/score.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    LibraryRoutingModule
  ],
  declarations: [
    LibraryComponent,
    CategoryComponent,
    KnowledgeComponent,
    CommentComponent,
    ScoreComponent
  ]
})
export class LibraryModule {}
