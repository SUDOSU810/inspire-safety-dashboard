
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const statCardVariants = cva(
  "stat-card flex flex-col",
  {
    variants: {
      variant: {
        default: "border-l-4 border-l-primary bg-gradient-to-br from-white to-pale-green/30",
        success: "border-l-4 border-l-success-green bg-gradient-to-br from-white to-mint-green/20",
        danger: "border-l-4 border-l-alert-red bg-gradient-to-br from-white to-pink-50",
        info: "border-l-4 border-l-chart-blue bg-gradient-to-br from-white to-blue-50",
      },
      size: {
        default: "p-6",
        sm: "p-4",
      },
    },
    defaultVariants: {
      variant: "default",
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
    <div
      className={cn(statCardVariants({ variant, size, className }), "shadow-md hover:shadow-lg")}
      {...props}
    >
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-semibold mt-1 text-foreground">{value}</h3>
        </div>
        {icon && (
          <div className="text-primary bg-primary/10 p-2 rounded-full">
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
                ? "text-success-green bg-success-green/10" 
                : "text-destructive bg-destructive/10"
            )}
          >
            {trend.isUpward ? "↑" : "↓"} {trend.value}%
            <span className="text-xs text-muted-foreground">vs last month</span>
          </span>
        </div>
      )}
      
      {footer && <div className="mt-4">{footer}</div>}
    </div>
  );
};

export default StatCard;
