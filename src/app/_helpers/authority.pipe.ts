import { Pipe, PipeTransform } from '@angular/core';
import { Globals } from './globals';

@Pipe({
    name: 'authority'
})
export class AuthorityPipe implements PipeTransform {
    constructor(private globals: Globals) { }
    transform(value: any, ...args: any[]) {
        return value && this.globals.principal.hasAuthority(value);
    }

}
