import { useRef } from "react";
import { useForm } from "react-hook-form";
import ReactSignatureCanvas from "react-signature-canvas";
import SignatureCanvas from "react-signature-canvas";
import { useAuth } from "../hooks";
import { useNavigate } from "react-router-dom";
import { DocumentService } from "../services/DocumentUpload.service";
export const FormUpload = (): JSX.Element => {
  let canvasRef = useRef<ReactSignatureCanvas | null>(null);
  const { register, handleSubmit, getValues, reset } = useForm();

  const auth = useAuth();
  const navigate = useNavigate();
  const onSubmit = async () => {
    try {
      const { name, email, pdf } = getValues();
      const data = new FormData();
      data.append("name", name);
      data.append("email", email);
      data.append("pdf", pdf![0]);
      data.append(
        "signature",
        canvasRef?.current!.getTrimmedCanvas().toDataURL("image/jpeg")
      );
      const response = await DocumentService.docs(data);

      if (response ?? null) {
        reset();
        //@ts-ignore
        window.open(
          URL.createObjectURL(
            new Blob([response?.data], { type: "application/pdf" })
          )
        );
      }
    } catch (error) {
      debugger;
      //@ts-ignore
      // alert(error?.response?.data.message);
    }
  };
  return (
    <div className='h-full '>
      <div className='w-full px-6 py-4 text-right bg-blue-500 h-14'>
        <button
          onClick={() => {
            auth.logout();
            navigate("/login");
          }}
          className='inline-block text-base font-medium text-white '
          type='button'
        >
          Logout
        </button>
      </div>
      <form
        className='grid gap-4 m-auto my-20 w-96'
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className='text-2xl font-medium text-center'>Document Sign</h1>
        <div className='grid gap-2'>
          <label>Name</label>
          <input
            required
            className='p-2 border rounded-md border-slate-300'
            {...register("name")}
          />
        </div>
        <div className='grid gap-2'>
          <label>Email</label>
          <input
            type='email'
            required
            className='p-2 border rounded-md border-slate-300'
            {...register("email")}
          />
        </div>

        <div className='grid gap-2'>
          <label htmlFor='signature'>Sign your Document</label>
          <SignatureCanvas
            penColor='green'
            canvasProps={{
              width: 500,
              height: 200,
              className: "signature border rounded-md ",
            }}
            ref={(ref) => {
              canvasRef.current = ref;
            }}
          />
        </div>

        <div className='grid gap-2'>
          <label>File Upload</label>
          <input
            required
            className='p-2 border rounded-md border-slate-300'
            type='file'
            {...register("pdf")}
          />
        </div>

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
