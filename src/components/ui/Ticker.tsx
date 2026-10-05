import { FC, useEffect, useState } from 'react';

import {
  DollarSignIcon,
  EuroIcon,
  JapaneseYenIcon,
  LoaderIcon,
  PoundSterlingIcon,
} from 'lucide-react';

import { fetchForexData, getCurrencyIconName } from '../../lib/forex';
import { ForexRate } from '../../types';

const getCurrencyIcon = (code: string) => {
  const iconName = getCurrencyIconName(code);
  switch (iconName) {
    case 'DollarSign':
      return <DollarSignIcon className='w-4 h-4' />;
    case 'JapaneseYen':
      return <JapaneseYenIcon className='w-4 h-4' />;
    case 'Euro':
      return <EuroIcon className='w-4 h-4' />;
    case 'PoundSterling':
      return <PoundSterlingIcon className='w-4 h-4' />;
    default:
      return null;
  }
};

const Ticker: FC = () => {
  const [forexRates, setForexRates] = useState<ForexRate[]>([]);
  const [currentRateIndex, setCurrentRateIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getForexData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const transformedData = await fetchForexData([
          'USD',
          'EUR',
          'JPY',
          'GBP',
        ]);
        setForexRates(transformedData);
      } catch (error) {
        console.error('Error fetching forex data:', error);
        setError(
          error instanceof Error ? error.message : 'Failed to fetch forex data'
        );
      } finally {
        setIsLoading(false);
      }
    };

    getForexData();
  }, []);

  useEffect(() => {
    if (forexRates.length === 0) return;

    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentRateIndex(prevIndex => (prevIndex + 1) % forexRates.length);
        setIsAnimating(false);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, [forexRates.length]);

  if (isLoading) {
    return (
      <div className='py-1 bg-kapwa-bg-surface-bold px-kapwa-md text-kapwa-text-inverse'>
        <div className='container flex justify-center items-center mx-auto'>
          <LoaderIcon className='mr-2 w-4 h-4 animate-spin' />
          <span className='kapwa-body-xs-default'>Loading data...</span>
        </div>
      </div>
    );
  }

  if (error || forexRates.length === 0) {
    return null;
  }

  const currentRate = forexRates[currentRateIndex];

  if (!currentRate) return null;

  return (
    <div className='bg-kapwa-blue-950 py-1.5'>
      <div className='container flex justify-end px-4 mx-auto'>
        <div className='flex justify-end items-center'>
          {/* Forex ticker */}
          <div className='overflow-hidden flex-1'>
            <div className='flex relative items-center h-6'>
              <div
                className={`flex items-center transition-all duration-200 ${
                  isAnimating
                    ? 'opacity-0 translate-y-2'
                    : 'opacity-100 translate-y-0'
                }`}
              >
                <div className='inline-flex items-center space-x-1'>
                  <span className='opacity-80 text-kapwa-yellow-500'>
                    {getCurrencyIcon(currentRate.code)}
                  </span>
                  <span className='text-kapwa-text-inverse kapwa-body-xs-default kapwa-body-xs-strong'>
                    {currentRate.code}
                  </span>
                  <span className='opacity-90 text-kapwa-text-inverse kapwa-body-xs-default'>
                    ₱{currentRate.rate.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ticker;
