import { formatLocaleDate } from '@/_lib/date';

type Option = {
  value: string;
  label: string;
};

const options: Option[] = [];

const currentDate = new Date();
const startYear = 2021;
const endYear = currentDate.getFullYear() + 1;

for (let year = startYear; year <= endYear; year++) {
  for (let month = 1; month <= 12; month++) {
    if (year === startYear && month < currentDate.getMonth() + 1) continue;
    if (year === endYear && month > currentDate.getMonth() + 1) continue;

    const monthString = month < 10 ? `0${month}` : `${month}`;
    const dateObj = new Date(`${year}-${monthString}-01`);

    options.push({
      value: `${year}-${monthString}-01`,
      label: formatLocaleDate(dateObj, 'MONTH_YEAR'),
    });
  }
}

export { options };
