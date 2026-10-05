import { FC } from 'react';

import { SiFacebook } from '@icons-pack/react-simple-icons';
import {
  ExternalLink,
  MailIcon,
  PencilLineIcon,
  PhoneIcon,
} from 'lucide-react';

import { SEO } from '@/components/layout/SEO';

import { config } from '@/lib/lguConfig';

const CORRECTION_FORM_URL = `${config.portal.githubUrl}/issues/new?template=contribution.yml`;

// Contact details of the Municipal Government of Tampakan, not of this portal.
const LGU_PHONE = '(083) 227-1001';
const LGU_EMAIL = 'lgutampakan2019@gmail.com';

const ContactUs: FC = () => {
  return (
    <div className='bg-kapwa-bg-surface-raised min-h-screen'>
      <SEO
        title={`Contact ${config.portal.name}`}
        description={`Report a correction to ${config.portal.name}, or find the official contacts of the ${config.lgu.fullName}.`}
        keywords={['contact', 'correction', config.lgu.name]}
      />

      <div className='container mx-auto px-4 py-8 md:py-12'>
        <div className='mx-auto max-w-3xl space-y-6'>
          <h1 className='text-kapwa-text-strong kapwa-heading-xl font-extrabold'>
            Contact {config.portal.name}
          </h1>

          <section className='border-kapwa-border-weak bg-kapwa-bg-surface rounded-lg border p-6 shadow-xs'>
            <h2 className='text-kapwa-text-strong mb-2 flex items-center gap-2 text-xl font-bold'>
              <PencilLineIcon className='text-kapwa-text-brand h-5 w-5' />
              Report a correction
            </h2>
            <p className='text-kapwa-text-support mb-4 leading-relaxed'>
              If something on this portal is wrong or out of date, tell us
              through the correction form on GitHub and we will fix it.
            </p>
            <a
              href={CORRECTION_FORM_URL}
              target='_blank'
              rel='noopener noreferrer'
              className='bg-kapwa-bg-brand-default hover:bg-kapwa-bg-brand-hover text-kapwa-text-inverse inline-flex min-h-[44px] items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold transition-colors'
            >
              Open the correction form <ExternalLink className='h-4 w-4' />
            </a>
          </section>

          <section className='border-kapwa-border-weak bg-kapwa-bg-surface rounded-lg border p-6 shadow-xs'>
            <h2 className='text-kapwa-text-strong mb-2 text-xl font-bold'>
              For official LGU matters
            </h2>
            <p className='text-kapwa-text-support mb-4 leading-relaxed'>
              {config.portal.name} is not run by the LGU and cannot act on
              requests for government services. These are the contacts of the{' '}
              {config.lgu.fullName}, not ours.
            </p>
            <ul className='text-kapwa-text-support space-y-3'>
              <li className='flex items-center gap-3'>
                <SiFacebook className='text-kapwa-text-brand h-5 w-5 shrink-0' />
                <a
                  href={config.lgu.officialWebsite}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-kapwa-text-brand underline hover:opacity-80'
                >
                  LGU Facebook page
                </a>
              </li>
              <li className='flex items-center gap-3'>
                <PhoneIcon className='text-kapwa-text-brand h-5 w-5 shrink-0' />
                <a
                  href='tel:+63832271001'
                  className='text-kapwa-text-brand underline hover:opacity-80'
                >
                  {LGU_PHONE}
                </a>
              </li>
              <li className='flex items-center gap-3'>
                <MailIcon className='text-kapwa-text-brand h-5 w-5 shrink-0' />
                <a
                  href={`mailto:${LGU_EMAIL}`}
                  className='text-kapwa-text-brand underline break-all hover:opacity-80'
                >
                  {LGU_EMAIL}
                </a>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
