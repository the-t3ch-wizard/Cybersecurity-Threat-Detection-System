import { Outlet } from "react-router-dom"
import { Toaster } from "sonner"
import { useAppSelector } from "../../lib/store/hooks/hooks"
import { Navbar } from "../../components/Navbar";

export const HomeLayout = () => {

  const theme = useAppSelector(state => state.theme.theme);

  return (
    <div className={`${theme} bg-background text-foreground relative flex flex-col min-h-screen font-geist`}>

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
