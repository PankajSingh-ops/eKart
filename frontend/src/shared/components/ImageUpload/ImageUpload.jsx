import { useRef } from "react";
import Button from "../UIElements/Button";
import styles from "./ImageUpload.module.css";

export default function ImageUpload(props) {
  const imagePicker = useRef();
  const imagePreview = useRef();

  const pickImageHandler = () => {
    imagePicker.current.click();
  };

  const pickedhandler = (event) => {
    // console.log(event.target.files);
    if (event.target.files.length > 0) {
      const pickedFile = event.target.files[0];

      const fileReader = new FileReader();
      fileReader.onload = () => {
        imagePreview.current.src = fileReader.result;
        props.onGetImage("imageUrl", pickedFile);
      };
      fileReader.readAsDataURL(pickedFile);
    } else {
      return false;
    }
  };

  return (
    <>
      <input
        type="file"
        id="imageUrl"
        hidden
        ref={imagePicker}
        onChange={pickedhandler}
        multiple
      />
      <div className={`${styles["image-upload"]} ${styles.center}`}>
        <div className={styles["image-upload__preview"]}>
          <img
            src={
              props.image
                ? `http://localhost:4000/${props.image}`
                : "http://via.placeholder.com/640x360"
            }
            alt="Preview"
            ref={imagePreview}
          />
        </div>
        <Button type="button" onClick={pickImageHandler}>
          PICK IMAGE
        </Button>
      </div>
    </>
  );
}
