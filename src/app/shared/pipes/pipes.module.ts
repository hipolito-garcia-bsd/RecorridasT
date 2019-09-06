import { NgModule } from '@angular/core';
import { ImagenPipe } from './imagen.pipe';
import { RecursosPipe } from './recursos.pipe';
import { JsonRowPipe } from './json-row.pipe';
import { JsonHeadPipe } from './json-head.pipe';
import { NumeroPositivoNegativoPipe } from './numero-positivo-negativo.pipe';
import { GuidPipe } from './guid/guid.pipe';

@NgModule({
  imports: [],
  declarations: [
    ImagenPipe,
    RecursosPipe,
    JsonRowPipe,
    JsonHeadPipe,
    NumeroPositivoNegativoPipe,
    GuidPipe
  ],
  exports: [
    ImagenPipe,
    RecursosPipe,
    JsonRowPipe,
    JsonHeadPipe,
    NumeroPositivoNegativoPipe
  ]
})
export class PipesModule { }
