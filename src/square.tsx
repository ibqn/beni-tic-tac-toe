import { cn } from "@/class-names"
import { type SquareType } from "@/types"

type Props = {
  value: SquareType
  onClick: () => void
}

export const Square = ({ value, onClick }: Props) => {
  const { piece, color } = value
  return (
    <button
      className={cn(
        color && "text-red-600",
        "border-grau -mt-px -mr-px h-[22px] w-[22px] border",
        "bg-white p-0 text-center text-sm leading-[22px] font-bold focus:outline-hidden"
      )}
      onClick={onClick}
    >
      {piece}
    </button>
  )
}
