import {
  ChangeEvent,
  InputHTMLAttributes,
  memo,
  useRef,
  useEffect,
  MutableRefObject
} from "react";
import { classNames } from "../../lib/classNames";
import cls from "./Input.module.css";

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange"
>;

interface InputProps extends HTMLInputProps {
  className?: string;
  type?: string;
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  autoFocus?: boolean;
}

export const Input = memo(
  ({
    className,
    type = "text",
    value,
    placeholder,
    onChange,
    autoFocus = false,
    ...otherProps
  }: InputProps) => {
    const onChangehandler = (e: ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value);
    };

    const ref = useRef() as MutableRefObject<HTMLInputElement>;

    useEffect(() => {
      if (autoFocus) {
        ref.current.focus();
      }
    }, [autoFocus]);

    return (
      <div>
        <input
          className={classNames(cls.Input, {}, [className])}
          ref={ref}
          type={type}
          value={value}
          onChange={onChangehandler}
          placeholder={placeholder}
          {...otherProps}
        />
      </div>
    );
  }
);
