import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import Dropzone from 'react-dropzone';

type FormInputs = {
  file: FileList;
};

export const InputFile = () => {
  const form = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        

        <button>Submit</button>
      </form>
    </div>
  );
}
