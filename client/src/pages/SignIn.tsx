import { useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { signInSchema } from "../validators/validationSchema";

import InputFIeld from "../components/InputFIeld";
import Button from "../components/Button";

import { AuthContext } from "../contexts/AuthContext";

import { SignInInputsData } from "../types/types";

function SignIn() {
  const { handleSignIn } = useContext(AuthContext);

  const defaultValues = {
    userName: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInInputsData>({
    defaultValues,
    resolver: yupResolver(signInSchema),
  });

  return (
    <div className="w-full h-full  flex flex-col justify-center items-center gap-6">
      <h2 className="text-3xl">Войти в аккаунт</h2>
      <form
        onSubmit={handleSubmit(handleSignIn)}
        className="w-1/4 flex flex-col items-center gap-2 "
      >
        <InputFIeld
          name="userName"
          placeholder="Имя пользователя"
          register={register}
          error={Boolean(errors.userName)}
          errorMessage={errors.userName?.message}
        />
        <InputFIeld
          name="password"
          placeholder="Пароль"
          register={register}
          error={Boolean(errors.password)}
          errorMessage={errors.password?.message}
        />

        <Button disabled={isSubmitting} type="submit">
          Войти
        </Button>
      </form>
    </div>
  );
}

export default SignIn;
