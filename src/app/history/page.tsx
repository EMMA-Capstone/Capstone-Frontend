'use client'
import { useState, useEffect } from 'react';
import MetricCard from './components/MetricCard';
import { manrope } from '../layout';
import getBinHistory from './actions/getCompostBinHistory';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from './components/LoadingSpinner';

/* =====================
   Interfaces
===================== */
interface SensorEntry {
  id: string;
  sensor_temp: number;
  sensor_humidity: number;
  sensor_ph: number;
  sensor_methane: number;
  sensor_co: number | null;
  createdAt: string;
}

interface ChartPoint {
  time: string;
  value: number;
}

interface CompostData {
  pH: ChartPoint[];
  temperature: ChartPoint[];
  methane: ChartPoint[];
  moisture: ChartPoint[];
  co: ChartPoint[];
}

/* =====================
   Helper Functions
===================== */
function mapSensorData(entries: SensorEntry[]): CompostData {
  const toChartData = (key: keyof SensorEntry): ChartPoint[] =>
    entries.map(entry => ({
      time: new Date(entry.createdAt).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      value: Number(entry[key]) || 0,
    }));

  return {
    pH: toChartData('sensor_ph'),
    temperature: toChartData('sensor_temp'),
    methane: toChartData('sensor_methane'),
    moisture: toChartData('sensor_humidity'),
    co: toChartData('sensor_co'),
  };
}

function calcChange(arr: ChartPoint[]): number {
  if (arr.length < 2) return 0;
  const first = arr[0].value;
  const last = arr[arr.length - 1].value;
  return first === 0 ? 0 : Number((((last - first) / first) * 100).toFixed(2));
}

/* =====================
   Main Component
===================== */
export default function CompostDashboard() {
  const { userAccount } = useAuth() ;
  const [data, setData] = useState<CompostData>({
    pH: [],
    temperature: [],
    methane: [],
    moisture: [],
    co: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('User account data:', userAccount);
    const binId = userAccount?.bin?.[0]?.id;

    console.log('Fetching data for bin ID:', binId);
    if (!binId) return;

    const fetchData = async () => {
      try {
        const history: SensorEntry[] = await getBinHistory(binId);
        const mapped = mapSensorData(history);
        setData(mapped);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch bin history:', err);
      }
    };

    fetchData();
  }, [userAccount]);

  if (loading) {
    return (
      <LoadingSpinner />
    );
  }

  const metrics = [
    {
      title: 'pH',
      value: data.pH.at(-1)?.value ?? 0,
      unit: '',
      change: calcChange(data.pH),
      data: data.pH,
      size: 'small',
    },
    {
      title: 'Temperature (°C)',
      value: data.temperature.at(-1)?.value ?? 0,
      unit: '',
      change: calcChange(data.temperature),
      data: data.temperature,
      size: 'small',
    },
    {
      title: 'Methane (ppm)',
      value: data.methane.at(-1)?.value ?? 0,
      unit: '',
      change: calcChange(data.methane),
      data: data.methane,
      size: 'small',
    },
    {
      title: 'Moisture (%)',
      value: data.moisture.at(-1)?.value ?? 0,
      unit: '',
      change: calcChange(data.moisture),
      data: data.moisture,
      size: 'large',
    },
    {
      title: 'CO',
      value: data.co.at(-1)?.value ?? 0,
      unit: '',
      change: calcChange(data.co),
      data: data.co,
      size: 'large',
    },
  ];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className={`text-white text-3xl font-bold mb-8 ${manrope.className}`}>
          Compost Data
        </h1>

        <div className="grid lg:grid-cols-6 sm:grid-cols-1 gap-6">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className={metric.size === 'large' ? 'lg:col-span-3 md:col-span-1' : 'lg:col-span-2 sm:col-span-1'}
            >
              <MetricCard {...metric} />
            </div>
          ))}
        </div>
      </div>
      <div className="h-28 md:h-36 lg:h-0"></div>
    </div>
  );
}
