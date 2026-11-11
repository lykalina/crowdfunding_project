import { Link } from 'react-router-dom';
import { useButton } from '../ButtonComponent/useButton';
import '../ButtonComponent/ButtonComponent.css';

export default function ButtonLinkComponent({
                                       to,
                                       children,
                                       variant = 'primary',
                                       size = 'medium',
                                       block = false,
                                       className = '',
                                       ...rest
                                   }) {
    const { classes } = useButton({ variant, size, block, className });

    return (
        <Link to={to} className={classes} {...rest}>
            {children}
        </Link>
    );
}