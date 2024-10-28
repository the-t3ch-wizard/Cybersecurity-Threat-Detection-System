import { Outlet } from "react-router-dom"
import { Toaster } from "sonner"
import { useAppSelector } from "../../lib/store/hooks/hooks"
import { Navbar } from "../../components/navbar";

export const HomeLayout = () => {

  const theme = useAppSelector(state => state.theme.theme);

  // return (
  //   <div className={`${theme} w-full h-screen bg-background`}>
  //     <Toaster
  //       position="bottom-right"
  //       theme={theme==="dark" ? "dark" : "light"}
  //       toastOptions={{
  //         className: "",
  //       }}
  //       richColors
  //       closeButton
  //     />
  //     <Outlet />
  //   </div>
  // )

  // return (
  //   <div className={`${theme} w-full flex justify-center items-center h-full`}>

  //     <Toaster
  //       position="bottom-right"
  //       theme={theme==="dark" ? "dark" : "light"}
  //       toastOptions={{
  //         className: "",
  //       }}
  //       richColors
  //       closeButton
  //     />

  //     <div className="h-full w-[20%] p-2 md:bg-foreground-50 md:rounded-r-lg md:flex md:flex-col md:gap-1 md:justify-start md:items-center">
  //       {/* {
  //         conversations.map((chat, idx) => {
  //           return <Button key={idx} color="default" className={`w-full h-10 flex justify-center items-center rounded-md bg-foreground-50 hover:bg-foreground-200 ${activeChatId === chat._id ? "bg-foreground-200" : ""}`}>
  //             <Link href={`/conversations/${chat._id}`} color="foreground" size="sm" className="w-full h-full flex justify-center items-center text-center">
  //               {chat._id}
  //             </Link>
  //           </Button>
  //         })
  //       } */}
  //     </div>

  //     <div className="h-full w-[80%] flex flex-col pb-4">
  //       <div className="h-full">
  //         <Outlet />
  //       </div>
  //     </div>

  //   </div>
  // )

  return (
    <div className={`${theme} bg-background relative flex flex-col h-screen`}>

      <Toaster
        position="bottom-right"
        theme={theme==="dark" ? "dark" : "light"}
        toastOptions={{
          className: "",
        }}
        richColors
        closeButton
      />

      <Navbar />

      <main className="container h-[90%] flex justify-center items-center flex-grow">
        
        <Outlet />
        
      </main>
      {/* Footer */}
    </div>
  )
}
