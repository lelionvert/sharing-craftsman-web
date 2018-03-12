import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { LibraryRoutingModule } from './routing.module';
import { LibraryComponent } from './components/library/library.component';
import { CategoryComponent } from './components/category/category.component';
import { KnowledgeComponent } from './components/knowledge/knowledge.component';
import { CommentComponent } from './components/comment/comment.component';
import { ScoreComponent } from './components/score/score.component';
import { LibrarySearchComponent } from './components/library-search/library-search.component';
import { CategoryService } from './services/category.service';
import { CommentService } from './services/comment.service';
import { ScoreService } from './services/score.service';
import { FavoriteService } from './services/favorite.service';
import { KnowledgeService } from './services/knowledge.service';
import { LibraryCreationComponent } from './components/library-creation/library-creation.component';
import { CommentModalComponent } from './components/comment-modal/comment-modal.component';
import { ScoreModalComponent } from './components/score-modal/score-modal.component';
import { CategoryDeleteModalComponent } from './components/category-delete-modal/category-delete-modal.component';
import { CategoryUpdateModalComponent } from './components/category-update-modal/category-update-modal.component';
import { KnowledgeUpdateModalComponent } from './components/knowledge-update-modal/knowledge-update-modal.component';
import { KnowledgeDeleteModalComponent } from './components/knowledge-delete-modal/knowledge-delete-modal.component';
import { FavoritesComponent } from './components/favorites/favorites.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    LibraryRoutingModule
  ],
  declarations: [
    LibraryComponent,
    CategoryComponent,
    KnowledgeComponent,
    CommentComponent,
    ScoreComponent,
    LibrarySearchComponent,
    LibraryCreationComponent,
    CommentModalComponent,
    ScoreModalComponent,
    CategoryUpdateModalComponent,
    CategoryDeleteModalComponent,
    KnowledgeUpdateModalComponent,
    KnowledgeDeleteModalComponent,
    FavoritesComponent
  ],
  providers: [
    CategoryService,
    KnowledgeService,
    CommentService,
    ScoreService,
    FavoriteService
  ]
})
export class LibraryModule {}
