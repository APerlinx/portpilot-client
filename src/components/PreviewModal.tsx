export function PreviewModal({
  html,
  onClose,
}: {
  html: string
  onClose: () => void
}) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-6">
      <div className="w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h3 className="font-semibold">Preview</h3>
          <button
            onClick={onClose}
            className="rounded px-3 py-1 text-sm hover:bg-gray-100"
          >
            Close
          </button>
        </div>
        <iframe title="Preview" className="h-[80vh] w-full" srcDoc={html} />
      </div>
    </div>
  )
}
