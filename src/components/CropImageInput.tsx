import React, { useEffect, useRef, useState } from "react";
import ImageInput from "./ImageInput";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Button } from "@mantine/core";
import { useModals } from "@mantine/modals";

type Props = {
  inputRef: React.RefObject<HTMLInputElement>;
  onChange: (image: Blob | null) => void;
};

const CropImageInput = ({ inputRef, onChange }: Props) => {
  const modals = useModals();
  /**Crop hooks */
  interface ReactCropperElement extends HTMLImageElement {
    cropper?: Cropper;
  }
  const cropperRef = useRef<ReactCropperElement>(null);
  const [croppedImg, setCroppedImg] = useState<Blob | null>(null);
  const onCrop = () => {
    const imageElement = cropperRef.current && cropperRef.current;
    if (imageElement !== null) {
      const cropper = imageElement.cropper && imageElement.cropper;
      if (cropper !== undefined) {
        const canvas = cropper.getCroppedCanvas();
        canvas.toBlob((blob) => {
          if (blob !== null) {
            setCroppedImg(blob);
          }
        });
      }
    }
  };

  useEffect(() => {
    onChange(croppedImg);
  }, [croppedImg]);
  /**
   *  TODO: ADD desired width height for aspect changes
   *
   *
   * @param image - The image to be cropped
   * @returns void
   */
  const openModal = (image: string) => {
    const modal_id = modals.openModal({
      title: "Crop Image",
      children: (
        <div>
          {image !== "" ? (
            <Cropper
              src={image}
              guides={false}
              crop={onCrop}
              ref={cropperRef}
              viewMode={1}
              minCropBoxHeight={10}
              minCropBoxWidth={10}
              responsive={true}
              autoCropArea={1}
              aspectRatio={1}
              checkOrientation={false}
            />
          ) : (
            <h1>No Image Selected</h1>
          )}
          <Button onClick={() => modals.closeModal(modal_id)}>Set Image</Button>
          <Button
            onClick={() => {
              modals.closeModal(modal_id);
              if (inputRef !== null)
                inputRef.current && inputRef.current.click();
            }}
          >
            Change Image
          </Button>
        </div>
      ),
    });
  };

  /**Crop hooks */
  return (
    <div>
      <ImageInput
        input={inputRef}
        onChange={(files) => {
          // URL.revokeObjectURL(originalFile);
          if (files.length > 0) {
            const image = URL.createObjectURL(files[0]);
            openModal(image);
          }
        }}
      />
    </div>
  );
};

export default CropImageInput;
