import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes";
// localization
import { I18nextProvider, useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

function App() {
  const router = createBrowserRouter(routes);
  const [cookies] = useCookies(["lang"]);
  const { i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage(cookies.lang);
  }, [cookies, i18n]);

  return (
    <I18nextProvider i18n={i18n}>
      <RouterProvider router={router} />
    </I18nextProvider>
  );
}

export default App;
