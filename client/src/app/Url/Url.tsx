import { Button, Input } from "@nextui-org/react"
import { useForm } from "react-hook-form";
import { detectUrl, urlAnalysis } from "../../services/url";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { DetectionResult } from "../../components/DetectionResult";
import { useAppDispatch, useAppSelector } from "../../lib/store/hooks/hooks";
import { clearUrl, clearUrlAnalysisUrl, clearUrlAttributes, clearUrlStatus, setUrl, setUrlAnalysisUrl, setUrlAttributes, setUrlStatus } from "../../lib/store/features/url/urlSlice";

export const Url = () => {

  const dispatch = useAppDispatch()

  const serverStatus = useAppSelector(state => state.server.status)

  const {
    register: login,
    handleSubmit: handleLogin,
    getValues: getLoginValues,
    reset: resetLogin,
    control: loginControl,
    formState: { errors: errorLogin },
  } = useForm();

  const url = useAppSelector(state => state.url.url);
  const detectionStatus = useAppSelector(state => state.url.urlStatus);
  const analysisUrl = useAppSelector(state => state.url.urlAnalysisUrl);
  const attributeData = useAppSelector(state => state.url.urlAttributes);

  const loginHandler = async (e: any) => {
    dispatch(clearUrl())
    dispatch(clearUrlStatus())
    dispatch(clearUrlAnalysisUrl())
    dispatch(clearUrlAttributes())
    try {
      dispatch(setUrl(e.url))
      dispatch(setUrlStatus('queued'))
      const urlDetectionResponse = await detectUrl(e.url)
      dispatch(setUrlAnalysisUrl(urlDetectionResponse.data))
      toast.info(urlDetectionResponse.message)
    } catch (error) {
      dispatch(setUrlStatus(''))
      toast.error(error.message)
    }
  }

  const getUrlAnalysis = async () => {
    while (true){
      const detectionResult = await urlAnalysis(analysisUrl)
      if (detectionResult?.data?.status === "completed"){
        dispatch(setUrlStatus('completed'))
        dispatch(setUrlAttributes(detectionResult.data))
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
        <Input variant={"faded"} placeholder="https://example.com" className="w-[80%]" defaultValue={url} {...login("url")} isDisabled={detectionStatus === 'queued'} />
        <Button type="submit" color="primary" className="w-[20%]" isLoading={detectionStatus === 'queued'} isDisabled={!serverStatus}>
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
