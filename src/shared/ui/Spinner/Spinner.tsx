import { memo } from "react";
import { classNames } from "../../lib/classNames";
import cls from "./Spinner.module.css";

interface SpinnerProps {
  className?: string;
}

export const Spinner = memo(({ className }: SpinnerProps) => {
  return <div className={classNames(cls.Loading, {}, [className])}></div>;
});
