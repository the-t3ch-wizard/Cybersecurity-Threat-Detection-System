import { Button, Input } from "@nextui-org/react"
import { Controller, useForm } from "react-hook-form";
import Dropzone from "react-dropzone";
import { AiFillFile } from "react-icons/ai";
import { detectFile, fileAnalysis } from "../../services/file";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { DetectionResult } from "../../components/DetectionResult";
import { useAppSelector } from "../../lib/store/hooks/hooks";

export const File = () => {

  const serverStatus = useAppSelector(state => state.server.status)

  const {
    register: login,
    handleSubmit: handleLogin,
    getValues: getLoginValues,
    setValue: setValues,
    reset: resetLogin,
    control: loginControl,
    formState: { errors: errorLogin },
  } = useForm();

  const [detectionStatus, setDetectionStatus] = useState('');
  const [analysisUrl, setAnalysisUrl] = useState('');
  const [attributeData, setAttributeData] = useState<any>({});

  const loginHandler = async (e: any) => {
    try {
      setDetectionStatus('queued')
      const fileDetectionResponse = await detectFile(e.file[0]);
      setAnalysisUrl(fileDetectionResponse.data)
      toast.info(fileDetectionResponse.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const getUrlAnalysis = async () => {
    while (true){
      const detectionResult = await fileAnalysis(analysisUrl)
      if (detectionResult?.data?.status === "completed"){
        setDetectionStatus('completed')
        setAttributeData(detectionResult.data)
        break;
      }
    }
  }

  useEffect(() => {
    if (detectionStatus === 'queued' && analysisUrl !== ''){
      getUrlAnalysis();
    }
  }, [detectionStatus, analysisUrl])

  return (
    <div className="w-full h-full flex flex-col gap-5 pt-24 pb-8 items-center">
      
      <h1 className="text-4xl font-bold">
        Search a File
      </h1>
      <h3 className="text-foreground-500">
        Upload a file to check for potential malware (Max size: 35MB)
      </h3>

      <form className="min-w-96 w-[50%] h-96 flex flex-col justify-center items-center gap-2" onSubmit={handleLogin(loginHandler)}>
        <Controller
          control={loginControl}
          name="file"
          rules={{
            required: { value: true, message: 'This field is required' },
          }}
          render={({ field: { onChange, onBlur } }) => (
            <Dropzone
              noClick
              onDrop={(acceptedFiles) => {
                setValues('file', acceptedFiles)
              }}
              maxFiles={1}
              maxSize={34*1024*1024}
              onDropRejected={(fileRejections) => {
                toast.error(fileRejections[0]?.errors[0]?.message);
              }}
              disabled={!serverStatus ||detectionStatus === 'queued'}
            >
              {({
                getRootProps,
                getInputProps,
                open,
                acceptedFiles,
              }) => (
                <div className="border-2 border-dashed border-foreground-100 rounded-xl w-[85%] h-[80%] p-4 flex flex-col gap-4 justify-center items-center">
                  <div
                    {...getRootProps()}
                    className="flex"
                  >
                    <input
                      {...getInputProps({
                        id: 'spreadsheet',
                        onChange,
                        onBlur,
                      })}
                    />

                    <p className="flex flex-col gap-3 items-center capitalize">
                      <Button type="button" isDisabled={detectionStatus === 'queued'} onClick={open}>
                        Choose a file
                      </Button>
                      <span>
                        or drag and drop
                      </span>
                    </p>

                    {/* <div>
                      {fieldState.error && (
                        <span role="alert">{fieldState.error.message}</span>
                      )}
                    </div> */}
                  </div>

                  {
                    acceptedFiles.length > 0
                    ?
                    <div className="w-full px-4 p-2 border border-foreground-100 rounded-lg">
                      <div className="flex justify-start gap-2 items-center">
                        <AiFillFile />
                        {acceptedFiles[0].name}
                      </div>
                    </div>
                    : null
                  }
                </div>
              )}
            </Dropzone>
          )}
        />

        <Button type="submit" color="primary" className="w-[15%]" isLoading={detectionStatus === 'queued'}>
          {
            detectionStatus === 'queued' ?
            "Checking URL" :
            "Check File"
          }
        </Button>
      </form>

      <DetectionResult detectionStatus={detectionStatus} attributeData={attributeData} />

    </div>
  )
}
