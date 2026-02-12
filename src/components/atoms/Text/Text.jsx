import './Text.css'

export function Text({ children, as: Component = 'p', variant = 'body', className = '', ...props }) {
  return (
    <Component className={`text text--${variant} ${className}`.trim()} {...props}>
      {children}
    </Component>
  )
}
