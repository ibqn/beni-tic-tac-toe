import { cn } from "@/class-names"
import { type SquareType } from "@/types"

type Props = {
  value: SquareType | null
  onClick: () => void
}

export const Square = ({ value, onClick }: Props) => {
  const [piece, color] = value || []
  return (
    <button
      className={cn(
        color && "text-red-600",
        "-mr-px -mt-px h-[22px] w-[22px] border border-grau",
        "bg-white p-0 text-center text-sm font-bold leading-[22px] focus:outline-none"
      )}
      onClick={onClick}
    >
      {piece}
    </button>
  )
}
