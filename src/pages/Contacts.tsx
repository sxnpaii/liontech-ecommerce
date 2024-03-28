import { useTranslation } from "react-i18next";
import sass from "../assets/styles/pages/Contact.module.scss";

const Contacts = () => {
  const { t } = useTranslation();
  return (
    <section className={sass.Contact}>
      <h6 className={sass.Text}>
        {t("contact_page.short_desc")}
        <br />
        <a href="tel:+998881811177" className={sass.tel}>
          +998 88 181 11 77
        </a>
      </h6>
    </section>
  );
};

export default Contacts;
