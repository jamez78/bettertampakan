import { Link, useNavigate } from 'react-router-dom';

import { ArrowRight, PhoneIcon } from 'lucide-react';

import { config } from '@/lib/lguConfig';
import { toTitleCase } from '@/lib/stringUtils';

import barangaysData from '@/data/directory/barangays.json';
import populationData from '@/data/statistics/population.json';

const CENSUS_YEAR = 2024;
const CENSUS_LABEL = '2024 POPCEN';
const PSGC_LABEL = 'PSA PSGC';
// Income classification as listed in the PSA Philippine Standard Geographic Code
const INCOME_CLASS = '1st';

const populationIn = (history: { year: number; population: number }[]) =>
  history.find(h => h.year === CENSUS_YEAR)?.population ?? 0;

const largestBarangay = populationData.barangays.reduce((largest, b) =>
  populationIn(b.history) > populationIn(largest.history) ? b : largest
);

const glanceFigures = [
  {
    value: populationIn(populationData.municipality.history).toLocaleString(
      'en-PH'
    ),
    label: 'Population',
    source: CENSUS_LABEL,
  },
  {
    value: String(barangaysData.length),
    label: 'Barangays',
    source: PSGC_LABEL,
  },
  { value: INCOME_CLASS, label: 'Income class', source: PSGC_LABEL },
  {
    value: populationIn(largestBarangay.history).toLocaleString('en-PH'),
    label: `${largestBarangay.name}, largest barangay`,
    source: CENSUS_LABEL,
  },
];

const urgentContacts = [
  { label: 'Emergency', display: '911', href: 'tel:911' },
  {
    label: 'Municipal Hall',
    display: '(083) 227-1001',
    href: 'tel:+63832271001',
  },
];

const shortcutClass =
  'border-kapwa-border-weak bg-kapwa-bg-surface text-kapwa-text-strong hover:border-kapwa-border-brand hover:text-kapwa-text-brand inline-flex min-h-[44px] items-center gap-2 rounded-lg border px-4 text-sm font-bold transition-colors';

export default function HomeEssentials() {
  const navigate = useNavigate();

  return (
    <section className='bg-kapwa-bg-surface-raised border-kapwa-border-weak border-b py-8'>
      <div className='container mx-auto space-y-8 px-4'>
        {/* Start with: shortcuts to sections that already have content */}
        <div className='flex flex-col gap-3 md:flex-row md:items-center'>
          <span className='text-kapwa-text-support text-xs font-bold tracking-widest uppercase'>
            Start with
          </span>
          <div className='flex flex-col gap-3 sm:flex-row sm:flex-wrap'>
            <label htmlFor='home-barangay-select' className='sr-only'>
              Find your barangay
            </label>
            <select
              id='home-barangay-select'
              defaultValue=''
              onChange={e => {
                if (e.target.value) {
                  navigate(`/government/barangays/${e.target.value}`);
                }
              }}
              className={shortcutClass}
            >
              <option value='' disabled>
                Find your barangay
              </option>
              {barangaysData.map(b => (
                <option key={b.slug} value={b.slug}>
                  {toTitleCase(b.barangay_name)}
                </option>
              ))}
            </select>
            <Link to='/government/elected-officials' className={shortcutClass}>
              Elected officials <ArrowRight className='h-4 w-4' />
            </Link>
            <Link to='/statistics' className={shortcutClass}>
              Population <ArrowRight className='h-4 w-4' />
            </Link>
          </div>
        </div>

        {/* At a glance */}
        <div>
          <h2 className='text-kapwa-text-support mb-3 text-xs font-bold tracking-widest uppercase'>
            {config.lgu.name} at a glance
          </h2>
          <dl className='grid grid-cols-2 gap-4 lg:grid-cols-4'>
            {glanceFigures.map(figure => (
              <div
                key={figure.label}
                className='border-kapwa-border-weak bg-kapwa-bg-surface flex flex-col-reverse justify-end rounded-xl border p-4'
              >
                <dt>
                  <span className='text-kapwa-text-strong block text-sm font-bold'>
                    {figure.label}
                  </span>
                  <span className='text-kapwa-text-support mt-1 block text-[10px] font-bold tracking-widest uppercase'>
                    {figure.source}
                  </span>
                </dt>
                <dd className='text-kapwa-text-brand mb-1 text-3xl font-black'>
                  {figure.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Urgent help */}
        <div className='border-kapwa-border-weak bg-kapwa-bg-surface rounded-xl border p-4'>
          <h2 className='text-kapwa-text-strong mb-3 flex items-center gap-2 text-sm font-bold'>
            <PhoneIcon className='text-kapwa-text-brand h-4 w-4' />
            Urgent help
          </h2>
          <ul className='flex flex-col gap-3 sm:flex-row sm:gap-8'>
            {urgentContacts.map(contact => (
              <li key={contact.label} className='text-kapwa-text-support'>
                {contact.label}:{' '}
                <a
                  href={contact.href}
                  className='text-kapwa-text-brand font-bold underline'
                >
                  {contact.display}
                </a>
              </li>
            ))}
          </ul>
          <p className='text-kapwa-text-support mt-3 text-xs'>
            Local emergency numbers will be added once confirmed with the LGU.
          </p>
        </div>
      </div>
    </section>
  );
}
