import type { ReactNode } from 'react';

type SwitchCasesProps = {
  step: number;
  cases: {
    [key: string]: ReactNode;
  };
  defaultCase?: ReactNode;
  fallbackCase?: ReactNode;
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
