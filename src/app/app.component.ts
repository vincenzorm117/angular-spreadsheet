import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  currencies = [
    {code: 'EUR', currency: 'Euro', level:	0.9033, color: 'green' },
    {code: 'JPY', currency: 'Japanese Yen	1', level:24.387, color: 'green' },
    {code: 'GBP', currency: 'Pound Sterling', level:	0.6396, color: 'green' },
    {code: 'CHF', currency: 'Swiss Franc', level:	0.9775, color: 'green' },
    {code: 'CAD', currency: 'Canadian Dollar', level:	1.3097, color: 'green' },
    {code: 'AUD', currency: 'Australian Dollar', level:	1.3589, color: 'green' },
    {code: 'NZD', currency: 'New Zealand Dollar', level:	1.5218, color: 'green' },
  ]

  keys = ['code','currency','level','color']

}
