import { Avatar } from '@nextui-org/react'

export default function Bubble({ message, user }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-2 items-center p-2 bg-gray-200 rounded-xl px-4">
        <Avatar src="https://i.pravatar.cc/150" />
        <div>
          <p className="text-xs text-gray-500">@{user}</p>
          <p className="text-sm">{message}</p>
        </div>
      </div>
    </div>
  )
}
