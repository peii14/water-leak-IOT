export const DEFAULT_TOAST_MESSAGE = {
  loading: 'Loading...',
  success: 'Berhasil',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: (err: any) =>
    err?.response?.data?.message ?? 'Terjadi kesalahan, mohon coba lagi',
};
