import { cn } from "@/class-names"
import { type SquareType } from "@/type"

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
        "bg-white text-center w-[22px] h-[22px] -mt-[1px] -mr-[1px] leading-[22px] text-sm border border-[#999] p-0 font-bold focus:outline-none"
      )}
      onClick={onClick}
    >
      {piece}
    </button>
  )
}
