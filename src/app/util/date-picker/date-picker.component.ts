

import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, } from '@angular/forms';

export const DATEPICKER_VALUE_ACCESSOR =  {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DatePickerComponent),
  multi: true
};

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  providers: [DATEPICKER_VALUE_ACCESSOR]
})
export class DatePickerComponent implements ControlValueAccessor {

  selectedDate: any;
  disabled = false;

  // Function to call when the date changes.
  onChange = (date?: Date) => {};

  // Function to call when the date picker is touched
  onTouched = () => {};

  writeValue(value: Date) {
    if (!value) return;
    this.selectedDate = {
      year: value.getFullYear(),
      month: value.getMonth(),
      day: value.getDate()
    }
  }

  registerOnChange(fn: (date: Date) => void): void {
    this.onChange = fn;
  }

  // Allows Angular to register a function to call when the input has been touched.
  // Save the function as a property to call later here.
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // Allows Angular to disable the input.
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // Write change back to parent
  onDateChange(value: Date) {
    this.onChange(value);
  }

  // Write change back to parent
  onDateSelect(value: any) {
    this.onChange(new Date(value.year, value.month - 1, value.day));
  }

}