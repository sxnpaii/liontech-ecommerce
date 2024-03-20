import sass from "../assets/styles/pages/Contact.module.scss";

const Contacts = () => {
  return (
    <section className={sass.Contact}>
      <h6 className={sass.Text}>
        Biz endi boshladik, shuning uchun sayt hozircha test rejimda ishlayapti.
        Agar noutbuk sotib olmoqchi bo'lsangiz quyidagi raqamga murojaat qiling.{" "}
        <br />
        <a href="tel:+998881811177" className={sass.tel}>+998 88 181 11 77</a>
      </h6>
    </section>
  );
};

export default Contacts;
