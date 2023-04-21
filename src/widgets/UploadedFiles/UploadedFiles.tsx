import { memo } from "react";
import { IFile } from "../../App";
import { WithFileLength } from "../../features/WithFileLength/WithFileLength";
import { CompletedIcon } from "../../shared/icons/CompletedIcon";
import { UserIcon } from "../../shared/icons/UserIcon";
// import { IFile } from "../--FileUpload/FileUpload";
// import { WithFileLength } from "../WithFileLength/WithFileLength";
import cls from "./UploadedFiles.module.css";
// import { CompletedIcon } from "../../icons/CompletedIcon";
// import { UserIcon } from "../../icons/UserIcon";

interface UploadedFilesProps {
  className?: string;
  files: IFile[];
}

export const UploadedFiles = memo(({ files = [] }: UploadedFilesProps) => {
  return (
    <WithFileLength filesLength={files.length} className={cls.UploadedFiles}>
      <h3 className={cls.Title}>Uploaded files</h3>
      {files.map(({ file, id, custodian }) => (
        <div key={id} className={cls.UploadedFile}>
          <CompletedIcon />
          <div>
            {file.name} / <UserIcon /> {custodian}
          </div>
        </div>
      ))}
    </WithFileLength>
  );
});
