import { Radio } from "lucide-react"

export function WalkieTalkieHeader() {
  return (
    <div className="p-4 border-b border-gray-200 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Radio className="h-5 w-5 text-emerald-500" />
        <h2 className="font-bold text-lg">Channels</h2>
      </div>
    </div>
  )
}
