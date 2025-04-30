"use client";

import {
  LineChart as RechartsLineChart,
  Tooltip,
  type TooltipProps,
} from "recharts";

export type ChartConfig = Record<
  string,
  {
    label: string;
    color?: string;
  }
>;

export function ChartContainer({
  config,
  className,
  children,
}: {
  config: ChartConfig;
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={className}>{children}</div>;
}

export function ChartTooltip(props: TooltipProps<any, any>) {
  return (
    <Tooltip
      {...props}
      cursor={false}
      contentStyle={{
        background: "hsl(var(--background))",
        border: "1px solid hsl(var(--border))",
        borderRadius: "calc(var(--radius) - 2px)",
        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
      }}
    />
  );
}

export const ChartTooltipContent: React.FC<{
  className?: string;
  labelFormatter: (value: string) => string;
  valueFormatter?: (value: number) => string;
  nameKey: string;
  active?: boolean;
  payload?: any[];
  label?: string;
}> = ({
  className,
  labelFormatter,
  valueFormatter,
  nameKey,
  active,
  payload,
  label,
}) => {
  if (!active || !payload) return null;

  return (
    <div className={className}>
      <p className="text-sm font-medium text-foreground">
        {labelFormatter(label || "")}
      </p>
      <div className="mt-2 space-y-1">
        {payload.map((p) => (
          <div
            key={p.dataKey}
            className="flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: p.color }}
              />
              <span className="text-sm text-muted-foreground">{nameKey}</span>
            </div>
            <span className="text-sm font-medium text-foreground">
              {valueFormatter ? valueFormatter(p.value) : p.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
