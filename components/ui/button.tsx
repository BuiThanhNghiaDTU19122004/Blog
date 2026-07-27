import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { clsx } from 'clsx'

const buttonVariants = {
  default: 'inline-flex items-center justify-center rounded-md bg-sky-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-400',
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <button ref={ref} className={clsx(buttonVariants[variant], className)} {...props} />
    )
  }
)

Button.displayName = 'Button'

export { Button }
