import { manrope } from "@/app/layout";

export default function RegisterLink() {
    return (
        <div className={`mt-4 text-sm text-[#777676] ${manrope.className}`}>
            Already have an account?{' '}
            <a href="/login" className={`text-[#A6B2A3] transition-all duration-300 hover:cursor-pointer hover:underline ${manrope.className}`}>
                Sign in here
            </a>
        </div>
    );
}