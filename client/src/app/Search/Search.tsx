import { Button, Input } from "@nextui-org/react"
import { useForm } from "react-hook-form";

export const Search = () => {

  const {
    register: login,
    handleSubmit: handleLogin,
    getValues: getLoginValues,
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
        Text-Based Phishing Detection
      </h1>
      <h3 className="text-lg">
        Analyze communications for manipulative language or unusual requests for access.
      </h3>

      <form className="flex flex-col justify-center items-center gap-2" onSubmit={handleLogin(loginHandler)}>
        <Input variant={"faded"} placeholder="https://example.com" className="w-96" {...login("content")} />
        <Button type="submit" color="primary" className="w-full">
          Check URL
        </Button>
      </form>

    </div>
  )
}
