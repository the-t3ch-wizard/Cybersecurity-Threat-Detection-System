import { Button, Input } from "@nextui-org/react"
import { Controller, useForm } from "react-hook-form";
import Dropzone from "react-dropzone";
import { AiFillFile } from "react-icons/ai";
import { detectFile, fileAnalysis } from "../../services/file";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { DetectionResult } from "../../components/DetectionResult";

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
    <div className="w-full h-full flex flex-col gap-5 pt-36 pb-8 items-center">
      
      <h1 className="text-3xl font-medium">
        Search a File
      </h1>
      <h3 className="text-lg">
        Upload a file to check for potential malware (Max size: 35MB)
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
              maxFiles={1}
              maxSize={34*1024*1024}
              onDropRejected={(fileRejections) => {
                toast.error(fileRejections[0]?.errors[0]?.message);
              }}
              disabled={detectionStatus === 'queued'}
            >
              {({
                getRootProps,
                getInputProps,
                open,
                isDragActive,
                acceptedFiles,
              }) => (
                <div className="border-2 border-dashed border-foreground-100 rounded-xl min-w-96 h-40 p-4 flex flex-col gap-4 justify-center items-center">
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

                    <p className="flex gap-3 items-center capitalize">
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

        <Button type="submit" color="primary" className="w-full" isLoading={detectionStatus === 'queued'}>
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
