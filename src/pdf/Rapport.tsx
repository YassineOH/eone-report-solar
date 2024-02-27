/* eslint-disable jsx-a11y/alt-text */
'use client';

import {
  Document,
  Page,
  Text,
  View,
  Svg,
  Circle,
  Path,
  Font,
  StyleSheet,
} from '@react-pdf/renderer';
import { format } from 'date-fns';
import { createTw } from 'react-pdf-tailwind';
import { fr, arMA } from 'date-fns/locale';

import { getMonthData } from '@/lib/formatData';
import { FusionSolarDailyData } from '@/types/dailyData';
import font from './Inter-Regular.ttf';
import fontAr from './Rubik-VariableFont_wght.ttf';

interface Props {
  time: number;
  plantInfo: {
    plantName: string;
    capacity: number;
    gridConnectionDate: string;
    plantAddress: string;
  };
  dailyData: FusionSolarDailyData[];
  rate: string;
  totalPower: number;
}

const tw = createTw({});

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 64,
    paddingVertical: 60,
    rowGap: 64,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    fontFamily: 'Inter',
  },
  page2: {
    paddingHorizontal: 64,
    paddingVertical: 60,
    rowGap: 64,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    fontFamily: 'Rubik',
    textAlign: 'right',
  },
});

const formatterEn = new Intl.NumberFormat('us', {
  style: 'decimal',
  minimumFractionDigits: 2,
});
function PDFRapport({ dailyData, time, plantInfo, rate, totalPower }: Props) {
  Font.register({
    family: 'Inter',
    src: font,
    fontWeight: 'normal',
    fontStyle: 'normal',
  });
  Font.register({
    family: 'Rubik',
    src: fontAr,
    fontWeight: 'normal',
    fontStyle: 'normal',
  });
  const data = getMonthData(dailyData);
  return (
    <Document title="report" author="e-one" subject="report of solar plant">
      <Page size="A4" style={styles.page}>
        <View>
          <View>
            <LogoSVG />
          </View>
        </View>
        <View style={tw('flex flex-col gap-y-12')}>
          <Header time={time} lang="en" />
          <View>
            <View>
              <Text style={tw('font-semibold text-2xl')}>
                1. Informations about the plant:
              </Text>
            </View>
            <View
              style={tw('flex text-base flex-row items-stretch justify-start')}
            >
              <View style={tw('flex-1 flex flex-col gap-y-1')}>
                <Info info="Plant Name" value={plantInfo.plantName} />
                <Info info="capacity" value={`${plantInfo.capacity} kWp`} />
              </View>
              <View style={tw('flex-1 flex flex-col gap-y-1')}>
                <Info
                  info="Connected on"
                  value={format(plantInfo.gridConnectionDate, 'PPP')}
                />
                <Info info="Address" value={plantInfo.plantAddress} />
              </View>
            </View>
          </View>
          <View>
            <Text style={tw('font-semibold text-2xl')}>2. Results:</Text>
            <View style={tw('flex flex-row items-stretch justify-start')}>
              <View
                style={tw(
                  'flex-1 flex flex-col items-start justify-start gap-y-2',
                )}
              >
                <EnergyResult
                  text="Consumption"
                  unit="kWh"
                  value={data.totalConsumption.toFixed(2)}
                />
                <EnergyResult
                  text="Solar Production"
                  unit="kWh"
                  value={data.solarPowerConsumed.toFixed(2)}
                />
                <EnergyResult
                  text="Grid Energy"
                  unit="kWh"
                  value={data.gridEnergy.toFixed(2)}
                />
              </View>
              <View
                style={tw(
                  'flex-1 flex flex-col items-start justify-start gap-y-2',
                )}
              >
                <EnergyResult
                  text="Coverage ratio"
                  unit="%"
                  value={data.coverage.toFixed(2)}
                />
                <EnergyResult
                  text="Autoproduction"
                  unit="%"
                  value={data.autoProductionPercentage.toFixed(2)}
                />
                <EnergyResult
                  text="saved co2"
                  unit="To"
                  value={data.savedCO2.toFixed(2)}
                />
              </View>
            </View>
          </View>
          <View>
            <Text style={tw('font-semibold text-2xl')}>3. Savings:</Text>
            <View style={tw('w-full flex flex-row gap-y-5')}>
              <Saving
                amount={Number(rate) * data.solarPowerConsumed}
                text="Monthly saving"
              />
              <Saving amount={Number(rate) * totalPower} text="Total saving" />
            </View>
          </View>
        </View>
      </Page>
      <Page size="A4" style={styles.page}>
        <View>
          <View>
            <LogoSVG />
          </View>
        </View>
        <View style={tw('flex flex-col gap-y-12')}>
          <Header time={time} lang="fr" />
          <View>
            <View>
              <Text style={tw('font-semibold text-2xl')}>
                1. Informations sur l&apos;installation :
              </Text>
            </View>
            <View
              style={tw('flex text-base flex-row items-stretch justify-start')}
            >
              <View style={tw('flex-1 flex flex-col gap-y-1')}>
                <Info info="Nom d'installation" value={plantInfo.plantName} />
                <Info info="Capacité" value={`${plantInfo.capacity} kWc`} />
              </View>
              <View style={tw('flex-1 flex flex-col gap-y-1')}>
                <Info
                  info="Connecté le"
                  value={format(plantInfo.gridConnectionDate, 'PPP', {
                    locale: fr,
                  })}
                />
                <Info info="Adresse" value={plantInfo.plantAddress} />
              </View>
            </View>
          </View>
          <View>
            <Text style={tw('font-semibold text-2xl')}>2. Résultats:</Text>
            <View style={tw('flex flex-row items-stretch justify-start')}>
              <View
                style={tw(
                  'flex-1 flex flex-col items-start justify-start gap-y-2',
                )}
              >
                <EnergyResult
                  text="Consommation"
                  unit="kWh"
                  value={data.totalConsumption.toFixed(2)}
                />
                <EnergyResult
                  text="Production Solaire"
                  unit="kWh"
                  value={data.solarPowerConsumed.toFixed(2)}
                />
                <EnergyResult
                  text="L'énergie du réseau"
                  unit="kWh"
                  value={data.gridEnergy.toFixed(2)}
                />
              </View>
              <View
                style={tw(
                  'flex-1 flex flex-col items-start justify-start gap-y-2',
                )}
              >
                <EnergyResult
                  text="Taux de couverture"
                  unit="%"
                  value={data.coverage.toFixed(2)}
                />
                <EnergyResult
                  text="L'autoproduction"
                  unit="%"
                  value={data.autoProductionPercentage.toFixed(2)}
                />
                <EnergyResult
                  text="Les emissions de CO2 évitées"
                  unit="To"
                  value={data.savedCO2.toFixed(2)}
                />
              </View>
            </View>
          </View>
          <View>
            <Text style={tw('font-semibold text-2xl')}>3. Savings:</Text>
            <View style={tw('w-full flex flex-row gap-y-5')}>
              <Saving
                amount={Number(rate) * data.solarPowerConsumed}
                text="Épargne mensuelle"
              />
              <Saving
                amount={Number(rate) * totalPower}
                text="Épargne totale"
              />
            </View>
          </View>
        </View>
      </Page>
      <Page size="A4" style={styles.page2}>
        <View>
          <View>
            <LogoSVG />
          </View>
        </View>
        <View style={tw('flex flex-col gap-y-12')}>
          <Header time={time} lang="ar" />
          <View>
            <View>
              <Text style={tw('font-semibold text-2xl text-right')}>
                معلومات حول المحطة الشمسية
              </Text>
            </View>
            <View
              style={tw('flex text-base flex-row items-stretch justify-start')}
            >
              <View style={tw('flex-1 flex flex-col gap-y-1')}>
                <Info info="اسم المحطة" value={plantInfo.plantName} isAr />
                <Info
                  info="السعة"
                  value={`  ك واط ${plantInfo.capacity}`}
                  isAr
                />
              </View>
              <View style={tw('flex-1 flex flex-col gap-y-1')}>
                <Info
                  info="بدء الاتصال منذ"
                  isAr
                  value={format(plantInfo.gridConnectionDate, 'PPP', {
                    locale: arMA,
                  })}
                />
                <Info info="العنوان" value={plantInfo.plantAddress} isAr />
              </View>
            </View>
          </View>
          <View>
            <Text style={tw('font-semibold text-2xl  text-end')}>النتائج</Text>
            <View style={tw('flex flex-row items-stretch justify-start')}>
              <View
                style={tw(
                  'flex-1 flex flex-col items-start justify-start gap-y-2',
                )}
              >
                <EnergyResult
                  text="الاستهلاك"
                  unit="kWh"
                  value={data.totalConsumption.toFixed(2)}
                  isAr
                />
                <EnergyResult
                  text="إنتاج الطاقة الشمسية"
                  unit="kWh"
                  value={data.solarPowerConsumed.toFixed(2)}
                  isAr
                />
                <EnergyResult
                  text="طاقة الشبكة"
                  unit="kWh"
                  value={data.gridEnergy.toFixed(2)}
                  isAr
                />
              </View>
              <View
                style={tw(
                  'flex-1 flex flex-col items-start justify-start gap-y-2',
                )}
              >
                <EnergyResult
                  text="نسبة التغطية"
                  unit="%"
                  value={data.coverage.toFixed(2)}
                  isAr
                />
                <EnergyResult
                  text="الإنتاج الذاتي"
                  unit="%"
                  value={data.autoProductionPercentage.toFixed(2)}
                  isAr
                />
                <EnergyResult
                  text="انبعاثات ثاني أكسيد الكربون"
                  unit="To"
                  value={data.savedCO2.toFixed(2)}
                  isAr
                />
              </View>
            </View>
          </View>
          <View>
            <Text style={tw('font-semibold text-2xl text-right')}>الإدخار</Text>
            <View style={tw('w-full flex flex-row gap-y-5')}>
              <Saving
                amount={Number(rate) * data.solarPowerConsumed}
                text="الادخار الشهري"
                isAr
              />
              <Saving
                amount={Number(rate) * totalPower}
                text="الادخار الإجمالي"
                isAr
              />
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}

const EnergyResult = ({
  text,
  value,
  unit,
  isAr = false,
}: {
  text: string;
  value: string;
  unit: string;
  isAr?: boolean;
}) => {
  const tw = createTw({});
  return (
    <View
      style={tw(
        `flex flex-col w-full ${isAr ? 'items-end border-r-4 text-right pr-4' : 'items-start border-l-4 text-left pl-4'} h-auto gap-y-1 justify-between border-[#52b4ab]`,
      )}
    >
      <Text style={tw('text-gray-400 text-sm')}>{text}</Text>
      <Text style={tw('text-black  text-xl leading-none font-semibold ')}>
        {isAr
          ? `${unit} ${formatterEn.format(Number(value))}`
          : `${formatterEn.format(Number(value))} ${unit}`}
      </Text>
    </View>
  );
};

const LogoSVG = () => {
  return (
    <Svg
      width="182"
      height="40"
      viewBox="0 0 281 62"
      fill="none"
      // xmlns="http://www.w3.org/2000/svg"
    >
      <Circle cx="108.366" cy="31" r="30.6677" fill="#C7C8CB" />
      <Circle cx="107.837" cy="30.4713" r="15.3339" fill="white" />
      <Path
        d="M152.781 0.348813L152.781 61.2678L172.879 61.2678L172.879 41.0135L193.133 61.2678L213.388 61.2678L152.781 0.348813Z"
        fill="#C7C8CB"
      />
      <Path
        d="M192.977 0.872789L212.573 0.8728L212.573 19.7543L192.977 0.872789Z"
        fill="#04B7AC"
      />
      <Path
        d="M278.561 54.9642C273.963 58.6357 268.407 60.9072 262.554 61.5076C256.701 62.1081 250.798 61.0121 245.551 58.3505C240.304 55.6889 235.933 51.574 232.96 46.4966C229.986 41.4193 228.537 35.5938 228.783 29.7152C229.03 23.8366 230.962 18.153 234.35 13.3424C237.737 8.53174 242.437 4.79718 247.889 2.58418C253.341 0.371178 259.314 -0.226837 265.096 0.86147C270.879 1.94978 276.226 4.67846 280.5 8.72202L269.962 19.861C267.825 17.8392 265.151 16.4749 262.26 15.9307C259.369 15.3866 256.382 15.6856 253.657 16.7921C250.931 17.8986 248.581 19.7659 246.887 22.1712C245.193 24.5765 244.227 27.4183 244.104 30.3576C243.98 33.2969 244.705 36.2096 246.192 38.7483C247.678 41.287 249.864 43.3444 252.487 44.6753C255.111 46.0061 258.062 46.554 260.989 46.2538C263.915 45.9536 266.694 44.8179 268.993 42.9821L278.561 54.9642Z"
        fill="#C7C8CB"
      />
      <Path
        d="M266.181 25.2823L266.181 37.7573H253.706L266.181 25.2823Z"
        fill="#04B7AC"
      />
      <Path
        d="M62.893 0.332275H0.5V61.6677H22.7077L62.893 21.4824C62.9395 21.4359 62.9123 21.1106 62.893 20.9537V0.332275Z"
        fill="#C7C8CB"
      />
      <Path
        d="M28.5927 55.7827C24.8246 52.0146 22.7077 46.904 22.7077 41.5751C22.7077 36.2462 24.8246 31.1355 28.5927 27.3674C32.3608 23.5993 37.4714 21.4824 42.8003 21.4824C48.1292 21.4824 53.2399 23.5993 57.008 27.3674L48.4834 35.892C46.9761 34.3848 44.9319 33.538 42.8003 33.538C40.6688 33.538 38.6245 34.3848 37.1173 35.892C35.61 37.3993 34.7633 39.4435 34.7633 41.5751C34.7633 43.7066 35.61 45.7509 37.1173 47.2581L28.5927 55.7827Z"
        fill="white"
      />
      <Path
        d="M57.008 55.7827C53.2399 59.5508 48.1292 61.6677 42.8003 61.6677C37.4714 61.6677 32.3608 59.5508 28.5927 55.7827L37.1173 47.2581C38.6245 48.7654 40.6688 49.6121 42.8003 49.6121C44.9319 49.6121 46.9761 48.7654 48.4834 47.2581L57.008 55.7827Z"
        fill="#04B7AC"
      />
    </Svg>
  );
};

const Header = ({ time, lang }: { time: number; lang: 'fr' | 'en' | 'ar' }) => {
  return (
    <View style={tw('text-center flex flex-col gap-y-0')}>
      <Text style={tw('text-4xl leading-normal font-bold')}>
        {lang === 'en'
          ? `Report for: ${format(new Date(time).toUTCString(), 'LLLL, u')}`
          : lang === 'fr'
            ? `Rapport pour le: ${format(
                new Date(time).toUTCString(),
                'LLLL, u',
                {
                  locale: fr,
                },
              )}`
            : ` تقرير ل: ${format(new Date(time).toUTCString(), 'LLLL, u', {
                locale: arMA,
              })}`}
      </Text>
    </View>
  );
};

const Info = ({
  info,
  value,
  isAr = false,
}: {
  info: string;
  value: string;
  isAr?: boolean;
}) => {
  return (
    <View
      style={tw(
        `text-gray-400 w-full flex ${isAr ? 'text-left items-end' : 'text-left items-start'}`,
      )}
    >
      <Text style={tw('text-sm text-end')}>{info} :</Text>
      <Text style={tw('text-black')}>{value}</Text>
    </View>
  );
};

const Saving = ({
  amount,
  text,
  isAr = false,
}: {
  amount: number;
  text: string;
  isAr?: boolean;
}) => {
  return (
    <View
      style={tw(
        `flex-1 flex flex-col  ${isAr ? 'items-end border-r-4 text-right pr-4' : 'items-start border-l-4 text-left pl-4'} gap-y-1  border-gray-400  h-auto justify-between`,
      )}
    >
      <Text style={tw('text-gray-400 text-base')}>{text} :</Text>
      <Text style={tw('text-[#52b4ab] font-bold text-xl leading-none')}>
        {`${formatterEn.format(amount)} ${isAr ? 'درهم' : 'MAD'}`}
      </Text>
    </View>
  );
};

export default PDFRapport;
