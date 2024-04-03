import { useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";

import Logo from "../../assets/images/Liontech_logo.png";
import sass from "../../assets/styles/components/Header.module.scss";
import { useCookies } from "react-cookie";
import { useTranslation } from "react-i18next";

const Header = ({ isAdmin }: { isAdmin?: boolean; slug?: string }) => {
  const header = useRef<HTMLElement>(null);
  useEffect(() => {
    let prevScrollpos = window.scrollY;
    window.onscroll = function () {
      const currentScrollPos = window.scrollY;
      const HeaderEl = header.current;

      if (HeaderEl !== null) {
        if (prevScrollpos > currentScrollPos) {
          HeaderEl.style.top = "0";
        } else {
          HeaderEl.style.top = "-80px";
        }
        prevScrollpos = currentScrollPos;
      }
    };
  }, []);
  const [cookies, setCookies] = useCookies(["lang"]);
  const { t } = useTranslation();
  const Localizer = (value: string) => {
    setCookies("lang", value);
  };

  return (
    <header className={sass.Header} ref={header}>
      <nav className={sass.Nav}>
        <Link to="/" className={sass.Logo}>
          <img src={Logo} alt="Liontech logo" />
        </Link>
        <ul className={sass.Ul}>
          {isAdmin ? (
            <>
              <li>
                <a href="#Create" className={sass.RouteLinks}>
                  Qo'shish
                </a>
              </li>
              <li>
                <a href="#Edit" className={sass.RouteLinks}>
                  O'chirish yoki Tahrirlash
                </a>
              </li>
            </>
          ) : (
            <li>
              <NavLink className={sass.RouteLinks} to="/contacts">
                {t("header_comp.contact")}
              </NavLink>
            </li>
          )}
          <li>
            <select
              name="localizer"
              id="localizer"
              onChange={({ target }) => Localizer(target.value)}
              defaultValue={cookies.lang}
              className={sass.Localizer}
            >
              <option value="ru" className={sass.LocalizerOptions}>
                RUS
              </option>
              <option value="uz" className={sass.LocalizerOptions}>
                UZB
              </option>
            </select>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
