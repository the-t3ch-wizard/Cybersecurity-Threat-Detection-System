import { Button, Input } from "@nextui-org/react"
import { useForm } from "react-hook-form";
import { detectUrl, urlAnalysis } from "../../services/url";
import { toast } from "sonner";
import { useEffect, useState } from "react";

export const Url = () => {

  const {
    register: login,
    handleSubmit: handleLogin,
    getValues: getLoginValues,
    reset: resetLogin,
    control: loginControl,
    formState: { errors: errorLogin },
  } = useForm();

  const [detectionStatus, setDetectionStatus] = useState('');
  const [analysisUrl, setAnalysisUrl] = useState('');
  const [attributeData, setAttributeData] = useState<any>({});

  const loginHandler = async (e: any) => {
    const urlDetectionResponse = await detectUrl(e.url)
    setDetectionStatus('queued')
    setAnalysisUrl(urlDetectionResponse.data)
    toast.info(urlDetectionResponse.message)
  }

  const getUrlAnalysis = async () => {
    while (true){
      const detectionResult = await urlAnalysis(analysisUrl)
      if (detectionResult?.data?.status === "completed"){
        setDetectionStatus('completed')
        setAttributeData(detectionResult.data)
        break;
      }
    }
  }

  useEffect(() => {
    if (detectionStatus === 'queued'){
      getUrlAnalysis();
    }
  }, [detectionStatus])

  return (
    <div className="w-full h-full bg-background flex flex-col gap-5 items-center pt-36 pb-8">
      
      <h1 className="text-3xl font-medium">
        Search or scan a URL
      </h1>
      <h3 className="text-lg">
        Enter a URL to check if it's potentially malicious
      </h3>

      <form className="flex flex-col justify-center items-center gap-2" onSubmit={handleLogin(loginHandler)}>
        <Input variant={"faded"} placeholder="https://example.com" className="w-96" {...login("url")} isDisabled={detectionStatus === 'queued'} />
        <Button type="submit" color="primary" className="w-full" isLoading={detectionStatus === 'queued'}>
          {
            detectionStatus === 'queued' ?
            "Checking URL" :
            "Check URL"
          }
        </Button>
      </form>

      <div className="w-full px-20">
        {
          detectionStatus === 'completed' ?
          <div className="flex gap-5 bg-foreground-50 border">
            {
              Object.entries(attributeData?.stats).map(entry => {
                let key: any = entry[0];
                let value: any = entry[1];
                return <div className="flex flex-col p-2 justify-start items-start">
                  <p className="capitalize">
                    {key}
                  </p>
                  <p>
                    {value}
                  </p>
                </div>
              })
            }
          </div> :
          ""
        }
      </div>

      <ul className="w-full px-20 flex flex-col justify-center items-center">
        {
          detectionStatus === 'completed' ?
          Object.entries(attributeData?.results).map(entry => {
            let key: any = entry[0];
            let value: any = entry[1];
            return <li key={key} className="w-full border p-2 flex justify-between items-center bg-foreground-50">
              <div className="w-[25%]">
                {key}
              </div>
              {/* <div className="w-[25%]">
                {key}
              </div>
              <div className="w-[25%]">
                {key}
              </div> */}
              <div className="w-[25%] capitalize">
                {value.category}
              </div>
            </li>
          }) :
          ""
        }
      </ul>

    </div>
  )
}
