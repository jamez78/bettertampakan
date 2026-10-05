import { FC, useEffect, useState } from 'react';

import * as LucideIcons from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { fetchForexData } from '../../lib/forex';
import { ForexRate } from '../../types';
import { Card, CardContent, CardHeader } from '../ui/Card';
import CriticalHotlinesWidget from '../widgets/CriticalHotlinesWidget';

const InfoWidgets: FC = () => {
  const { t } = useTranslation('common');
  const [forexRates, setForexRates] = useState<ForexRate[]>([]);
  const [isLoadingForex, setIsLoadingForex] = useState<boolean>(true);
  const [forexError, setForexError] = useState<string | null>(null);

  // Fetch forex data
  useEffect(() => {
    const getForexData = async () => {
      try {
        setIsLoadingForex(true);
        setForexError(null);

        // Get forex data for the top 6 currencies
        const transformedData = await fetchForexData([
          'USD',
          'EUR',
          'JPY',
          'GBP',
          'AUD',
          'SGD',
        ]);
        setForexRates(transformedData);
      } catch (error) {
        console.error('Error fetching forex data:', error);
        setForexError(
          error instanceof Error ? error.message : 'Failed to fetch forex data'
        );
      } finally {
        setIsLoadingForex(false);
      }
    };

    getForexData();
  }, []);

  return (
    <section className='bg-kapwa-bg-surface py-12'>
      <div className='container mx-auto px-4'>
        <div className='mb-12 text-center'>
          <h2 className='text-kapwa-text-strong mb-4 text-3xl font-bold'>
            {t('data.title')}
          </h2>
          <p className='text-kapwa-text-support mx-auto max-w-2xl text-lg'>
            {t('data.description')}
          </p>
        </div>
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
          {/* Forex Widget */}
          <Card>
            <CardHeader className='bg-kapwa-bg-brand-weak'>
              <h3 className='text-kapwa-text-strong flex items-center text-xl font-semibold'>
                <LucideIcons.BarChart3 className='text-kapwa-text-brand mr-2 h-5 w-5' />
                {t('forex.title')}
              </h3>
            </CardHeader>
            <CardContent>
              <div className='overflow-x-auto'>
                <table className='min-w-full divide-y divide-gray-200'>
                  <thead className='bg-kapwa-bg-surface'>
                    <tr>
                      <th className='text-kapwa-text-support px-3 py-3 text-left text-xs font-medium tracking-wider uppercase'>
                        Currency
                      </th>
                      <th className='text-kapwa-text-support px-3 py-3 text-right text-xs font-medium tracking-wider uppercase'>
                        ₱ Rate
                      </th>
                    </tr>
                  </thead>
                  <tbody className='bg-kapwa-bg-surface divide-y divide-gray-200'>
                    {isLoadingForex ? (
                      <tr>
                        <td colSpan={3} className='px-3 py-8 text-center'>
                          <LucideIcons.Loader className='text-kapwa-text-brand mx-auto h-6 w-6 animate-spin' />
                        </td>
                      </tr>
                    ) : forexError ? (
                      <tr>
                        <td
                          colSpan={3}
                          className='px-3 py-4 text-center text-kapwa-text-danger'
                        >
                          <LucideIcons.AlertCircle className='mx-auto mb-2 h-6 w-6' />
                          <p>{forexError}</p>
                        </td>
                      </tr>
                    ) : forexRates.length === 0 ? (
                      <tr>
                        <td
                          colSpan={3}
                          className='text-kapwa-text-support px-3 py-4 text-center'
                        >
                          No forex data available
                        </td>
                      </tr>
                    ) : (
                      forexRates.map(rate => (
                        <tr
                          key={rate.code}
                          className='hover:bg-kapwa-bg-surface-raised'
                        >
                          <td className='px-3 py-2 whitespace-nowrap'>
                            <div className='flex items-center'>
                              <div className='text-kapwa-text-strong font-medium'>
                                {rate.code}
                              </div>
                              <div className='text-kapwa-text-support ml-2 text-sm'>
                                {rate.currency}
                              </div>
                            </div>
                          </td>
                          <td className='px-3 py-2 text-right text-sm font-medium whitespace-nowrap'>
                            ₱{rate.rate.toFixed(2)}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              <div className='mt-4 text-right'>
                <a
                  href='/data/forex'
                  className='text-kapwa-text-brand text-sm hover:underline'
                >
                  More Currencies
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Hotlines Widget */}
          <div className='lg:col-span-1'>
            <CriticalHotlinesWidget maxItems={4} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoWidgets;
