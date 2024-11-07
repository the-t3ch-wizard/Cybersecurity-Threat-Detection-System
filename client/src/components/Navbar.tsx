import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { link as linkStyles } from "@nextui-org/theme";
import clsx from "clsx";

import { siteConfig } from "../lib/constants";
import { BiSearch } from "react-icons/bi";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { ImGithub } from "react-icons/im";
import { useAppSelector } from "../lib/store/hooks/hooks";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaServer } from "react-icons/fa";
import { Tooltip } from "@nextui-org/react";

export const Navbar = () => {

  const serverStatus = useAppSelector(state => state.server.status)

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <BiSearch className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  const location = useLocation();

  const [activePage, setActivePage] = useState("");

  useEffect(() => {
    console.log(location.pathname);
    const parsedUrl = location.pathname.split('/');
    console.log(parsedUrl);
    if (parsedUrl.length > 1){
      console.log(parsedUrl[1]);
      setActivePage("/"+parsedUrl[1])
    }
  }, [location.pathname])

  return (
    <NextUINavbar maxWidth="full" position="sticky" className="h-[10%] border-b border-foreground-100">
      {/* <Loader /> */}
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <ul className="hidden md:flex h-[70%] items-center justify-start ml-2 bg-foreground-100 p-1 rounded-lg">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href} className={`p-1 px-3 rounded-md h-full flex justify-center items-center transition-all ${item.href === activePage ? "bg-background" : ""}`}>
              <NavLink 
                to={item.href}
                className="h-full"
              >
                {item.label}
              </NavLink>
            </NavbarItem>
          ))}
        </ul>
        {
          serverStatus ?
          null :
          <Tooltip
              content={
                <div className="">
                  <div className="text-small font-medium">Backend server status</div>
                </div>
              }
              color="foreground"
              placement="bottom"
            >
            <div className="flex justify-center items-center gap-2 text-danger">
              <FaServer size={18} />
              Server offline
            </div>
          </Tooltip>
        }
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        {/* <Link isExternal aria-label="Github" href={siteConfig.links.github} className="bg-primary text-foreground">
          <ImGithub />
        </Link> */}
        <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
        <NavbarItem className="hidden sm:flex gap-2">
          {/* <Register type="register / login" /> */}
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link
          className={clsx(
            linkStyles({ color: "foreground" }),
            "data-[active=true]:text-primary data-[active=true]:font-medium",
          )}
          color="foreground"
          href={siteConfig.links.github}
        >
          ayush
        </Link>
        <Link isExternal aria-label="Github" href={siteConfig.links.github} className="bg-primary text-foreground">
          <ImGithub />
        </Link>
        <ThemeSwitcher />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        {searchInput}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
