

export const DetectionResult = ({ detectionStatus, attributeData }) => {
  console.log(detectionStatus, attributeData);
  
  if (detectionStatus === 'completed' && attributeData){
    return (
      <>
        <div className="w-full px-20">
          {
            detectionStatus === 'completed' && attributeData ?
            <div className="flex flex-wrap gap-5">
              {
                Object.entries(attributeData?.stats).map(entry => {
                  let key: any = entry[0];
                  let value: any = entry[1];
                  console.log(entry);
                  return <div key={key} className="flex flex-1 flex-col py-4 rounded-xl justify-center items-center border border-foreground-300">
                    <p className={`font-black text-3xl ${key === "malicious" ? "text-danger" : key === "suspicious" ? "text-warning" : key === "undetected" ? "text-primary" : key === "harmless" ? "text-success" : key === "timeout" ? "text-default-500" : ""}`}>
                      {value}
                    </p>
                    <p className="capitalize text-foreground-500">
                      {key}
                    </p>
                  </div>
                })
              }
            </div> :
            ""
          }
        </div>
  
        <div className="w-full px-16">
          <ul className="w-full p-2 px-4 flex flex-col justify-center items-center rounded-lg border border-foreground-300">
            {
              detectionStatus === 'completed' && attributeData ?
              Object.entries(attributeData?.results).map((entry, index) => {
                let key: any = entry[0];
                let value: any = entry[1];
                console.log(entry);
                return <li key={key} className={`w-full p-2 flex justify-between items-center ${index+1 === Object.entries(attributeData?.results).length ? "" : "border-b border-b-foreground-300"}`}>
                  <div className="w-[25%]">
                    {key}
                  </div>
                  <div className={`w-[25%] capitalize ${value?.category === "malicious" ? "text-danger" : value?.category === "suspicious" ? "text-warning" : value?.category === "undetected" ? "text-primary" : value?.category === "harmless" ? "text-success" : value?.category === "timeout" ? "text-default-500" : ""}`}>
                    {value.category}
                  </div>
                </li>
              }) :
              ""
            }
          </ul>
        </div>
      </>
    )
  }

  return <>
  </>
}
