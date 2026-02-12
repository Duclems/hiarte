import './Button.css'

export function Button({ children, variant = 'primary', onClick, type = 'button', disabled = false, ...props }) {
  return (
    <button
      type={type}
      className={`btn btn--${variant}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
