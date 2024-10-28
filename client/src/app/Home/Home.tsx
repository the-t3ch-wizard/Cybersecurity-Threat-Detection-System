import { toast } from "sonner"
import { ThemeSwitcher } from "../../components/ThemeSwitcher"

export const Home = () => {
  return (
    <div className="w-full h-screen bg-background flex justify-center items-center">
      <ThemeSwitcher />
    </div>
  )
}
