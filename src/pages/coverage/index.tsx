import { FC, ReactNode } from 'react';

import { Link } from 'react-router-dom';

import { CheckCircle2, CircleDashed, Clock } from 'lucide-react';

import { SEO } from '@/components/layout/SEO';

import { config } from '@/lib/lguConfig';

const SOURCES_URL = `${config.portal.githubUrl}/blob/main/docs/tampakan-baseline.json`;

// Summarised from docs/tampakan-baseline.json. Update both together.
const confirmed = [
  'Population of the municipality and of each barangay (Philippine Statistics Authority, 2024 Census of Population).',
  'The number and names of the 14 barangays, and the 1st income class (PSA Philippine Standard Geographic Code).',
  'The municipal hall address, telephone number, email address and Facebook page of the LGU.',
  'The names of the Mayor and Vice Mayor, each named in more than one published source.',
];

const notYetConfirmed = [
  'Sangguniang Bayan members: the eight councilors are listed from published 2025 election results, with full names and spellings from secondary sources.',
  'The ex-officio Sangguniang Bayan members: the Liga ng mga Barangay representative, the Indigenous Peoples Mandatory Representative and the SK Federation President.',
  'The Punong Barangay of each of the 14 barangays.',
  'SK Chairpersons. For Barangay Buto and Barangay Santa Cruz the SK Chairperson is not yet confirmed.',
  'The map marker, which shows the approximate town centre and not a surveyed location.',
];

const notYetAvailable = [
  'Service guides: requirements, fees and processing times.',
  'Municipal departments and offices, with their heads and contact numbers.',
  'Sangguniang Bayan standing committees.',
  'Barangay hall addresses, phone numbers and kagawad lists.',
  'Barangay populations for census years before 2024.',
  'Competitiveness scores and municipal income figures.',
  'Financial reports and procurement records.',
  'Ordinances and resolutions.',
  'Local history.',
  'Local emergency numbers and weather.',
];

const Group: FC<{
  title: string;
  intro: string;
  icon: ReactNode;
  items: string[];
}> = ({ title, intro, icon, items }) => (
  <section>
    <h2 className='text-kapwa-text-strong mb-2 flex items-center gap-2 text-xl font-bold'>
      {icon}
      {title}
    </h2>
    <p className='mb-3 leading-relaxed'>{intro}</p>
    <ul className='list-disc space-y-2 pl-6 leading-relaxed'>
      {items.map(item => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  </section>
);

const CoveragePage: FC = () => {
  return (
    <div className='bg-kapwa-bg-surface-raised min-h-screen'>
      <SEO
        title='Coverage & limitations'
        description={`What ${config.portal.name} covers so far, what has been confirmed and what is still missing.`}
        keywords={['coverage', 'limitations', 'sources', config.lgu.name]}
      />
      <div className='container mx-auto px-4 py-8 md:py-12'>
        <div className='bg-kapwa-bg-surface mt-4 rounded-lg border p-6 shadow-xs md:p-8 md:py-16'>
          <div className='text-kapwa-text-support mx-auto max-w-3xl space-y-8'>
            <div>
              <h1 className='text-kapwa-text-strong kapwa-heading-xl mb-4 font-extrabold'>
                Coverage &amp; limitations
              </h1>
              <p className='text-lg leading-relaxed'>
                {config.portal.name} is a preview. This page says plainly what
                the portal covers so far, how sure we are of it, and what is
                still missing.
              </p>
            </div>

            <Group
              title='Confirmed from official sources'
              intro='These come from official publications or from more than one independent published source.'
              icon={<CheckCircle2 className='text-kapwa-text-success h-5 w-5' />}
              items={confirmed}
            />

            <Group
              title='Not yet confirmed with the LGU'
              intro='These are shown on the portal from published sources, but have not yet been checked with the Municipal Government. They may be incomplete or out of date.'
              icon={<Clock className='text-kapwa-text-warning h-5 w-5' />}
              items={notYetConfirmed}
            />

            <Group
              title='Not yet available'
              intro='These sections are empty or hidden until the information has been gathered.'
              icon={
                <CircleDashed className='text-kapwa-text-disabled h-5 w-5' />
              }
              items={notYetAvailable}
            />

            <section>
              <h2 className='text-kapwa-text-strong mb-2 text-xl font-bold'>
                Sources and corrections
              </h2>
              <p className='leading-relaxed'>
                Every value is recorded with its source and status in our{' '}
                <a
                  href={SOURCES_URL}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-kapwa-text-brand underline hover:opacity-80'
                >
                  sources file
                </a>
                . If you can confirm or correct something, please{' '}
                <Link
                  to='/contribute'
                  className='text-kapwa-text-brand underline hover:opacity-80'
                >
                  suggest a correction
                </Link>
                .
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoveragePage;
