import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import Loader1 from "../components/Loader1";
import { toast } from "react-toastify";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useForm } from "react-hook-form";

const PasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { error: "Atleast 8 characters" })
      .refine((value) => /[a-z]/.test(value), {
        error: "Missing a lower case letter",
      })
      .refine((value) => /[A-Z]/.test(value), {
        error: "Missing an upper case letter",
      })
      .refine((value) => /[0-9]/.test(value), { error: "Missing a number" })
      .refine((value) => /[*\.!@#$%^&*=\-_+]/.test(value), {
        error: "Missing *.!@#$%^&*=-_+",
      }),
    "confirm-password": z
      .string()
      .min(8, { error: "Atleast 8 characters" })
      .refine((value) => /[a-z]/.test(value), {
        error: "Missing a lower case letter",
      })
      .refine((value) => /[A-Z]/.test(value), {
        error: "Missing an upper case letter",
      })
      .refine((value) => /[0-9]/.test(value), { error: "Missing a number" })
      .refine((value) => /[*\.!@#$%^&*=\-_+]/.test(value), {
        error: "Missing *.!@#$%^&*=-_+",
      }),
  })
  .refine((data) => data["password"] === data["confirm-password"], {
    error: "Both passwords must match",
    path: ["confirm-password"],
  });

const ForgotPassword = () => {
  const [params] = useSearchParams();
  const [phase, setPhase] = useState(1);
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(PasswordSchema),
  });

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_SERVER_URL}/auth/verify-token?token=${params.get(
          "token"
        )}&email=${params.get('email')}`
      )
      .then((res) => {
        if (res.data.success) {
          setPhase(2);
        } else if ((res.data.message = "INVALID_TOKEN")) {
          toast.error("Invalid token !");
          navigate("/login");
        }
      })
      .catch((e) => {
        toast.error("Some error occurred!");
      });
  }, []);

  const onSubmit = (data) => {
    if (!loading) {
      setLoading(true);
      axios
        .post(
          import.meta.env.VITE_SERVER_URL + "/auth/update-password",
          {
            password: data.password,
            token : params.get('token'),
            email: params.get('email')
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.data.success) {
            toast.success("Password updated! You may now login.");
            navigate("/login");
          
          } else if (res.data.message === "OLD_PASSWORD") {
            toast.info("New password can't be same as old password !");
            reset();
          }

          setLoading(false);
        
        }).catch((e) => {
          console.log(e);
          toast.error("Some error occurred!");
          setLoading(false);
        });
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center relative top-[-3rem]">
      {phase === 1 && (
        <div className="w-full relative top-[-2rem] text-center flex flex-col items-center justify-center gap-2">
          Please wait, verifying token
          <Loader1 className="w-8 h-8" />
        </div>
      )}
      {phase === 2 && (
        <div className="w-full h-fit flex justify-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-80 px-3 py-5 bg-black text-white rounded-sm"
          >
            <h1 className="w-full font-semibold text-center text-xl">
              Update Password
            </h1>
            {/* password and confirm password */}
            <div className="w-full border-box px-1 flex flex-col gap-4 justify-center mt-3 ">
              <label
                htmlFor="password"
                className="w-full font-semibold text-xs md:text-sm flex flex-col gap-1 text-white relative"
              >
                Password :
                <input
                  {...register("password")}
                  id="password"
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Password (min 8 chars)"
                  className="relative bg-[#6a6868b3] w-full p-1 px-2 text-xs md:text-sm rounded-xs placeholder:text-[#ffffffb1]  text-white font-normal outline-0 outline-xs focus:outline-white focus:outline-2"
                />
                {passwordVisible ? (
                  <VisibilityIcon
                    onClick={() => setPasswordVisible(false)}
                    className="scale-70 absolute top-[1.2rem] md:top-[1.6rem] right-1"
                  />
                ) : (
                  <VisibilityOffIcon
                    onClick={() => setPasswordVisible(true)}
                    className="scale-70 absolute top-[1.2rem] md:top-[1.6rem] right-1"
                  />
                )}
                {errors["password"] && (
                  <p className="w-full text-xs h-5 font-normal text-red-400 flex items-center">
                    <ErrorOutlineIcon className="scale-70" />
                    {errors["password"].message}
                  </p>
                )}
              </label>
              <label
                htmlFor="confirm-password"
                className="w-full font-semibold text-xs md:text-sm flex flex-col gap-1 text-white relative"
              >
                Confirm Password :
                <input
                  {...register("confirm-password")}
                  id="confirm-password"
                  type={confirmPasswordVisible ? "text" : "password"}
                  placeholder="Confirm password"
                  className="bg-[#6a6868b3] w-full p-1 px-2 text-xs md:text-sm rounded-xs placeholder:text-[#ffffffb1]  text-white font-normal outline-0 outline-xs focus:outline-white focus:outline-2"
                />
                {confirmPasswordVisible ? (
                  <VisibilityIcon
                    onClick={() => setConfirmPasswordVisible(false)}
                    className="scale-70 absolute top-[1.2rem] md:top-[1.6rem] right-1"
                  />
                ) : (
                  <VisibilityOffIcon
                    onClick={() => setConfirmPasswordVisible(true)}
                    className="scale-70 absolute top-[1.2rem] md:top-[1.6rem] right-1"
                  />
                )}
                {errors["confirm-password"] && (
                  <p className="w-full text-xs h-5 font-normal text-red-400 flex items-center">
                    <ErrorOutlineIcon className="scale-70" />
                    {errors["confirm-password"].message}
                  </p>
                )}
              </label>
            </div>
            <button className="w-full px-2 text-black text-xs md:text-sm bg-white rounded-sm cursor-pointer select-none mt-3 flex items-center">
              {loading ? (
                <div className="relative border-box w-full h-9 flex justify-center items-center">
                  <Loader1 className="w-full h-8 top-0 text-center" />
                </div>
              ) : (
                <div className="w-full h-9 flex items-center justify-center">
                  Update Password
                </div>
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
