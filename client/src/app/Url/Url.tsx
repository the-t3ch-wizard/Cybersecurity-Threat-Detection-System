import { Button, Input } from "@nextui-org/react"
import { useForm } from "react-hook-form";
import { detectUrl, urlAnalysis } from "../../services/url";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { DetectionResult } from "../../components/DetectionResult";
import { useAppSelector } from "../../lib/store/hooks/hooks";

export const Url = () => {

  const serverStatus = useAppSelector(state => state.server.status)

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
    try {
      const urlDetectionResponse = await detectUrl(e.url)
      setDetectionStatus('queued')
      setAnalysisUrl(urlDetectionResponse.data)
      toast.info(urlDetectionResponse.message)
    } catch (error) {
      toast.error(error.message)
    }
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
      
      <h1 className="text-4xl font-bold">
        Search or scan a URL
      </h1>
      <h3 className="text-foreground-500">
        Enter a URL to check if it's potentially malicious
      </h3>

      <form className="min-w-96 w-[50%] flex justify-center items-center gap-2" onSubmit={handleLogin(loginHandler)}>
        <Input variant={"faded"} placeholder="https://example.com" className="w-[85%]" {...login("url")} isDisabled={detectionStatus === 'queued'} />
        <Button type="submit" color="primary" className="w-[15%]" isLoading={detectionStatus === 'queued'} isDisabled={!serverStatus}>
          {
            detectionStatus === 'queued' ?
            "Checking URL" :
            "Check URL"
          }
        </Button>
      </form>

      <DetectionResult detectionStatus={detectionStatus} attributeData={attributeData} />

    </div>
  )
}
