export const DECIMAL_NUMBER = { minimumFractionDigits:2, maximumFractionDigits:2, style:"decimal" };
export const INTEGER_NUMBER = { minimumFractionDigits:0, maximumFractionDigits:0, style:"decimal" };
export const CURRENCY_NUMBER = { minimumFractionDigits:2, maximumFractionDigits:2, style:"currency" };
export const PERCENT_NUMBER = { minimumFractionDigits:2, maximumFractionDigits:2, style:"percent" };

export class numberFormatter {
  constructor(locale="en-US", options=DECIMAL_NUMBER, currency) {
    this.currency = currency;
    this.locale = locale;
    this.options = options;
    if (currency) {
      this.options = {...options, currency:currency}
    }
    this.intl = new Intl.NumberFormat(locale, this.options);
  }

  currencyDisplay(newCurrencyDisplay) {
    this.options = {...this.options, currencyDisplay: newCurrencyDisplay };
    this.intl = new Intl.NumberFormat(this.locale, this.options);
  }

  minimumFractionDigits(newMinimumFractionDigits) {
    this.options = {...this.options, minimumFractionDigits: newMinimumFractionDigits };
    this.intl = new Intl.NumberFormat(this.locale, this.options);
  }

  useGrouping(newUseGrouping) {
    this.options = {...this.options, useGrouping:newUseGrouping};
    this.intl = new Intl.NumberFormat(this.locale, this.options);
  }

  toString(myNumber) {
    if (this.style === "currency") {
      if (! this.currency) {
        return "Error: No Currency";
      }
    }

    // return  myNumber.toLocaleString(this.locale, this.options);
    return this.intl.format(myNumber);
  }
}