import { Switch } from "@nextui-org/react"
import { HiMoon, HiSun } from "react-icons/hi"
import { useAppDispatch, useAppSelector } from "../lib/store/hooks/hooks"
import { setDarkTheme, setLightTheme } from "../lib/store/features/theme/themeSlice";

export const ThemeSwitcher = () => {

  const dispatch = useAppDispatch();

  const theme = useAppSelector(state => state.theme.theme);

  const switchThemeHandler = () => {
    if (theme === "light") dispatch(setDarkTheme());
    else dispatch(setLightTheme());
  }

  return (
    <Switch
      size="lg"
      color="success"
      startContent={<HiSun />}
      endContent={<HiMoon />}
      onClick={switchThemeHandler}
      isSelected={theme==="light"}
    >
    </Switch>
  )
}
