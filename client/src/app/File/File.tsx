import { Button } from "@nextui-org/react"
import { Controller, useForm } from "react-hook-form";
import Dropzone from "react-dropzone";

export const File = () => {

  const {
    register: login,
    handleSubmit: handleLogin,
    getValues: getLoginValues,
    setValue: setValues,
    reset: resetLogin,
    control: loginControl,
    formState: { errors: errorLogin },
  } = useForm();

  const loginHandler = (e: any) => {
    console.log('handle loginHandler', e)
  }

  return (
    <div className="w-full h-full flex flex-col gap-5 pt-40 items-center">
      
      <h1 className="text-3xl font-medium">
        Search a File
      </h1>
      <h3 className="text-lg">
        Upload a file to check for potential malware (Max size: 10MB)
      </h3>

      <form className="flex flex-col justify-center items-center gap-2" onSubmit={handleLogin(loginHandler)}>
        <Controller
          control={loginControl}
          name="file"
          rules={{
            required: { value: true, message: 'This field is required' },
          }}
          render={({ field: { onChange, onBlur }, fieldState }) => (
            <Dropzone
              noClick
              onDrop={(acceptedFiles) => {
                setValues('file', acceptedFiles)
              }}
            >
              {({
                getRootProps,
                getInputProps,
                open,
                isDragActive,
                acceptedFiles,
              }) => (
                <div>
                  <div
                    {...getRootProps()}
                  >
                    <input
                      {...getInputProps({
                        id: 'spreadsheet',
                        onChange,
                        onBlur,
                      })}
                    />

                    <p>
                      <button type="button" onClick={open}>
                        Choose a file
                      </button>{' '}
                      or drag and drop
                    </p>

                    {acceptedFiles.length
                      ? acceptedFiles[0].name
                      : 'No file selected.'}

                    <div>
                      {fieldState.error && (
                        <span role="alert">{fieldState.error.message}</span>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </Dropzone>
          )}
        />

        <Button type="submit" color="primary" className="w-full">
          Check URL
        </Button>
      </form>

    </div>
  )
}
