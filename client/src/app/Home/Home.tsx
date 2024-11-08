import { Button, Card, CardHeader } from "@nextui-org/react"
import { ThemeSwitcher } from "../../components/ThemeSwitcher"
import { CiFileOn } from "react-icons/ci"
import { FaLink } from "react-icons/fa"
import { MdOutlineEmail, MdOutlineSms } from "react-icons/md"
import { BsFillLightningChargeFill } from "react-icons/bs"
import { IoShieldOutline } from "react-icons/io5"
import { GoLink } from "react-icons/go"
import { Link } from "react-router-dom"

export const Home = () => {
  return (
    <div className="w-full bg-background flex flex-col justify-center items-center text-center">

      <div className="min-h-screen w-full flex flex-col justify-center items-center gap-3">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-4xl lg:text-5xl/none">
          Cybersecurity Threat Detection System
        </h1>

        <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
          Protect your digital assets with our advanced threat detection system. Scan files, URLs, emails, SMS, and more.
        </p>

        <div className="flex gap-6 mt-1">
          <Button radius="sm" color="primary">Get Started</Button>
          <Button radius="sm" variant="bordered">Learn More</Button>
        </div>
      </div>

      <div className="min-h-screen w-full bg-foreground-50 flex flex-col justify-start items-center pt-40 pb-20 gap-10">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-4xl lg:text-5xl/none">
          Our Services
        </h1>

        <div className="grid gap-6 lg:grid-cols-3 lg:gap-12 px-10">
          <Card className="bg-background flex flex-col gap-1 p-3 pb-4">
            <CardHeader className="flex flex-col justify-start items-start">
              <CiFileOn className="w-8 h-8 mb-2" />
              <h1 className="text-2xl font-semibold">
                File Analysis
              </h1>
              <p className="text-foreground-500">
                Detect malware and threats in files
              </p>
            </CardHeader>
            <div className="px-2">
              <p className="text-left">Our advanced file analysis system scans for viruses, malware, and other potential threats in various file types.</p>
            </div>
          </Card>
          <Card className="bg-background flex flex-col gap-1 p-3 pb-4">
            <CardHeader className="flex flex-col justify-start items-start">
              <GoLink className="w-8 h-8 mb-2 ml-1" />
              <h1 className="text-2xl font-semibold">URL Scanning</h1>
              <p className="text-foreground-500">Identify malicious websites and links</p>
            </CardHeader>
            <div className="px-2">
              <p className="text-left">Protect yourself from phishing attempts and malicious websites with our real-time URL scanning technology.</p>
            </div>
          </Card>
          <Card className="bg-background flex flex-col gap-1 p-3 pb-4">
            <CardHeader className="flex flex-col justify-start items-start">
              <MdOutlineEmail className="w-8 h-8 mb-2 ml-1" />
              <h1 className="text-2xl font-semibold">Email Protection</h1>
              <p className="text-foreground-500">Guard against email-based threats</p>
            </CardHeader>
            <div className="px-2">
              <p className="text-left">Our email protection service filters out spam, phishing attempts, and malicious attachments to keep your inbox safe.</p>
            </div>
          </Card>
          <Card className="bg-background flex flex-col gap-1 p-3 pb-4">
            <CardHeader className="flex flex-col justify-start items-start">
              <MdOutlineSms className="w-8 h-8 mb-2 ml-1" />
              <h1 className="text-2xl font-semibold">SMS Threat Detection</h1>
              <p className="text-foreground-500">Identify suspicious SMS messages</p>
            </CardHeader>
            <div className="px-2">
              <p className="text-left">Protect yourself from SMS-based scams and phishing attempts with our advanced SMS threat detection system.</p>
            </div>
          </Card>
          <Card className="bg-background flex flex-col gap-1 p-3 pb-4">
            <CardHeader className="flex flex-col justify-start items-start">
              <BsFillLightningChargeFill className="w-8 h-8 mb-2" />
              <h1 className="text-2xl font-semibold">Real-time Protection</h1>
              <p className="text-foreground-500">Continuous monitoring and alerts</p>
            </CardHeader>
            <div className="px-2">
              <p className="text-left">Our system provides real-time monitoring and instant alerts to keep you protected against emerging threats.</p>
            </div>
          </Card>
          <Card className="bg-background flex flex-col gap-1 p-3 pb-4">
            <CardHeader className="flex flex-col justify-start items-start">
              <IoShieldOutline className="w-8 h-8 mb-2" />
              <h1 className="text-2xl font-semibold">Comprehensive Security</h1>
              <p className="text-foreground-500">All-in-one protection for your digital life</p>
            </CardHeader>
            <div className="px-2">
              <p className="text-left">Get complete protection across all your devices and digital communications with our comprehensive security suite.</p>
            </div>
          </Card>
        </div>
      </div>

      <div className="w-full h-16 border-t border-t-foreground-300 flex justify-between px-10 items-center">
        <p>
          © 2024 - Cybersecurity Threat Detection System. All rights reserved.
        </p>
        <Link target="_blank" to={'https://github.com/the-t3ch-wizard'}>
          Github
        </Link>
      </div>

    </div>
  )
}
