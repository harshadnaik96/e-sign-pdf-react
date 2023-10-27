import { useForm } from "react-hook-form";
import { AuthService } from "../services/Auth.service";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks";

export const Login = () => {
  const { register, handleSubmit, getValues } = useForm();
  const navigate = useNavigate();
  const auth = useAuth();

  const onSubmit = async () => {
    try {
      const { email, password } = getValues();
      const response = await AuthService.login(email, password);
      if (response ?? null) {
        auth.setAuthCredentials(response?.data.token);
        navigate("/");
      }
    } catch (error) {
      //@ts-ignore
      alert(error?.response.data.message);
    }
  };

  return (
    <div className='h-full '>
      <form
        className='grid gap-4 m-auto my-20 w-96'
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className='text-2xl font-medium text-center'>Login</h1>
        <div className='grid gap-2'>
          <label>Email</label>
          <input
            className='p-2 border rounded-md border-slate-300'
            {...register("email")}
          />
        </div>
        <div className='grid gap-2'>
          <label>Password</label>
          <input
            type='password'
            className='p-2 border rounded-md border-slate-300'
            {...register("password")}
          />
        </div>
        <span
          onClick={() => navigate("/register")}
          className='text-sm text-center cursor-pointer text-slate-800'
        >
          {" "}
          Not a user? Register
        </span>

        <button
          className='w-40 p-2 mx-auto text-white bg-blue-500 rounded-md'
          type='submit'
        >
          Submit
        </button>
      </form>
    </div>
  );
};
