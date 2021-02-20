import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatCheckboxModule, MatSelectModule, MatInputModule, MatAutocompleteModule } from '@angular/material';
import {MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatRadioModule} from '@angular/material/radio';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatTableModule,
    MatCheckboxModule,
    MatSelectModule,    
    MatInputModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatTreeModule,
    MatIconModule,
    MatDialogModule,
    MatProgressBarModule,
    MatRadioModule,
    MatTooltipModule
  ],
  exports: [
    MatTableModule,
    MatCheckboxModule,
    MatSelectModule,    
    MatInputModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatTreeModule,
    MatIconModule,
    MatDialogModule,
    MatProgressBarModule,
    MatRadioModule,
    MatTooltipModule
  ]
})
export class MaterialModule { }
