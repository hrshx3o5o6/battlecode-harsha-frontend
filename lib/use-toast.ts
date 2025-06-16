"use client"

type ToastProps = {
  title?: string
  description?: string
  variant?: "default" | "destructive"
}

export function useToast() {
  const toast = ({ title, description, variant = "default" }: ToastProps) => {
    // Simple alert implementation - you can replace this with a proper toast library
    if (variant === "destructive") {
      alert(`Error: ${title}\n${description}`)
    } else {
      alert(`${title}\n${description}`)
    }
  }

  return { toast }
}
