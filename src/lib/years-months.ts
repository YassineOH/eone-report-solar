export const MONTHS = [
  { value: 0, name: 'January' },
  { value: 1, name: 'February' },
  { value: 2, name: 'Mars' },
  { value: 3, name: 'April' },
  { value: 4, name: 'Mai' },
  { value: 5, name: 'June' },
  { value: 6, name: 'July' },
  { value: 7, name: 'August' },
  { value: 8, name: 'September' },
  { value: 9, name: 'October' },
  { value: 10, name: 'November' },
  { value: 11, name: 'December' },
];
export const MONTHS_AR = [
  { value: 0, name: 'يناير' },
  { value: 1, name: 'فبراير' },
  { value: 2, name: 'مارس' },
  { value: 3, name: 'أبريل' },
  { value: 4, name: 'ماي' },
  { value: 5, name: 'يونيو' },
  { value: 6, name: 'يوليوز' },
  { value: 7, name: 'غشت' },
  { value: 8, name: 'سبتمبر' },
  { value: 9, name: 'أكتوبر' },
  { value: 10, name: 'نونبر' },
  { value: 11, name: 'دجنبر' },
];

export const MONTHS_FR = [
  { value: 0, name: 'Janvier' },
  { value: 1, name: 'Février' },
  { value: 2, name: 'Mars' },
  { value: 3, name: 'avril' },
  { value: 4, name: 'Mai' },
  { value: 5, name: 'Juin' },
  { value: 6, name: 'Juillet' },
  { value: 7, name: 'Août' },
  { value: 8, name: 'Septembre' },
  { value: 9, name: 'Octobre' },
  { value: 10, name: 'Novembre' },
  { value: 11, name: 'Décembre' },
];

export const allYears = (startingYear: number) => {
  const years = [];
  const currentYear = new Date().getFullYear();
  for (let i = startingYear; i <= currentYear; i++) {
    years.push(i);
  }

  return years;
};
