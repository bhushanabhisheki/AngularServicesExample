import { EventEmitter, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserService {
  activatedEmmiter = new EventEmitter<boolean>();
}
