import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  accountlist: string[] = []
  constructor() { }
}
