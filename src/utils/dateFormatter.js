export const SHORT_DATE = { year: "numeric", month: "numeric", day: "numeric" };
export const MEDIUM_DATE = {  year: "numeric", month: "short", day: "numeric" };
export const LONG_DATE = {  year: "numeric", month: "long", day: "numeric" }
export const FULL_DATE = { weekday: "long", year: "numeric", month: "long", day: "numeric" }

export class dateFormatter {
  constructor(locale="en-US", options=SHORT_DATE ) {
    this.options = options;
    this.locale = locale;
    this.intl = new Intl.DateTimeFormat(locale, options);
  }

  toString(myDate) {
      return this.intl.format(myDate);
  }
}
