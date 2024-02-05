import SideNav from '../ui/dashboard/sidenav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        overflow: 'hidden',
        flexDirection: 'row',
        height: '100vh',
        display: 'flex',
      }}
    >
      <nav
        style={{
          width: '16rem',
          flex: 'none',
          backgroundColor: '#2e2e2e',
        }}
      >
        <SideNav />
      </nav>
      <section
        style={{
          padding: '3rem',
          overflowY: 'auto',
          flexGrow: 1,
        }}
      >
        {children}
      </section>
    </div>
  );
}
