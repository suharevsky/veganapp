import { Component, OnInit, Input } from '@angular/core';
import {ConfigService} from '../../services/config/config.service';

@Component({
  selector: 'person-card',
  templateUrl: './person-card.component.html',
  styleUrls: ['./person-card.component.scss'],
})
export class PersonCardComponent implements OnInit {
  @Input() data: any;

  constructor(public configService: ConfigService) {
  }

  ngOnInit() {}

}
