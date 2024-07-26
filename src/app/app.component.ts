import { Component } from '@angular/core';
import { StringCalculatorService } from './string-calculator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'TDD';
  input: string = '';
  result: number | null = null;
  error: string | null = null;

  constructor(private stringCalculatorService: StringCalculatorService) {}

  calculate() {
    this.error = null;
    try {
      this.result = this.stringCalculatorService.add(this.input);
    } catch (e: any) {
      this.error = e.message;
    }
  }
}
