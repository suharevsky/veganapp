/**
  Read more: https://www.damirscorner.com/blog/posts/20190823-SwipebackGestureConfigurationInIonic4.html
*/

import { Injectable } from '@angular/core';
import { IonRouterOutlet } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class RouterService {
  private routerOutlet: IonRouterOutlet;

  private params: object;

  constructor() {}

  init(routerOutlet: IonRouterOutlet) {
    this.routerOutlet = routerOutlet;
  }

  public setParams(params) {
    this.params = params;
  }

  public getParams() {
    return this.params;
  }

  toggleSwipeBack(isEnabled: boolean) {
    if (this.routerOutlet) {
      this.routerOutlet.swipeGesture = isEnabled;
    } else {
      throw new Error('Call init() first!');
    }
  }
}
