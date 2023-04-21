import { ReactNode } from "react";

interface WithFileLengthProps {
  children?: ReactNode;
  filesLength: number;
  className?: string;
}

export const WithFileLength = ({
  className,
  children,
  filesLength = 0
}: WithFileLengthProps) => {
  if (filesLength === 0) {
    return null;
  }

  return <div className={className}>{children}</div>;
};
