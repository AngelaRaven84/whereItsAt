import './button.css';

function Button({
	children,
	onClick,
	type = 'button',
	className = '',
	disabled = false,
	variant = 'primary',
	...props
}) {
	return (
		<button
			type={type}
			className={`btn btn--${variant} ${className}`}
			onClick={onClick}
			disabled={disabled}
			{...props}>
			{children}
		</button>
	);
}

export default Button;
