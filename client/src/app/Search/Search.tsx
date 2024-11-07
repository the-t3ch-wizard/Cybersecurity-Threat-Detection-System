import { Button, Input, Textarea } from "@nextui-org/react"
import { useForm } from "react-hook-form";
import ReactMarkdown from "react-markdown";
import { analyzeContent } from "../../services/search";
import { useState } from "react";
import { useAppSelector } from "../../lib/store/hooks/hooks";

export const Search = () => {

  const serverStatus = useAppSelector(state => state.server.status)

  const {
    register: login,
    handleSubmit: handleLogin,
    getValues: getLoginValues,
    reset: resetLogin,
    control: loginControl,
    formState: { errors: errorLogin },
  } = useForm();

  const [analysisResponse, setAnalysisResponse] = useState("");

  const loginHandler = async (e: any) => {
    console.log('handle loginHandler', e)

    const contentAnalysisResponse = await analyzeContent(e.content)

    console.log(contentAnalysisResponse);
    setAnalysisResponse(contentAnalysisResponse.data);
    
  }

  return (
    <div className="w-full h-full flex flex-col gap-5 pt-36 pb-8 items-center">
      
      <h1 className="text-3xl font-medium">
        Text-Based Phishing Detection
      </h1>
      <h3 className="text-lg">
        Analyze communications for manipulative language or unusual requests for access.
      </h3>

      <form className="flex flex-col justify-center items-center gap-2" onSubmit={handleLogin(loginHandler)}>

        <Textarea
          key="faded"
          variant="faded"
          labelPlacement="outside"
          placeholder="Enter content that is to be analyzed"
          className="w-96"
          {...login("content")}
        />
        <Button type="submit" color="primary" className="w-full" isDisabled={!serverStatus}>
          Check content
        </Button>
      </form>

      {
        analysisResponse !== "" ?
        <ReactMarkdown className="w-full px-10 p-5 text-wrap">
          {analysisResponse}
        </ReactMarkdown> :
        null
      }
    </div>
  )
}
