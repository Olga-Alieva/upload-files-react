import { useRef, useState, memo } from "react";
import { classNames } from "../../shared/lib/classNames";
import { getUId } from "../../shared/lib/getUId";
import { IFile } from "../../App";
import cls from "./DropZone.module.css";

interface DropZoneProps {
  className?: string;
  setFilesToUpload: React.Dispatch<React.SetStateAction<IFile[]>>;
}

export const DropZone = memo(
  ({ className, setFilesToUpload }: DropZoneProps) => {
    const [isDrugOver, setIsDrugOver] = useState(false);

    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const filesWithIds: IFile[] = Array.from(
        e.dataTransfer.files ?? []
      ).map((file) => ({ file, id: getUId() }));
      setFilesToUpload((files) => [...files, ...filesWithIds]);
      setIsDrugOver(false);
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const filesWithIds: IFile[] = Array.from(
        e.target.files ?? []
      ).map((file) => ({ file, id: getUId() }));
      setFilesToUpload((files) => [...files, ...filesWithIds]);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDrugOver(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDrugOver(false);
    };

    return (
      <div className={classNames(cls.DropZone, {}, [className])}>
        <h3 className={cls.UploadFilesTitle}>Upload Files</h3>
        <div
          className={classNames(cls.dropBox, {
            [cls.dropBoxHover]: isDrugOver
          })}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => inputRef.current?.click()}
        >
          <h4 className={cls.SelectFilesTitle}>Select or Drop Files here</h4>
          <p className={cls.FilesSupported}>
            {isDrugOver
              ? "Drop Your Files"
              : "Files Supported: PDF, TEXT, DOC , DOCX, PNG, JPG"}
          </p>
          <input
            accept=".doc,.docx,.pdf,.sh,.patch,.png,.jpg,.jpeg"
            ref={inputRef}
            type="file"
            id="fileInput"
            multiple
            onChange={handleFileInputChange}
            className={cls.FileInput}
          />
          <button
            className={classNames("btn", { [cls.ChooseBtnHover]: isDrugOver })}
          >
            Choose Files
          </button>
        </div>
      </div>
    );
  }
);
