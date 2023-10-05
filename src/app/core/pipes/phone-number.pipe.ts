import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumber'
})
export class PhoneNumberPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (!value) return '';

    // Remove any non-numeric characters from the input
    const numericValue = value.replace(/\D/g, '');

    // Format the phone number into (XXX) XXX-XXXX
    const areaCode = numericValue.slice(0, 3);
    const firstPart = numericValue.slice(3, 6);
    const secondPart = numericValue.slice(6, 10);

    return `(${areaCode}) ${firstPart}-${secondPart}`;
  }

}
