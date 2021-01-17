import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
const STANDARD_INTEREST = 10;

interface displayLoanObject {
  finalAmount,
  emi
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  form: FormGroup;
  public emiObj:displayLoanObject;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      income: 150000,
      expense: 50000,
      repayment: '6',
      previous_emi: true,
      monthly_emi: 15000,
    });
    this.calculateEMI();
  }
  calculateEMI() {
    let loanAmount = this.form.value.income - this.form.value.monthly_emi;
    let term = this.form.value.repayment;
    let top = Math.pow(1 + STANDARD_INTEREST/1200, term);
    let bottom = top - 1;
    let ratio = top / bottom;
    let EMI = +loanAmount * +STANDARD_INTEREST/1200 * +ratio;
    let Total = +EMI * +term;
    this.emiObj = {
      emi: EMI.toFixed(0),
      finalAmount: Total.toFixed(0),
    };
  }
}
