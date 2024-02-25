'use client';

import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc =
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';

import PDFRapport from '@/pdf/Rapport';
import { FusionSolarDailyData } from '@/types/dailyData';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { buttonVariants } from './ui/button';

interface Props {
  dailyData: FusionSolarDailyData[];
  plantInfo: {
    plantName: string;
    capacity: number;
    gridConnectionDate: string;
    plantAddress: string;
  };
  time: number;
  text: string;
  rate: string;
  totalPower: number;
}
function DownloadButton({
  dailyData,
  plantInfo,
  time,
  text,
  totalPower,
  rate,
}: Props) {
  return (
    <PDFDownloadLink
      document={
        <PDFRapport
          dailyData={dailyData}
          plantInfo={plantInfo}
          time={time}
          rate={rate}
          totalPower={totalPower}
        />
      }
      fileName={plantInfo.plantName}
      className={buttonVariants({ size: 'lg' })}
    >
      {({ loading }) => {
        return loading ? 'Loading document...' : text;
      }}
    </PDFDownloadLink>
  );
}

export default DownloadButton;
