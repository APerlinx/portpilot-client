import type { ReactNode } from 'react'

interface StepProps {
  num: number
  title: string
  children: ReactNode
}

const Step = ({ num, title, children }: StepProps) => (
  <li className="relative flex rounded-2xl bg-white p-6 shadow-md ring-1 ring-gray-100">
    <div className="flex-shrink-0">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-third text-white font-bold shadow-sm">
        {num}
      </div>
    </div>

    <div className="ml-4">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-sm text-gray-600 max-w-prose">{children}</p>
    </div>
  </li>
)

export default Step
