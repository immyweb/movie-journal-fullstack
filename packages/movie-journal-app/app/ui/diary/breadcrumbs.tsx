import Link from 'next/link';
import { Breadcrumbs, Anchor } from '@mantine/core';

interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
}

export default function BreadcrumbNav({
  breadcrumbs,
}: {
  breadcrumbs: Breadcrumb[];
}) {
  const items = breadcrumbs.map((breadcrumb) => {
    return (
      <Anchor key={breadcrumb.label} component={Link} href={breadcrumb.href}>
        {breadcrumb.label}
      </Anchor>
    );
  });

  return (
    <nav style={{ marginBottom: 25 }}>
      <Breadcrumbs>{items}</Breadcrumbs>
    </nav>
  );
}
