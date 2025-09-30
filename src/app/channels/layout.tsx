function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <div id="portal" />
    </>
  );
}

export default layout;
