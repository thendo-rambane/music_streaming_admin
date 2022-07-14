import { Notification } from "@mantine/core";
import { Check, X } from "tabler-icons-react";

export type UploadStatus = "uploading" | "success" | "error" | undefined;
type Props = {
  uploadStatus: UploadStatus;
};

const UploadStatusNotification = ({ uploadStatus }: Props) => {
  return (
    <div>
      {uploadStatus === "uploading" && (
        <Notification
          loading={uploadStatus === "uploading"}
          title="Uploading Song"
          disallowClose
        ></Notification>
      )}
      {uploadStatus === "success" && (
        <Notification
          icon={<Check size={18} />}
          color="teal"
          title="Song Uploaded"
        ></Notification>
      )}
      {uploadStatus === "error" && (
        <Notification
          icon={<X size={18} />}
          color="red"
          title="Song Upload Error"
        ></Notification>
      )}
    </div>
  );
};

export default UploadStatusNotification;
