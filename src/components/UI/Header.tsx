import { useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";

import Logo from "../../assets/images/Liontech_logo.png"
import sass from "../../assets/styles/components/Header.module.scss";
const Header = () => {
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
  return (
    <header className={sass.Header} ref={header}>
      <nav className={sass.Nav}>
        <Link to="/" className={sass.Logo}>
          <img src={Logo} alt="Liontech logo" />
        </Link>
        <ul className={sass.Ul}>
          <li>
            <NavLink className={sass.RouteLinks} to="/contacts">
              Bog'lanish
            </NavLink>
          </li>
          <li>
            
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
