import type { ReactNode } from 'react'

interface StepProps {
  num: number
  title: string
  children: ReactNode
}

const Step = ({ num, title, children }: StepProps) => (
  <li className="relative rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
    <div className="absolute -top-3 left-6 flex h-8 w-8 items-center justify-center rounded-full bg-[#0066FF] text-sm font-bold text-white">
      {num}
    </div>
    <h3 className="mt-2 text-base font-semibold">{title}</h3>
    <p className="mt-2 text-sm text-gray-600">{children}</p>
  </li>
)

export default Step
