interface ResponsiveViewProps {
  mobile: React.ReactNode;
  desktop: React.ReactNode;
}

export default function ResponsiveView({
  mobile,
  desktop,
}: ResponsiveViewProps) {
  return (
    <>
      <div className="lg:hidden">{mobile}</div>
      <div className="hidden lg:block">{desktop}</div>
    </>
  );
}
