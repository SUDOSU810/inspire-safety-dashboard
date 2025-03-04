
import * as React from "react"
import { cn } from "@/lib/utils"

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "premium" | "success" | "info" | "warning";
  highlight?: boolean;
  bordered?: boolean;
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = "default", highlight = false, bordered = true, children, ...props }, ref) => {
    const variants = {
      default: "bg-white/90 backdrop-blur-md border-secondary/20",
      premium: "bg-gradient-to-br from-white to-pale-green/20 backdrop-blur-md border-success-green/20",
      success: "bg-gradient-to-br from-white to-mint-green/20 backdrop-blur-md border-success-green/30",
      info: "bg-gradient-to-br from-white to-blue-50 backdrop-blur-md border-chart-blue/20",
      warning: "bg-gradient-to-br from-white to-yellow-50 backdrop-blur-md border-chart-orange/20",
    }
    
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl shadow-md transition-all duration-300",
          bordered && "border",
          variants[variant],
          highlight && "hover:shadow-lg hover:translate-y-[-2px]",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
GlassCard.displayName = "GlassCard"

export { GlassCard }
