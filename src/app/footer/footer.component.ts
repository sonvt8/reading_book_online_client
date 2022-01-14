import { Component, OnInit } from '@angular/core';
import { faMobileAlt, faBug, faEnvelope, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  faMobileAlt = faMobileAlt;
  faBug = faBug;
  faQuestion = faQuestionCircle;
  faEnvelope = faEnvelope;
  faPhoneAlt = faPhoneAlt;
  faFacebookSquare = faFacebookSquare;

  constructor() { }

  ngOnInit(): void {
  }

}
