import toast from 'react-hot-toast';

import api from '@/_lib/axios';
import logger from '@/_lib/logger';

type GetPrintProps = {
  fileName: string;
  route: string;
};

export async function printExcel({
  fileName,
  route,
}: GetPrintProps): Promise<void> {
  try {
    const response = await toast.promise(
      api.get(route, { responseType: 'blob' }),
      {
        loading: 'Downloading...',
        success: 'Download success',
        error: 'Fail to download file',
      }
    );

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName ?? 'file.xlsx');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    logger(error);
  }
}

export async function printPdf({ fileName }: { fileName: string }) {
  try {
    return fileName;
  } catch (error) {
    logger(error);
  }
}
