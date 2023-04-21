import { useState, useMemo, useCallback } from "react";
import { UploadedFiles } from "../src/widgets/UploadedFiles/UploadedFiles";
import { FilesToUpload } from "../src/widgets/FilesToUpload/FilesToUpload";
import { DropZone } from "../src/widgets/DropZone/DropZone";
import { getRandomInt } from "../src/shared/lib/getRandomInt";
import "./global.css";

export interface IFile {
  id?: string;
  file: File;
  isUploading?: boolean;
  progress?: number;
  custodian?: string;
  error?: Error;
}

const App: React.FC = () => {
  const [filesToUpload, setFilesToUpload] = useState<IFile[]>([]);

  const uploadedFiles = useMemo(
    () => filesToUpload.filter((file) => file.progress === 100),
    [filesToUpload]
  );

  const handleUploadClick = useCallback<(custodian: string) => void>(
    (custodian) => {
      setFilesToUpload((files) =>
        files.map((file) => ({ ...file, isUploading: true }))
      );

      filesToUpload
        .filter((f) => f.progress !== 100)
        .forEach((file) => {
          setTimeout(() => {
            Promise.resolve(
              new Promise((_, rej) => {
                // fake random network error
                if (getRandomInt(1, 5) === 2) {
                  const error = new Error(
                    "Error uploading the file. Please try again"
                  );
                  setFilesToUpload((files) =>
                    files.map((f) =>
                      f.id !== file.id
                        ? { ...f }
                        : {
                            ...f,
                            progress: 0,
                            isUploading: false,
                            error
                          }
                    )
                  );
                  return rej(error);
                }

                setFilesToUpload((files) =>
                  files.map((f) =>
                    f.id !== file.id
                      ? { ...f }
                      : {
                          ...f,
                          custodian,
                          progress: 100,
                          isUploading: false,
                          error: undefined
                        }
                  )
                );
              })
            );
          }, getRandomInt(1, 5) * 1000);
        });
    },
    [filesToUpload]
  );

  return (
    <div className="Container">
      <section className="Card">
        <UploadedFiles files={uploadedFiles} />
        <FilesToUpload
          files={filesToUpload.filter((f) => f.progress !== 100)}
          onUpload={handleUploadClick}
        />
        <DropZone setFilesToUpload={setFilesToUpload} />
      </section>
      <p className="Copyright">
        by{" "}
        <a
          href="https://github.com/Olga-Alieva"
          target="_blank"
          rel="noreferrer"
        >
          Olga Alieva
        </a>
      </p>
    </div>
  );
};

export default App;
