import { useContext } from "react";
import sass from "../../assets/styles/components/Loading.module.scss";
import { ProcessesContext } from "../../contexts/ProcessesContext";
const Loading = () => {
  const { loading } = useContext(ProcessesContext);
  return (
    <section
      className={loading.loadingState === true ? sass.LoadingTrue : sass.LoadingFalse}
    >
      <h3 className={sass.Text}>Yuklanmoqda...</h3>
    </section>
  );
};

export default Loading;
