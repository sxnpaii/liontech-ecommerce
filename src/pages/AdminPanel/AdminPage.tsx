import { useContext, useState } from "react";
import { useEditor, Editable } from "@wysimark/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { v4 } from "uuid";
import { useTranslation } from "react-i18next";

import {
  ref as StorageRef,
  getDownloadURL,
  uploadString,
  deleteObject,
} from "firebase/storage";
import { doc as FirestoreRef, setDoc, deleteDoc } from "firebase/firestore";
import { db, storage } from "../../firebase/firebase";

import { ProcessesContext } from "../../contexts/ProcessesContext";
import Modal from "../../components/UI/Modal";
import Loading from "../../components/UI/Loading";
import ProductImages from "../../components/UI/ProductImages";

import { DummyLaptop } from "../../utils/DummyData";
import { SlugMaker } from "../../utils/utils";
import { Laptop, LaptopImagesProps } from "../../types/records";

import AddImageIcon from "../../assets/images/addImageIcon.png";
import sass from "../../assets/styles/pages/AdminPage.module.scss";
import { UserContext } from "../../contexts/UserContext";
import Product from "../../components/UI/Product";

interface TempImages {
  primary: LaptopImagesProps;
  all: LaptopImagesProps[];
}
const AdminPage = () => {
  const [imageForSlider, setImageForSlider] = useState<TempImages>(
    DummyLaptop.images
  );
  const { loading } = useContext(ProcessesContext);
  // Collecting images from input
  const fileUploader = (files: FileList | null) => {
    setImageForSlider(DummyLaptop.images);
    if (files) {
      for (const image of files) {
        const reader = new FileReader();
        reader.onload = () => {
          setImageForSlider((prev) => ({
            primary: {
              img_url: reader.result as string,
              metadata: {
                alt: image.name,
              },
            },
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
  // collect data from form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  // Upload data to server
  const handleUploadingData: SubmitHandler<Laptop | FieldValues> = async (
    data
  ) => {
    loading.mutateLoading(true);
    const ProductUUID = v4();
    // image uploading
    const imageArray = imageForSlider.all;
    for (let i = 0; i < imageArray.length; i++) {
      const imageRef = StorageRef(
        storage,
        `Products/${ProductUUID}/${imageArray[i].metadata.alt}`
      );

      await uploadString(imageRef, imageArray[i].img_url as string, "data_url")
        .then((uploadedImg) => console.log(uploadedImg))
        .catch((reason) => console.error(reason));
      imageArray[i].img_url = await getDownloadURL(imageRef);
      imageForSlider.primary.img_url = await getDownloadURL(imageRef);
    }
    // format and ready to publish
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
    // product data uploading
    const DataRef = FirestoreRef(db, "Products", ProductUUID);
    await setDoc(DataRef, completedData).then(() =>
      alert("Ma'lumotlar muvoffaqiyatli yuklandi !")
    );
    loading.mutateLoading(false);
    reset();
  };
  // deleting product
  const DeleteProduct = async (id?: string, images?: Laptop["images"]) => {
    try {
      if (images) {
        loading.mutateLoading(true);
        for (const image of images.all) {
          const storageRef = StorageRef(
            storage,
            `Products/${id}/${image.metadata.alt}`
          );
          await deleteObject(storageRef);
        }
      }
      const docRef = FirestoreRef(db, "Products", id as string);
      await deleteDoc(docRef).then(() => {
        alert("Muvaffaqiyatli O'chirildi !");
        loading.mutateLoading(false);
        location.reload();
      });
    } catch (error) {
      console.error(error);
    }
  };
  const EditableProducts = useContext(UserContext);
  // Others rich editor
  const [editorValue, setEditorValue] = useState<string>("");
  const MdEditor = useEditor({ minHeight: 300 });
  // localization
  const { t } = useTranslation();
  // modal states
  const { modal } = useContext(ProcessesContext);
  // loading states

  return (
    <section className={sass.AdminPage}>
      <section className={sass.PostProducts} id="Create">
        <h3 className={sass.CreateTitle}>{t("admin_page.create_title")}</h3>
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
              accept="image/*"
              className={sass.ImagesInput}
              multiple
              {...register("images", { required: true })}
              onChange={({ target }) => fileUploader(target.files)}
            />
            <div className={sass.ImagesInputPrew}>
              <img src={AddImageIcon} alt="No temp Image" />
            </div>
          </div>
          <div className={sass.Props}>
            <div className={sass.TitleBlock}>
              <input
                className={sass.Title}
                placeholder={t("admin_page.enter_title")}
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
                placeholder={t("admin_page.enter_price")}
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
                <div className={sass.Char} key={name}>
                  {" "}
                  <span className={sass.CharTitle}>
                    {t(`one_product_page.character.${name}`)}:{" "}
                  </span>
                  <input
                    type="text"
                    placeholder={t("admin_page.enter_infos")}
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
            <a
              target="_blank"
              className={sass.Ordered}
              onClick={() => modal.mutateModal(true)}
            >
              {t("admin_page.send")}
            </a>
            <Modal />
          </div>
        </form>
        <div className={sass.OtherProps}>
          <h3 className={sass.Text}>{t("one_product_page.others")}</h3>
          <Editable
            editor={MdEditor}
            onChange={setEditorValue}
            value={editorValue}
            placeholder={t("one_product_page.others")}
            className={sass.MdEditor}
          />
        </div>
      </section>
      <hr className={sass.Line} />
      <section className={sass.EditProducts} id="Edit">
        <h3 className={sass.EditTitle}>
        {t("admin_page.edit_title")}
        </h3>
        <div className={sass.Wrapper}>
          {EditableProducts &&
            EditableProducts.map((prod) => (
              <Product
                product={prod}
                key={prod.slug}
                isAdmin
                actions={{
                  Delete: DeleteProduct,
                }}
              />
            ))}
        </div>
      </section>
      <Loading />
    </section>
  );
};

export default AdminPage;
