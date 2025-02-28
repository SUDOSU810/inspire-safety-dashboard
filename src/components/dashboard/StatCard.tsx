
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const statCardVariants = cva(
  "stat-card flex flex-col",
  {
    variants: {
      variant: {
        default: "border-l-4 border-l-primary",
        success: "border-l-4 border-l-success-green",
        danger: "border-l-4 border-l-alert-red",
        info: "border-l-4 border-l-deep-blue",
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
      className={cn(statCardVariants({ variant, size, className }))}
      {...props}
    >
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-semibold mt-1">{value}</h3>
        </div>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </div>
      
      {trend && (
        <div className="flex items-center mt-1">
          <span
            className={cn(
              "text-xs font-medium flex items-center",
              trend.isUpward ? "text-success-green" : "text-alert-red"
            )}
          >
            {trend.isUpward ? "↑" : "↓"} {trend.value}%
          </span>
          <span className="text-xs text-muted-foreground ml-1">vs last month</span>
        </div>
      )}
      
      {footer && <div className="mt-4">{footer}</div>}
    </div>
  );
};

export default StatCard;
