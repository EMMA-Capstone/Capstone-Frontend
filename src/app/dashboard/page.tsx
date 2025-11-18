'use client';

import { useState, useEffect } from 'react';
import StatusCard from './components/StatusCard';
import HealthIndicatorRow from './components/HealthIndicatorRow';
import MaturitySection from './components/MaturitySection';
import LoadingSpinner from './components/LoadingSpinner';
import { CompostData } from '../type/Compost';
import { manrope } from '../layout';
import CompostBinDialog from './components/DialogBin';
import getDashboardData from '../dashboard/actions/getLatestCompostData';
import { Thermometer, Droplet, FlaskConical } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import startCompost from '../dashboard/actions/postStartTimeToBin';
import { registerPush } from '../../lib/push';
import connectBin from './actions/postConnectionToBin';
import CompostLifecycle from './components/CompostLifecycle';

const mockData: CompostData = {
  currentStatus: [
    { label: 'Temperature', value: '32°C', change: '+1°C', changeType: 'positive', status: 'Optimal' },
    { label: 'Moisture', value: '45%', change: '-3%', changeType: 'negative', status: 'Good' },
    { label: 'pH Level', value: '6.8', change: '0', changeType: 'neutral', status: 'Neutral' },
  ],
  maturity: {
    level: 'Early Stage',
    estimatedCompletion: '2025-12-01',
    progressPercentage: 35,
  },
  healthIndicators: [
    { name: 'Temperature', value: '32°C', icon: Thermometer },
    { name: 'Moisture', value: '45%', icon: Droplet },
    { name: 'Chemical Balance', value: 'Stable', icon: FlaskConical },
  ],
};

export default function DashboardPage() {
  const [data, setData] = useState<CompostData>(mockData);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const AuthContext = useAuth();
  const bin = AuthContext.userAccount?.bin?.[0]; 
  const hasBin = !!bin;

  // Local optimistic state for batches
  const [localHasBatches, setLocalHasBatches] = useState(!!bin?.batches?.length);

  // Keep localHasBatches in sync with backend context
  useEffect(() => {
    setLocalHasBatches(!!bin?.batches?.length);
  }, [bin]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: CompostData = await getDashboardData();
        setData(data);
        setIsLoaded(true);
      } catch (err) {
        console.error(err);
        setIsLoaded(true);
      }
    };
    registerPush();
    fetchData();
  }, []);

  const handleCompostAction = async (deviceId: string) => {
    try {
      setIsProcessing(true);
      await startCompost(deviceId);
      const data: CompostData = await getDashboardData();
      setData(data);
    } catch (err) {
      console.error('Failed to toggle composting:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isLoaded) return <LoadingSpinner />;

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6">
      <h1
        className={`text-3xl md:text-5xl font-bold text-white text-center my-6 md:my-10 tracking-tight ${manrope.className}`}
      >
        Compost Health Overview
      </h1>

      <div className="mb-10 lg:mb-12 px-2 md:px-0">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <h2 className={`text-2xl font-bold text-white ${manrope.className}`}>
            Current Status
          </h2>

          <div className="flex flex-wrap gap-4">
            <a
              href="/history"
              className={`bg-[#BBC863] text-white ${manrope.className} px-4 py-2 rounded-lg hover:opacity-90 transition`}
            >
              View History
            </a>

            {!hasBin ? (
              <>
                <button
                  onClick={() => setShowDialog(true)}
                  className={`bg-[#BBC863] hover:opacity-90 hover:cursor-pointer text-white ${manrope.className} px-4 py-2 rounded-lg transition`}
                >
                  Connect Bin
                </button>

                <CompostBinDialog
                  isOpen={showDialog}
                  onClose={() => setShowDialog(false)}
                  onSubmit={(id: string) => {
                    connectBin(id);
                    setShowDialog(false);
                  }}
                />
              </>
            ) : (
              <button
                onClick={() => {
                  setLocalHasBatches(!localHasBatches); // optimistic toggle
                  handleCompostAction(bin.id);
                }}
                disabled={isProcessing}
                className={`${
                  localHasBatches ? 'bg-red-600' : 'bg-[#BBC863]'
                } hover:opacity-90 hover:cursor-pointer text-white ${manrope.className} px-4 py-2 rounded-lg transition disabled:opacity-50`}
              >
                {isProcessing
                  ? 'Processing...'
                  : localHasBatches
                  ? 'Stop Composting'
                  : 'Start Composting'}
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {data.currentStatus.map((metric, index) => (
            <StatusCard key={metric.label} metric={metric} index={index} />
          ))}
        </div>
      </div>

      <div className="mb-10 lg:mb-12 px-2 md:px-0">
        <h2
          className={`text-2xl font-bold text-white mb-6 ${manrope.className}`}
        >
          Compost Maturity
        </h2>
        <MaturitySection
          level={data.maturity.level}
          estimatedCompletion={data.maturity.estimatedCompletion}
          progressPercentage={data.maturity.progressPercentage}
        />
      </div>
      <div className="mb-10 lg:mb-12 px-2 md:px-0">
      <CompostLifecycle currentPhase={data.currentStatus[2].value} />
      </div>

      <div className="mb-10 lg:mb-12 px-2 md:px-0">
        <h2
          className={`text-2xl font-bold text-white mb-6 ${manrope.className}`}
        >
          Health Indicators
        </h2>
        <div className="space-y-4">
          {data.healthIndicators.map((indicator, index) => (
            <HealthIndicatorRow key={index} indicator={indicator} index={index} />
          ))}
        </div>
        <div className="h-24 md:h-36 lg:h-0"></div>
      </div>
    </div>
  );
}
