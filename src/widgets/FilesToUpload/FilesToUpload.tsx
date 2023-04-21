import { memo, useCallback, useState } from "react";
import { IFile } from "../../App";
import { WithFileLength } from "../../features/WithFileLength/WithFileLength";
import { FileIcon } from "../../shared/icons/FileIcon";
import { ErrorIcon } from "../../shared/icons/ErrorIcon";
import { classNames } from "../../shared/lib/classNames";
import { Input } from "../../shared/ui/Input/Input";
import { Spinner } from "../../shared/ui/Spinner/Spinner";
import cls from "./FilesToUpload.module.css";

interface FilesToUploadProps {
  className?: string;
  files: IFile[];
  onUpload: (custodian: string) => void;
}

export const FilesToUpload = memo(
  ({ className, files, onUpload }: FilesToUploadProps) => {
    const [custodian, setCustodian] = useState("");

    const handleCustodianChange = useCallback((value: string) => {
      setCustodian(value);
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onUpload(custodian);
    };

    const renderStatusIcon = ({
      error,
      isUploading
    }: {
      error?: Error;
      isUploading?: boolean;
    }) => {
      if (isUploading) {
        return <Spinner />;
      }
      if (error) {
        return <ErrorIcon />;
      }
      return <FileIcon />;
    };

    return (
      <WithFileLength filesLength={files.length} className={cls.FilesToUpload}>
        <h3 className={cls.Title}>Files To Upload</h3>
        <div className={classNames(cls.Files, {}, [className])}>
          {files.map(({ file, id, isUploading, error }) => (
            <div className={cls.File} key={id}>
              {renderStatusIcon({ error, isUploading })}
              {file.name} - {(file.size / (1024 * 1024)).toFixed(2)} MB
              {error && <div className={cls.Error}>{error.message}</div>}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          <div className={cls.CustodianWrapper}>
            <label htmlFor="custodian">Custodian:</label>
            <Input
              required
              autoFocus
              type="text"
              className={cls.input}
              placeholder="Username"
              onChange={handleCustodianChange}
              value={custodian}
            />
          </div>

          <button className="btn" type="submit">
            Upload
          </button>
        </form>
      </WithFileLength>
    );
  }
);
