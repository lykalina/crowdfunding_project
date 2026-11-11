export function useButton(
    {
        variant = 'primary',
        size = 'medium',
        className = '',
        block = false,
    }) {
    const classes = [
        'btn',
        `btn--${variant}`,
        `btn--${size}`,
        block ? 'btn--block' : '',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return { classes };
}