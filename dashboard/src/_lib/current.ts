export function formatRupiah(number: number) {
  return `Rp${number?.toLocaleString('id-ID')}`;
}

export const inputRupiah = (value: string) => {
  if (!value) return '';
  const numericValue = value.replace(/[^0-9]/g, '');
  return 'Rp ' + numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
