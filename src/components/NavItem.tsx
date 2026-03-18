import Link from "next/link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface NavItemProps {
    href: string;
    label: string;
    icon: React.ReactNode;
    activeClass: string;
}

export default function NavItem({ href, label, icon, activeClass }: NavItemProps) {
    return (
        <TooltipProvider delayDuration={100}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Link
                        href={href}
                        className={`flex items-center gap-1 md:text-xs lg:text-sm ${activeClass}`}
                    >
                        {icon}
                        <span className="hidden lg:block">{label}</span>
                    </Link>
                </TooltipTrigger>

                <TooltipContent side="top" className="lg:hidden">
                    {label}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
