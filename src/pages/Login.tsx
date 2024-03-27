import { useForm } from "react-hook-form";
import { v4 } from "uuid";
import { User, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { auth } from "../firebase/firebase";
import { LoginReq } from "../types/others";
import sass from "../assets/styles/pages/Login.module.scss";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginReq>();
  const [cookies, setCookie] = useCookies();
  const [errorMessages, setErrorMessages] = useState<string>("");

  const LoggingIn = ({
    email,
    password,
  }: {
    email: LoginReq["email"];
    password: LoginReq["password"];
  }) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }: { user: User }) => {
        const UUID = v4();
        setCookie("authToken", user.uid + UUID);
        navigate(`/dashboard/${user.uid + UUID}`);
      })
      .catch((error) => {
        setErrorMessages(error.message ? "Login yoki parol xato ! Qaytadan urinib ko'ring!" : "");
      });
  };
  return (
    <main className={sass.Login}>
      <h6 className={sass.Text}>Boshqaruv paneliga kiring </h6>
      <form onSubmit={handleSubmit(LoggingIn)} className={sass.Form}>
        <div className={sass.Email}>
          <input
            type="email"
            placeholder="name@example.com"
            {...register("email", { required: "Email kiriting !" })}
          />

          {errors.email && (
            <span className={sass.Error}>{errors.email?.message}</span>
          )}
        </div>

        <div className="password">
          <input
            type="password"
            placeholder="password1234"
            {...register("password", { required: "Parol kiriting !" })}
          />
          {(errors.password && (
            <span className={sass.Error}>{errors.password?.message}</span>
          )) ||
            (errorMessages && (
              <span className={sass.Error}>{errorMessages}</span>
            ))}
        </div>
        <button type="submit" className={sass.Button}>
          Kirish
        </button>
      </form>
    </main>
  );
};

export default Login;
