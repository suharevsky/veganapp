/**
  Dark Mode service: restore current settings, toggle Dark Mode
  v1.2

  How to use:
  - Require Ionic Storage (https://ionicframework.com/docs/building/storage#usage)

  ```
    ionic cordova plugin add cordova-sqlite-storage && npm install --save @ionic/storage
  ```
  - Import IonicStorageModule in app.module.ts
  - Restore current settings in app.component.ts

  ```
    ...
    this.themeService.restore();
  ```
  - Add toggle control in desired page
*/

import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { Plugins, StatusBarStyle } from '@capacitor/core';
const { StatusBar } = Plugins;

const DARK_MODE_CLASS = 'dark-theme';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  constructor(private storage: Storage, public platform: Platform) {}

  toggleDarkMode(isDark = false, needUpdate = true) {
    if (needUpdate) this.storage.set(DARK_MODE_CLASS, isDark);
    document.body.classList.toggle(DARK_MODE_CLASS, isDark);

    if (this.platform.is('capacitor')) {
      if (isDark) {
        // iOS only
        StatusBar.setStyle({
          style: StatusBarStyle.Dark
        });

        // Android only
        StatusBar.setBackgroundColor({
          color: '#1e1e1e'
        })
      } else {
        // iOS only
        StatusBar.setStyle({
          style: StatusBarStyle.Light
        });

        // Android only
        StatusBar.setBackgroundColor({
          color: '#ffffff'
        })
      }
    }
  }

  getCurrentSetting() {
    return this.storage.get(DARK_MODE_CLASS);
  }

  /**
   * Experimental - unfinished
   * */
  useAutoDarkMode() {
    // Use matchMedia to check the user preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    this.toggleDarkMode(prefersDark.matches);

    // Listen for changes to the prefers-color-scheme media query
    prefersDark.addListener((mediaQuery) => this.toggleDarkMode(mediaQuery.matches));
  }

  restore() {
    this.storage.get(DARK_MODE_CLASS)
      .then(val => {
        this.toggleDarkMode(val, false);
      });
  }
}
