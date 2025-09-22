type SwitchCasesProps = {
  step: number;
  cases: {
    [key: string]: React.ReactNode;
  };
  defaultCase?: React.ReactNode;
  fallbackCase?: React.ReactNode;
};

const SwitchCases = ({
  step,
  cases,
  defaultCase,
  fallbackCase,
}: SwitchCasesProps) => {
  return <>{cases[step] || defaultCase || fallbackCase}</>;
};

export default SwitchCases;
