

export default function Loading({text, className}: {text?: string, className?: string}) {
  return (
    <div className={`border flex flex-col justify-center items-center main-height ${className}`}>
      {text && <p className="text-primary font-bold tracking-widest">{text}</p>}
        <span 
            className="loading loading-spinner text-primary"
            >
        </span>
    </div>
  )
}
