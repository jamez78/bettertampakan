import { Link } from 'react-router-dom';

import { ArrowRight, CalendarIcon, ScrollTextIcon } from 'lucide-react';

import { SEO } from '@/components/layout/SEO';
import { PageHero } from '@/components/layout/PageLayouts';
import { Card, CardContent } from '@/components/ui/Card';

import {
  executiveOrderLabel,
  executiveOrders,
  formatSignedDate,
} from '@/lib/executiveOrders';
import { config } from '@/lib/lguConfig';

export default function ExecutiveOrdersIndex() {
  const count = executiveOrders.length;

  return (
    <>
      <SEO
        title='Executive Orders'
        description={`Executive orders issued by the Municipal Mayor of ${config.lgu.name}, summarised in plain language.`}
        keywords={['executive orders', config.lgu.name, config.lgu.province]}
      />
      <PageHero
        title='Executive Orders'
        description={`${count} executive ${count === 1 ? 'order' : 'orders'} listed. This is not a complete list.`}
      />

      <ul className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        {executiveOrders.map(order => (
          <li key={order.slug}>
            <Link
              to={`/government/executive-orders/${order.slug}`}
              className='group block h-full'
            >
              <Card
                hover
                className='border-kapwa-border-weak flex h-full flex-col shadow-xs'
              >
                <CardContent className='flex h-full flex-col gap-4 p-5'>
                  <div className='flex items-start gap-3'>
                    <div className='bg-kapwa-bg-surface text-kapwa-text-brand border-kapwa-border-brand group-hover:bg-kapwa-bg-brand-default group-hover:text-kapwa-text-inverse shrink-0 rounded-lg border p-2 shadow-sm transition-colors'>
                      <ScrollTextIcon className='h-5 w-5' />
                    </div>
                    <div className='min-w-0 flex-1'>
                      <h2 className='text-kapwa-text-strong group-hover:text-kapwa-text-brand text-base leading-tight font-bold transition-colors'>
                        {executiveOrderLabel(order)}
                      </h2>
                      <p className='text-kapwa-text-support mt-1 text-sm leading-snug'>
                        {order.short_title}
                      </p>
                    </div>
                    <ArrowRight
                      aria-hidden='true'
                      className='group-hover:text-kapwa-text-link text-kapwa-text-support mt-1 h-4 w-4 shrink-0 transition-all'
                    />
                  </div>
                  <p className='text-kapwa-text-disabled mt-auto flex items-center gap-2 border-t pt-3 text-xs font-bold tracking-wider uppercase'>
                    <CalendarIcon aria-hidden='true' className='h-3.5 w-3.5' />
                    Signed {formatSignedDate(order.signed)}
                  </p>
                </CardContent>
              </Card>
            </Link>
          </li>
        ))}
      </ul>

      <p className='text-kapwa-text-disabled mt-6 text-center text-xs'>
        These pages are plain-language summaries, not the legal text. The signed
        orders are the official copies.
      </p>
    </>
  );
}
