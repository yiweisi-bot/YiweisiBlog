import { useEffect, useState } from 'react'
import { getTotalViews } from '../lib/analytics'

export function TotalViews() {
  const [views, setViews] = useState<number>(0)

  useEffect(() => {
    getTotalViews().then(setViews)
  }, [])

  return (
    <span className="text-gray-500 text-sm">
      👁️ 总访问量：{views.toLocaleString()}
    </span>
  )
}
