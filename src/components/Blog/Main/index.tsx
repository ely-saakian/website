const Main: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <main className="flex flex-col px-5 space-y-10 mx-auto">{children}</main>
  );
};

export default Main;
