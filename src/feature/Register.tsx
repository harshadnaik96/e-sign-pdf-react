import { useForm } from "react-hook-form";
import { RegisterService } from "../services/Register.service";
import { useAuth } from "../hooks";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const { register, handleSubmit, getValues } = useForm();
  const auth = useAuth();
  const navigate = useNavigate();

  const onSubmit = async () => {
    try {
      const { email, password } = getValues();
      const response = await RegisterService.register(email, password);
      if (response ?? null) {
        auth.setAuthCredentials(response?.data.token);
        navigate("/");
      }
    } catch (error) {
      //@ts-ignore
      alert(error?.response?.data.message);
    }
  };

  return (
    <div className='h-full '>
      <form
        className='grid gap-4 m-auto my-20 w-96'
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className='text-2xl font-medium text-center'>Register</h1>
        <div className='grid gap-2'>
          <label className=''>Email</label>
          <input
            className='p-2 border rounded-md border-slate-300'
            {...register("email")}
          />
        </div>
        <div className='grid gap-2'>
          <label>Password</label>
          <input
            className='p-2 border rounded-md border-slate-300'
            {...register("password")}
          />
        </div>

        <button
          className='w-40 p-2 mx-auto text-white bg-blue-500 rounded-md'
          type='submit'
        >
          Register
        </button>
      </form>
    </div>
  );
};
