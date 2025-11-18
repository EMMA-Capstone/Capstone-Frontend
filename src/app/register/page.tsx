import CompostBinIllustration from "./components/Hero";
import LoginForm from "./components/LoginForm";
import { manrope } from "../layout";
import RegisterLink from "./components/RegisterLink";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login - Compost Connect",
    description: "Log in to your Compost Connect account to manage your composting activities, track pickups, and access valuable resources.",
}

export default function LoginPage(){
    return(
        <div className="w-full flex flex-col items-center"  >
            <CompostBinIllustration src="/compost-bin.jpeg" alt="Compost Bin Illustration" />
            <div>
                <h1 className={`${manrope.className} text-3xl font-semibold`}>Sign Up</h1>
            </div>
                <LoginForm/>
                <RegisterLink/>
        </div>
    )
}