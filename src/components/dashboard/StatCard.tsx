
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/ui/glass-card";

const statCardVariants = cva(
  "flex flex-col p-6 transition-all duration-300",
  {
    variants: {
      variant: {
        default: "border-l-4 border-l-primary bg-gradient-to-br from-white to-pale-green/30",
        success: "border-l-4 border-l-success-green bg-gradient-to-br from-white to-mint-green/20",
        danger: "border-l-4 border-l-alert-red bg-gradient-to-br from-white to-pink-50",
        info: "border-l-4 border-l-chart-blue bg-gradient-to-br from-white to-blue-50",
        premium: "border-none bg-gradient-to-br from-white via-pale-green/20 to-white",
      },
      size: {
        default: "p-6",
        sm: "p-4",
      },
    },
    defaultVariants: {
      variant: "premium",
      size: "default",
    },
  }
);

export interface StatCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statCardVariants> {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isUpward: boolean;
  };
  footer?: React.ReactNode;
}

const StatCard = ({
  className,
  variant,
  size,
  title,
  value,
  icon,
  trend,
  footer,
  ...props
}: StatCardProps) => {
  return (
    <GlassCard
      className={cn("hover:shadow-lg hover:-translate-y-1", className)}
      variant={variant === "default" ? "default" : 
              variant === "success" ? "success" : 
              variant === "info" ? "info" : 
              variant === "danger" ? "warning" : "premium"}
      highlight
      {...props}
    >
      <div className={cn(statCardVariants({ variant, size, className }))}>
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
            <h3 className="text-2xl font-bold mt-1 text-foreground tracking-tight">{value}</h3>
          </div>
          {icon && (
            <div className="text-primary p-3 rounded-lg bg-gradient-to-br from-primary/10 to-accent/5 backdrop-blur-sm shadow-sm">
              {icon}
            </div>
          )}
        </div>
        
        {trend && (
          <div className="flex items-center mt-1">
            <span
              className={cn(
                "text-xs font-medium flex items-center gap-1 px-2 py-1 rounded-full",
                trend.isUpward 
                  ? "text-success-green bg-gradient-to-r from-success-green/10 to-light-green/5" 
                  : "text-destructive bg-gradient-to-r from-destructive/10 to-destructive/5"
              )}
            >
              {trend.isUpward ? "↑" : "↓"} {trend.value}%
              <span className="text-xs text-muted-foreground">vs last month</span>
            </span>
          </div>
        )}
        
        {footer && <div className="mt-4">{footer}</div>}
      </div>
    </GlassCard>
  );
};

export default StatCard;
