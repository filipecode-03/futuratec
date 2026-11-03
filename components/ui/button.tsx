import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Slot } from "radix-ui"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full border border-transparent font-semibold whitespace-nowrap transition-[background-color,border-color,color,transform,box-shadow] duration-300 ease-out-quart outline-none select-none focus-visible:ring-3 focus-visible:ring-signal/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ink active:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        /* CTA principal: #D90D58 com texto branco (5,1:1). */
        default:
          "bg-cta text-white shadow-[0_8px_24px_-8px_rgb(217_13_88/0.7)] hover:bg-[#b80a4b]",
        /* Sobre fundos de cor: claro com texto escuro. */
        light: "bg-fg text-ink hover:bg-white",
        outline:
          "border-line-strong bg-transparent text-fg hover:border-fg/60 hover:bg-white/5",
        ghost: "text-fg-2 hover:bg-white/5 hover:text-fg",
        link: "rounded-sm text-fg underline decoration-line-strong underline-offset-4 hover:decoration-signal",
      },
      size: {
        default: "h-11 px-5 text-sm",
        lg: "h-12 px-6 text-[0.95rem]",
        xl: "h-14 px-8 text-base",
        icon: "size-11",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
