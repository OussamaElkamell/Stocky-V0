import * as React from "react"

const Chart = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => <div className="relative" {...props} ref={ref} />,
)
Chart.displayName = "Chart"

const ChartContainer = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => <div className="overflow-x-auto" {...props} ref={ref} />,
)
ChartContainer.displayName = "ChartContainer"

const ChartTooltip = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    <div className="z-50 rounded-md border bg-popover p-4 text-popover-foreground shadow-sm" {...props} ref={ref} />
  ),
)
ChartTooltip.displayName = "ChartTooltip"

const ChartTooltipContent = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => <div className="font-medium leading-tight" {...props} ref={ref} />,
)
ChartTooltipContent.displayName = "ChartTooltipContent"

const ChartLegend = React.forwardRef<React.ElementRef<"ul">, React.ComponentPropsWithoutRef<"ul">>(
  ({ className, ...props }, ref) => <ul className="flex flex-wrap" {...props} ref={ref} />,
)
ChartLegend.displayName = "ChartLegend"

const ChartLegendItem = React.forwardRef<React.ElementRef<"li">, React.ComponentPropsWithoutRef<"li">>(
  ({ className, ...props }, ref) => <li className="flex items-center gap-2 text-sm" {...props} ref={ref} />,
)
ChartLegendItem.displayName = "ChartLegendItem"

export { Chart, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendItem }
