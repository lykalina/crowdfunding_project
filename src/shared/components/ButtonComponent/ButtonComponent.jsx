import './ButtonComponent.css';
import { useButton } from './useButton';

export default function Button({
                                   children,
                                   variant = 'primary',
                                   size = 'medium',
                                   block = false,
                                   className = '',
                                   type = 'button',
                                   ...rest
                               }) {
    const { classes } = useButton({ variant, size, block, className });

    return (
        <button type={type} className={classes} {...rest}>
            {children}
        </button>
    );
}