import { Component, OnInit } from '@angular/core';
import { faMobileAlt, faBug, faEnvelope, faPhoneAlt} from '@fortawesome/free-solid-svg-icons';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import { faFacebookSquare, faSkype } from '@fortawesome/free-brands-svg-icons';
import { Information } from '../_models/information';
import { DataService } from '../_services/data.service';

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
  faSkype = faSkype;

  info!: Information;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getDataHeader();
  }

  getDataHeader(){
    this.dataService.getData().subscribe(res => {
      this.info = res.information;
    });
  }
}
