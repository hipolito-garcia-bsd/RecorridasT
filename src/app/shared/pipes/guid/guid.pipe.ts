import { Pipe, PipeTransform } from '@angular/core';
import { Guid } from 'guid-typescript';

@Pipe({
  name: 'guid',
  pure: true
})
export class GuidPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    switch (value) {
      case 'guid': return this.createGuid();
      case 'guidEmpty': return this.createGuidEmpty();
      case 'guidRaw': return this.createGuidRaw();
      default: return this.createGuid();
    }
  }

  createGuid(): Guid {
    return Guid.create();
  }

  createGuidEmpty(): Guid {
    return Guid.createEmpty();
  }

  createGuidRaw(): string {
    return Guid.raw();
  }
}
