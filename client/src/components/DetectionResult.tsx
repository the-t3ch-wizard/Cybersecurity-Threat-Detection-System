

export const DetectionResult = ({ detectionStatus, attributeData }) => {
  return (
    <>
      <div className="w-full px-20">
        {
          detectionStatus === 'completed' ?
          <div className="flex gap-5 bg-foreground-50 border">
            {
              Object.entries(attributeData?.stats).map(entry => {
                let key: any = entry[0];
                let value: any = entry[1];
                return <div key={key} className="flex flex-col p-2 justify-start items-start">
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
    </>
  )
}
