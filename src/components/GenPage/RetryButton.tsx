type RetryButtonProps = {
  setHtml: React.Dispatch<React.SetStateAction<string | null>>
  onClickOverride?: () => void
}

export default function RetryButton({
  setHtml,
  onClickOverride,
}: RetryButtonProps) {
  function handleClick() {
    if (onClickOverride) return onClickOverride() // ✅ let parent control behavior
    setHtml(null)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="rounded-xl border px-5 py-3 text-sm font-medium hover:bg-gray-50"
    >
      Try Again
    </button>
  )
}
