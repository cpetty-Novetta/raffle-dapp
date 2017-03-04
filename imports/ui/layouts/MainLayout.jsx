const MainLayout = ({content}) => (
    <div>
      <header>
        This is our header
      </header>
      <main>
        {content()}
      </main>
    </div>
);