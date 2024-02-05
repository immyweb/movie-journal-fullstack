import { IconPower } from '@tabler/icons-react';
import NavLinks from './nav-links';
import { signOut } from '../../../auth';

export default function SideNav() {
  return (
    <div
      style={{
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
      <NavLinks />
      <form
        action={async () => {
          'use server';
          await signOut();
        }}
      >
        <button style={{ marginTop: 'auto', display: 'flex', padding: 5 }}>
          <IconPower size={24} />
          <div style={{ paddingLeft: 10 }}>Sign Out</div>
        </button>
      </form>
    </div>
  );
}
