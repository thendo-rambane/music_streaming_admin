import { useRef } from "react";

interface FileInputProps {
  input?: React.ForwardedRef<HTMLInputElement>;
  onDrop: (files: File[]) => void;
}

export default function ImageInput({ input: ref, onDrop: cb }: FileInputProps) {
  return (
    <>
      <input
        ref={ref}
        type="file"
        onChange={(e) => {
          e.preventDefault();
          e.stopPropagation();
          e.target.files && cb([...e.target.files]);
        }}
        hidden
      />
    </>
  );
}
