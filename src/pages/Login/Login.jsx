import "./style.css";
import { useState } from "react";
import LoginInput from "../../components/inputs/LoginInput";
import { Formik, Form } from "formik";
import Button from "@mui/material/Button";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import BeatLoader from "react-spinners/BeatLoader";
import { useDispatch } from "react-redux";
import { loginVendeur } from "../../reducers/vendeurReducer";

function Login() {
  const initial_user = {
    email: "",
    password: "",
  };
  const [user, setUser] = useState(initial_user);
  const { email, password } = user;
  const [passwordType, setPasswordType] = useState("password");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const loginValidation = yup.object({
    email: yup
      .string()
      .required("Vous devez entrer votre adresse Email")
      .email("L'email doit etre valide")
      .min(10)
      .max(50),
    password: yup.string().required("Vous devez entrer votre mot de passe"),
  });

  const dispatch = useDispatch();
  const submitLogin = async () => {
    setLoading(true);
    setError("");
    const response = await axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/api/bo/api.php?action=login`,
        {
          email: user.email,
          mdp: user.password,
        }
      )
      .catch((error) => {
        console.log(error);
        setLoading(false);
        if (error.response.data.content === "infos not correct") {
          setError("email ou mot de passe incorrect");
        }
      });
    if (response) {
      if (response.data.response) {
        const id_vendeur = response.data.content;
        setLoading(false);
        // dispach login action in vendeur reducer using redux
        const resp = await axios
          .get(
            `${process.env.REACT_APP_BACKEND_URL}/api/bo/api.php?action=infos_vendeur&id_vendeur=${id_vendeur}`
          )
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });
        const infos_vendeur = { id_vendeur: id_vendeur, ...resp.data.content };
        // dispach login action in vendeur reducer using redux
        dispatch(loginVendeur(infos_vendeur));
        // set vendeur cookie to vendeur infos
        Cookies.set("vendeur", JSON.stringify(infos_vendeur));
        navigate("/vendeur/");
      }
    }
  };
  return (
    <div className="login_wrap">
      <div className="logo">
        <img src="logo.png" alt="" />
      </div>
      <div className="form_wrap">
        <div className="text-center font-bold text-2xl">Connexion</div>
        <div className=" h-[1px] w-full bg-[#F2F2F2] my-3"></div>
        <div className="text-center font-bold sm:text-lg text-base my-4">
          Veuillez introduire vos coordonnées
        </div>
        <Formik
          enableReinitialize
          initialValues={{ email, password }}
          validationSchema={loginValidation}
          onSubmit={submitLogin}
        >
          {(formikProps) => (
            <Form className="flex flex-col justify-start items-center gap-4">
              <LoginInput
                type="email"
                name="email"
                placeholder="Email"
                size="large"
                onChange={handleUserChange}
              />
              <LoginInput
                type={passwordType}
                setPasswordType={setPasswordType}
                name="password"
                placeholder="Mot de passe"
                size="large"
                onChange={handleUserChange}
                password
              />
              <div className="my-4 font-bold sm:text-base text-sm">
                Oublié votre mot de passe ?{" "}
                <span
                  className="text-[#390083] font-normal cursor-pointer hover:underline"
                  onClick={() => {}}
                >
                  cliquer ici
                </span>
              </div>
              <Button
                type="submit"
                variant="contained"
                className="sm:w-[300px] w-[260px]"
                sx={{
                  height: 48,
                  backgroundColor: "#3F0291",
                  borderRadius: "6px",
                }}
              >
                Se connecter
              </Button>
              {loading && (
                <div className="flex flex-row justify-center itmes-center my-4">
                  <BeatLoader color="#3F0291" loading={loading} size={10} />
                </div>
              )}
              {error !== "" && (
                <div className="text-xs text-red-500 my-1 text-left px-2">
                  {error}
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
      <div className="footer_wrap">
        <span> © EASY RELAY 2016 - 2022 </span> <br />{" "}
        <span>Exigez une livraison de confiance</span>
      </div>
    </div>
  );
}

export default Login;
