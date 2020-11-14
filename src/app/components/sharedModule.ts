import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';

import {RandomAvatarComponent} from './random-avatar/random-avatar.component';
import {ProfileImageSlidesComponent} from './profile-image-slides/profile-image-slides.component';
import {SwipeCardComponent} from './swipe-card/swipe-card.component';
import {PlusIntroComponent} from './plus-intro/plus-intro.component';
import {PersonCardComponent} from './person-card/person-card.component';
import {SpotifyHighlightsComponent} from './spotify-highlights/spotify-highlights.component';
import {UIComponent} from './ui/ui.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
    ],
    declarations: [
        RandomAvatarComponent,
        ProfileImageSlidesComponent,
        SwipeCardComponent,
        PlusIntroComponent,
        PersonCardComponent,
        SpotifyHighlightsComponent,
        UIComponent
    ],
    providers: [],
    exports: [
        RandomAvatarComponent,
        ProfileImageSlidesComponent,
        UIComponent,
        SwipeCardComponent,
        PlusIntroComponent,
        PersonCardComponent,
        SpotifyHighlightsComponent,
    ]
})

export class SharedModule {
}
