export const MONTHS = [
  { value: 0, name: 'January' },
  { value: 1, name: 'February' },
  { value: 2, name: 'Mars' },
  { value: 3, name: 'April' },
  { value: 4, name: 'Mai' },
  { value: 5, name: 'Juin' },
  { value: 6, name: 'July' },
  { value: 7, name: 'August' },
  { value: 8, name: 'September' },
  { value: 9, name: 'October' },
  { value: 10, name: 'November' },
  { value: 11, name: 'December' },
];

export const allYears = (startingYear: number) => {
  const years = [];
  const curentYear = new Date().getFullYear();
  for (let i = startingYear; i <= curentYear; i++) {
    years.push(i);
  }

  return years;
};
