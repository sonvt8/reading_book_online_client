import { Component, OnInit } from '@angular/core';
import SwiperCore, { Navigation, Autoplay, SwiperOptions } from 'swiper';

SwiperCore.use([Navigation, Autoplay]);

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  config: SwiperOptions = {
    navigation: true,
    autoplay: true
  }

}
