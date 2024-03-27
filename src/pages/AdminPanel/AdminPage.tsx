import { useState } from "react";
import { useEditor, Editable } from "@wysimark/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { v4 } from "uuid";
import {
  ref as StorageRef,
  getDownloadURL,
  uploadString,
} from "firebase/storage";
import { doc as FirestoreRef, setDoc } from "firebase/firestore";

import ProductImages from "../../components/UI/ProductImages";
import { DummyLaptop } from "../../utils/DummyData";
import { Laptop, LaptopImagesProps } from "../../types/records";
import { SlugMaker } from "../../utils/utils";
import AddImageIcon from "../../assets/images/addImageIcon.png";
import sass from "../../assets/styles/pages/AdminPage.module.scss";
import { db, storage } from "../../firebase/firebase";

interface TempImages {
  primary: LaptopImagesProps;
  all: LaptopImagesProps[];
}
const AdminPage = () => {
  const [imageForSlider, setImageForSlider] = useState<TempImages>(
    DummyLaptop.images
  );
  const fileUploader = (
    files: FileList | null,
    SettingImg: React.Dispatch<React.SetStateAction<TempImages>>
  ) => {
    const temp: TempImages = DummyLaptop.images;
    SettingImg(DummyLaptop.images);
    if (files) {
      for (const image of files) {
        const reader = new FileReader();
        reader.onload = () => {
          (temp.primary = {
            img_url: reader.result as string,
            metadata: {
              alt: image.name,
            },
          }),
            SettingImg((prev) => ({
              ...prev,
              all: [
                ...prev.all,
                {
                  img_url: reader.result as string,
                  metadata: {
                    alt: image.name,
                  },
                },
              ],
            }));
        };
        reader.readAsDataURL(image);
      }
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleUploadingData: SubmitHandler<Laptop | FieldValues> = async (
    data
  ) => {
    const completedData = {
      title: data.title,
      price: Number(data.price),
      slug: SlugMaker(data.title),
      others: MdEditor.getMarkdown(),
      images: {
        ...imageForSlider,
      },
      character: {
        battery: data.battery,
        display: data.display,
        cpu: data.cpu,
        memory: data.memory,
        gpu: data.gpu,
        storage: data.storage,
        os: data.os,
      },
    };
    const ProductUUID = v4();
    // image uploading
    const imageArray = imageForSlider.all;
    for (let i = 0; i < imageArray.length; i++) {
      const imageRef = StorageRef(
        storage,
        `Products/${ProductUUID}/${imageArray[i].metadata.alt}`
      );
      await uploadString(imageRef, imageArray[i].img_url, "data_url")
        .then((uploadedImg) => console.log(uploadedImg))
        .catch((reason) => console.error(reason));

      imageArray[i].img_url = await getDownloadURL(imageRef);
      imageArray[i].metadata.alt = data.title;

      imageForSlider.primary.img_url = await getDownloadURL(imageRef);
    }
    // product data uploading
    const DataRef = FirestoreRef(db, "Products", ProductUUID);
    await setDoc(DataRef, completedData);
  };
  const [editorValue, setEditorValue] = useState<string>("");
  const MdEditor = useEditor({ minHeight: 300 });
  console.log(imageForSlider);

  return (
    <section className={sass.AdminPage}>
      <form
        className={sass.Properties}
        onSubmit={handleSubmit(handleUploadingData)}
      >
        <div className={sass.Images}>
          <ProductImages
            oneProdImgs={imageForSlider}
            className={sass.ImagesSlider}
            isInAdminPage={true}
          />
          <input
            type="file"
            accept="image"
            className={sass.ImagesInput}
            multiple

            {...register("images", { required: true })}
            onChange={({ target }) =>
              fileUploader(target.files, setImageForSlider)
            }
          />
          <div className={sass.ImagesInputPrew}>
            <img src={AddImageIcon} alt="No temp Image" />
          </div>
        </div>
        <div className={sass.Props}>
          <div className={sass.TitleBlock}>
            <input
              className={sass.Title}
              placeholder="Maxsulot nomini kiriting.."
              {...register("title", { required: true })}
            />
            {errors.title && (
              <span className={sass.ErrorMessage}>
                Iltimos Nom kiriting...{" "}
              </span>
            )}
          </div>

          <div className={sass.PriceBlock}>
            <input
              type="number"
              placeholder="Narx kiriting"
              className={sass.Price}
              {...register("price", { required: true })}
            />
            {errors.price && (
              <span className={sass.ErrorMessage}>
                Iltimos narx kiriting...{" "}
              </span>
            )}
          </div>
          <div className={sass.Characters}>
            {Object.keys(DummyLaptop.character).map((name: string) => (
              <div className={sass.Char}>
                {" "}
                <span className={sass.CharTitle}>{name.toUpperCase()}: </span>
                <input
                  type="text"
                  placeholder="Ma'lumotlarni kiriting.."
                  className={sass.CharValue}
                  {...register(name, { required: true })}
                />
                {errors[name] && (
                  <span className={sass.ErrorMessage}>
                    Iltimos, ma'lumotlarni to'liq kiriting !
                  </span>
                )}
              </div>
            ))}
          </div>
          <button type="submit">
            <a target="_blank" className={sass.Ordered}>
              Jo'natish
            </a>
          </button>
        </div>
      </form>
      <div className={sass.OtherProps}>
        <h3 className={sass.Text}>Boshqa Ma'lumotlar</h3>
        <Editable
          editor={MdEditor}
          onChange={setEditorValue}
          value={editorValue}
          placeholder="Boshqa Ma'lumotlar.."
          className={sass.MdEditor}
        />
      </div>
    </section>
  );
};

export default AdminPage;
