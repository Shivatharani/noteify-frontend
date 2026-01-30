export default function Header({ compact = false, fullWidth = false }) {
  return (
    <div
      className={`bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white shadow-md border border-white/20
      ${fullWidth ? "w-full rounded-none px-8 py-5" : ""}
      ${compact ? "px-5 py-3 w-fit rounded-xl" : ""}
      ${!compact && !fullWidth ? "px-8 py-6 w-full rounded-2xl" : ""}`}
    >
      <div className="max-w-6xl mx-auto flex flex-col leading-tight">
        <h1 className="text-2xl font-extrabold tracking-tight">
          NOTEIFY AI
        </h1>
        <p className="text-blue-100 text-sm font-medium">
          Academic Lecture Notes Generator
        </p>
      </div>
    </div>
  )
}
