import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StringCalculatorService {
  constructor() {}

  add(numbers: string): number {
    if (!numbers) {
      return 0;
    }

    const delimiterResult = this.getCustomDelimiter(numbers);
    let delimiters = delimiterResult.delimiters;
    numbers = delimiterResult.numbers;

    const numberArray = this.splitNumbers(numbers, delimiters);

    const negatives = numberArray.filter((n) => n < 0);
    if (negatives.length > 0) {
      throw new Error(`negative numbers not allowed ${negatives.join(', ')}`);
    }

    return numberArray.reduce((sum, n) => sum + n, 0);
  }

  private getCustomDelimiter(numbers: string): {
    delimiters: string[];
    numbers: string;
  } {
    let delimiters = [',', '\n'];
    if (numbers.startsWith('//')) {
      const endOfDelimiterIndex = numbers.indexOf('\n');
      const delimiterLine = numbers.substring(2, endOfDelimiterIndex);
      delimiters.push(delimiterLine);
      numbers = numbers.substring(endOfDelimiterIndex + 1);
    }
    return { delimiters, numbers };
  }

  private splitNumbers(numbers: string, delimiters: string[]): number[] {
    const regex = new RegExp(`[${delimiters.join('')}]`);
    return numbers
      .split(regex)
      .map((n) => parseInt(n, 10))
      .filter((n) => !isNaN(n));
  }
}
