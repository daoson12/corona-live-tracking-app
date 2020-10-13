import { Component, OnInit } from '@angular/core';
import { ServicesService } from './../services.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  countries: any;
  country: any;
  confirmed: Number;
  recovered: Number;
  deaths: Number
  constructor(private service: ServicesService) { }

  ngOnInit() {
    this.getCountries()
  }
  getCountries() {
    this.service.getCounttries().subscribe((data) => {
      this.countries = data
    })

  }
  getCoronaData() {
    this.service.getCoronaRealtimeData(this.country).subscribe((data) => {
      var index = data.length - 1
      this.confirmed = data[index].Confirmed
      this.recovered = data[index].Recovered
      this.deaths = data[index].Deaths
    })
  }
  getCountry(country: any) {
    this.country = country
  }
}
