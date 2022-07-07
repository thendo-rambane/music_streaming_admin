import { useRef } from "react";

interface FileInputProps {
  input?: React.ForwardedRef<HTMLInputElement>;
  onChange: (files: File[]) => void;
}

export default function ImageInput({
  input: ref,
  onChange: cb,
}: FileInputProps) {
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
        onInput={(e) => {
          e.preventDefault();
          e.stopPropagation();
          e.currentTarget.files && cb([...e.currentTarget.files]);
        }}
        hidden
      />
    </>
  );
}
