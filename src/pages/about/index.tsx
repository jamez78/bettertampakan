import { FC, ReactNode } from 'react';

import { Link } from 'react-router-dom';

import { Button } from '@bettergov/kapwa/button';
import { PencilLineIcon } from 'lucide-react';
import { Trans, useTranslation } from 'react-i18next';

import { SEO } from '@/components/layout/SEO';

import { config } from '@/lib/lguConfig';

const SOURCES_URL = `${config.portal.githubUrl}/blob/main/docs/tampakan-baseline.json`;
const TEMPLATE_URL = 'https://github.com/BetterLosBanos/betterlb';
const BETTERGOV_URL = 'https://bettergov.ph';
const LICENSE_URL = 'https://creativecommons.org/publicdomain/zero/1.0/';

const ExternalLink: FC<{ href: string; children?: ReactNode }> = ({
  href,
  children,
}) => (
  <a
    href={href}
    target='_blank'
    rel='noopener noreferrer'
    className='text-kapwa-text-brand underline hover:opacity-80'
  >
    {children}
  </a>
);

const AboutPage: FC = () => {
  const { t } = useTranslation('about');

  return (
    <div className='bg-kapwa-bg-surface-raised min-h-screen'>
      <SEO
        title={t('title')}
        description={t('intro')}
        keywords={['about', config.lgu.name, config.lgu.province]}
      />
      <div className='container mx-auto px-4 py-8 md:py-12'>
        <div className='bg-kapwa-bg-surface mt-4 rounded-lg border p-6 shadow-xs md:p-8 md:py-16'>
          <div className='text-kapwa-text-support mx-auto max-w-3xl space-y-8'>
            <div>
              <h1 className='text-kapwa-text-strong kapwa-heading-xl mb-4 font-extrabold'>
                {t('title')}
              </h1>
              <p className='text-lg leading-relaxed'>{t('intro')}</p>
            </div>

            <section>
              <h2 className='text-kapwa-text-strong mb-2 text-xl font-bold'>
                {t('independent.title')}
              </h2>
              <p className='leading-relaxed'>
                <Trans
                  t={t}
                  i18nKey='independent.body'
                  components={{
                    fb: <ExternalLink href={config.lgu.officialWebsite} />,
                  }}
                />
              </p>
            </section>

            <section>
              <h2 className='text-kapwa-text-strong mb-2 text-xl font-bold'>
                {t('sources.title')}
              </h2>
              <p className='leading-relaxed'>
                <Trans
                  t={t}
                  i18nKey='sources.body'
                  components={{ src: <ExternalLink href={SOURCES_URL} /> }}
                />
              </p>
            </section>

            <section>
              <h2 className='text-kapwa-text-strong mb-2 text-xl font-bold'>
                {t('corrections.title')}
              </h2>
              <p className='mb-4 leading-relaxed'>{t('corrections.body')}</p>
              <Link to='/contribute'>
                <Button
                  variant='primary'
                  leftIcon={<PencilLineIcon className='h-4 w-4' />}
                >
                  {t('corrections.action')}
                </Button>
              </Link>
            </section>

            <section>
              <h2 className='text-kapwa-text-strong mb-2 text-xl font-bold'>
                {t('credits.title')}
              </h2>
              <p className='leading-relaxed'>
                <Trans
                  t={t}
                  i18nKey='credits.body'
                  components={{
                    lb: <ExternalLink href={TEMPLATE_URL} />,
                    bg: <ExternalLink href={BETTERGOV_URL} />,
                    cc: <ExternalLink href={LICENSE_URL} />,
                  }}
                />
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
