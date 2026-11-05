import { useParams } from 'react-router-dom';

import { ExternalLink, InfoIcon, ScrollTextIcon } from 'lucide-react';

import { SEO } from '@/components/layout/SEO';
import {
  Breadcrumb,
  BreadcrumbHome,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/navigation/Breadcrumb';
import { Card, CardContent } from '@/components/ui/Card';

import {
  executiveOrderLabel,
  formatSignedDate,
  getExecutiveOrder,
} from '@/lib/executiveOrders';
import { config } from '@/lib/lguConfig';

const NOTICE =
  'This is a plain-language summary, not the legal text. The signed order is the official copy. Prices change only by a Supplemental Executive Order, so check the Municipal Government’s Facebook page for updates.';

export default function ExecutiveOrderDetail() {
  const { order: slug } = useParams();
  const order = slug ? getExecutiveOrder(slug) : undefined;

  if (!order)
    return (
      <div
        className='text-kapwa-text-disabled p-20 text-center font-bold tracking-widest uppercase'
        role='alert'
      >
        Executive Order Not Found
      </div>
    );

  const label = executiveOrderLabel(order);
  // Falls back to the Municipal Government's Facebook page until the post link is added
  const sourceUrl = order.source?.url || config.lgu.officialWebsite;

  return (
    <div className='animate-in fade-in space-y-6 pb-20 duration-500'>
      <SEO
        title={label}
        description={order.short_title}
        keywords={['executive order', config.lgu.name, order.short_title]}
      />

      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbHome href='/' />
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href='/government/executive-orders'>
              Executive Orders
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{label}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Title, date, effectivity, signatory */}
      <Card hover={false} className='rounded-xl p-6'>
        <div className='mb-3 flex items-start gap-3'>
          <ScrollTextIcon
            aria-hidden='true'
            className='text-kapwa-text-brand mt-1 h-5 w-5 shrink-0'
          />
          <h1 className='text-kapwa-text-strong kapwa-heading-xl font-extrabold'>
            {label}
          </h1>
        </div>
        <p className='text-kapwa-text-support mb-5 text-sm leading-relaxed'>
          {order.title}
        </p>
        <dl className='grid grid-cols-1 gap-4 text-sm sm:grid-cols-3'>
          <div>
            <dt className='text-kapwa-text-disabled mb-1 text-[10px] font-bold tracking-widest uppercase'>
              Signed
            </dt>
            <dd className='text-kapwa-text-strong font-bold'>
              {formatSignedDate(order.signed)}
            </dd>
          </div>
          <div>
            <dt className='text-kapwa-text-disabled mb-1 text-[10px] font-bold tracking-widest uppercase'>
              Effectivity
            </dt>
            <dd className='text-kapwa-text-strong font-bold'>
              {order.effectivity}
            </dd>
          </div>
          <div>
            <dt className='text-kapwa-text-disabled mb-1 text-[10px] font-bold tracking-widest uppercase'>
              Signed by
            </dt>
            <dd className='text-kapwa-text-strong font-bold'>
              {order.signatory.name}, {order.signatory.title}
            </dd>
          </div>
        </dl>
      </Card>

      {/* Not the legal text */}
      <div
        role='note'
        className='bg-kapwa-bg-warning-weak border-kapwa-border-weak flex items-start gap-3 rounded-xl border p-4'
      >
        <InfoIcon
          aria-hidden='true'
          className='text-kapwa-text-strong mt-0.5 h-5 w-5 shrink-0'
        />
        <p className='text-kapwa-text-strong text-sm leading-relaxed'>
          {NOTICE}
        </p>
      </div>

      {/* Short Filipino summary */}
      {order.summary_fil && (
        <Card hover={false} className='rounded-xl'>
          <CardContent className='p-6'>
            <h2 className='text-kapwa-text-disabled mb-2 text-[10px] font-bold tracking-widest uppercase'>
              Buod sa Filipino
            </h2>
            <p
              lang='fil'
              className='text-kapwa-text-support text-sm leading-relaxed'
            >
              {order.summary_fil}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Tables, e.g. the floor price */}
      {order.tables?.map(table => (
        <section
          key={table.title}
          aria-label={table.title}
          className='space-y-2'
        >
          <h2 className='text-kapwa-text-strong text-lg font-bold'>
            {table.title}
          </h2>
          {table.note && (
            <p className='text-kapwa-text-support text-sm'>{table.note}</p>
          )}
          <div className='border-kapwa-border-weak bg-kapwa-bg-surface overflow-x-auto rounded-xl border'>
            <table className='w-full text-left text-sm'>
              <thead className='bg-kapwa-bg-surface-raised'>
                <tr>
                  {table.columns.map(column => (
                    <th
                      key={column}
                      scope='col'
                      className='text-kapwa-text-support px-4 py-3 text-xs font-bold tracking-wider uppercase'
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.rows.map(row => (
                  <tr
                    key={row[0]}
                    className='border-kapwa-border-weak border-t'
                  >
                    {row.map((cell, index) =>
                      index === 0 ? (
                        <th
                          key={cell}
                          scope='row'
                          className='text-kapwa-text-strong px-4 py-3 text-left font-medium'
                        >
                          {cell}
                        </th>
                      ) : (
                        <td
                          key={cell}
                          className='text-kapwa-text-strong px-4 py-3 font-bold'
                        >
                          {cell}
                        </td>
                      )
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}

      {/* Key points */}
      {order.key_points?.map(group => (
        <section
          key={group.heading}
          aria-label={group.heading}
          className='space-y-2'
        >
          <h2 className='text-kapwa-text-strong text-lg font-bold'>
            {group.heading}
          </h2>
          <Card hover={false} className='rounded-xl'>
            <CardContent className='p-5'>
              <ul className='text-kapwa-text-support list-disc space-y-2 pl-5 text-sm leading-relaxed'>
                {group.points.map(point => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>
      ))}

      <a
        href={sourceUrl}
        target='_blank'
        rel='noopener noreferrer'
        className='bg-kapwa-bg-brand-default hover:bg-kapwa-bg-brand-hover text-kapwa-text-inverse inline-flex min-h-[44px] items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold transition-colors'
      >
        Read the original on the Municipal Government&apos;s Facebook page
        <ExternalLink aria-hidden='true' className='h-4 w-4 shrink-0' />
      </a>
    </div>
  );
}
