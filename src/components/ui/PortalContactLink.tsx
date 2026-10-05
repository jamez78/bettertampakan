import { config } from '@/lib/lguConfig';

/**
 * Link to reach the portal maintainers: the contact email when one is
 * configured, otherwise the project's GitHub issues page.
 */
export function PortalContactLink({ className }: { className?: string }) {
  const email = config.portal.contactEmail;

  if (email) {
    return (
      <a href={`mailto:${email}`} className={className}>
        {email}
      </a>
    );
  }

  return (
    <a
      href={`${config.portal.githubUrl}/issues`}
      target='_blank'
      rel='noopener noreferrer'
      className={className}
    >
      GitHub issues page
    </a>
  );
}
