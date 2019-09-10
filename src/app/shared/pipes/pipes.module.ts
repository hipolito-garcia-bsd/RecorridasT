import { NgModule } from '@angular/core';
import { GuidPipe } from './guid/guid.pipe';

@NgModule({
  imports: [],
  declarations: [
    GuidPipe
  ],
  exports: [
    GuidPipe
  ]
})
export class PipesModule { }
