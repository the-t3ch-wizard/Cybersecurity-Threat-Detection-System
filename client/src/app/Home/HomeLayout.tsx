import { Outlet } from "react-router-dom"
import { Toaster } from "sonner"
import { useAppDispatch, useAppSelector } from "../../lib/store/hooks/hooks"
import { Navbar } from "../../components/Navbar";
import { useEffect } from "react";
import { setServerStatusService } from "../../lib/store/features/server/serverSlice";

export const HomeLayout = () => {

  const dispatch = useAppDispatch();

  const theme = useAppSelector(state => state.theme.theme);

  useEffect(() => {
    dispatch(setServerStatusService())
  }, [])

  return (
    <div className={`${theme} bg-background text-foreground relative flex flex-col min-h-screen`}>

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

      <main className="container h-[90%] flex flex-grow">
        
        <Outlet />
        
      </main>
      {/* Footer */}
    </div>
  )
}
