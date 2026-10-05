import { FC, ReactNode } from 'react';

import { Link } from 'react-router-dom';

import {
  BarChart3,
  Briefcase,
  Building2,
  ChevronRight,
  FileText,
  Home,
  ScrollText,
} from 'lucide-react';

import { SEO } from '@/components/layout/SEO';
import { config } from '@/lib/lguConfig';

interface SitemapSection {
  title: string;
  icon: ReactNode;
  links: {
    title: string;
    url: string;
    description?: string;
  }[];
}

const SitemapPage: FC = () => {
  // Only routes that exist in this portal; feature-gated sections follow
  // the same flags as the router in App.tsx.
  const sitemapSections: SitemapSection[] = [
    {
      title: 'Main Pages',
      icon: <Home className='w-5 h-5' />,
      links: [
        { title: 'Home', url: '/', description: 'Main landing page' },
        {
          title: 'About',
          url: '/about',
          description: `About ${config.portal.name}`,
        },
        {
          title: 'Contact',
          url: '/contact',
          description: 'Report a correction or find the LGU contacts',
        },
        {
          title: 'Suggest a correction',
          url: '/contribute',
          description: 'Send a correction or a new service guide',
        },
        {
          title: 'Search',
          url: '/search',
          description: 'Search the entire site',
        },
      ],
    },
    {
      title: 'Government',
      icon: <Building2 className='w-5 h-5' />,
      links: [
        {
          title: 'Government',
          url: '/government',
          description: `Overview of the local government of ${config.lgu.name}`,
        },
        {
          title: 'Elected Officials',
          url: '/government/elected-officials',
          description: 'Mayor, Vice Mayor and the Sangguniang Bayan',
        },
        {
          title: 'Departments',
          url: '/government/departments',
          description: 'Municipal departments and offices',
        },
        {
          title: 'Barangays',
          url: '/government/barangays',
          description: `The barangays of ${config.lgu.name}`,
        },
      ],
    },
    {
      title: 'Services',
      icon: <Briefcase className='w-5 h-5' />,
      links: [
        {
          title: 'Services',
          url: '/services',
          description: 'Guides to municipal services',
        },
      ],
    },
    ...(config.features.statistics
      ? [
          {
            title: 'Statistics',
            icon: <BarChart3 className='w-5 h-5' />,
            links: [
              {
                title: 'Population',
                url: '/statistics',
                description: 'Population by census year and barangay',
              },
              {
                title: 'Competitiveness',
                url: '/statistics/competitiveness',
                description: 'CMCI scores',
              },
              {
                title: 'Municipal Income',
                url: '/statistics/municipal-income',
                description: 'Revenue sources',
              },
            ],
          },
        ]
      : []),
    ...(config.features.transparency
      ? [
          {
            title: 'Transparency',
            icon: <FileText className='w-5 h-5' />,
            links: [
              {
                title: 'Transparency',
                url: '/transparency',
                description: 'Public funds, procurement and public works',
              },
              {
                title: 'Financial Reports',
                url: '/transparency/financial',
                description: 'Receipts and expenditures',
              },
              {
                title: 'Procurement',
                url: '/transparency/procurement',
                description: 'Bids and awarded contracts',
              },
              {
                title: 'DPWH Projects',
                url: '/transparency/infrastructure',
                description: 'Infrastructure projects in the area',
              },
            ],
          },
        ]
      : []),
    {
      title: 'Site Information',
      icon: <ScrollText className='w-5 h-5' />,
      links: [
        {
          title: 'Accessibility',
          url: '/accessibility',
          description: 'Accessibility statement and features',
        },
        {
          title: 'Terms of Service',
          url: '/terms-of-service',
          description: 'Terms for using this portal',
        },
      ],
    },
  ];

  return (
    <div className='py-12 min-h-screen bg-kapwa-bg-surface-raised'>
      <SEO
        title='Sitemap'
        description='Complete sitemap — find all pages and services available on this portal.'
        keywords={['sitemap', 'navigation', config.lgu.name]}
      />

      <div className='container mx-auto px-4 py-8 md:py-12'>
        <div className='mx-auto max-w-5xl'>
          <div className='overflow-hidden rounded-xl bg-kapwa-bg-surface shadow-xs'>
            <div className='p-6 border-b border-kapwa-border-weak md:p-8'>
              <h1 className='text-kapwa-text-strong kapwa-heading-xl font-extrabold'>
                Sitemap
              </h1>
              <p className='mt-2 text-kapwa-text-support'>
                All pages available on {config.portal.name}
              </p>
            </div>

            <div className='p-6 md:p-8'>
              <div className='space-y-12'>
                {sitemapSections.map((section, index) => (
                  <div key={index}>
                    <div className='flex items-center mb-4'>
                      <div className='p-2 mr-3 rounded-md bg-kapwa-bg-surface text-kapwa-text-brand'>
                        {section.icon}
                      </div>
                      <h2 className='text-xl font-bold text-kapwa-text-strong'>
                        {section.title}
                      </h2>
                    </div>

                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
                      {section.links.map((link, linkIndex) => (
                        <Link
                          key={linkIndex}
                          to={link.url}
                          className='flex flex-col p-4 rounded-lg border transition-colors group hover:border-kapwa-border-brand hover:bg-kapwa-bg-surface-brand border-kapwa-border-weak'
                        >
                          <div className='flex justify-between items-center mb-2'>
                            <h3 className='font-medium group-hover:text-kapwa-text-brand text-kapwa-text-strong'>
                              {link.title}
                            </h3>
                            <ChevronRight className='w-4 h-4 group-hover:text-kapwa-text-link text-kapwa-text-disabled' />
                          </div>
                          {link.description && (
                            <p className='text-sm text-kapwa-text-support'>
                              {link.description}
                            </p>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className='mt-8 text-sm text-center text-kapwa-text-support'>
            <p>
              Can&apos;t find what you&apos;re looking for? Try using our{' '}
              <Link
                to='/search'
                className='text-kapwa-text-brand hover:underline'
              >
                search feature
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SitemapPage;
