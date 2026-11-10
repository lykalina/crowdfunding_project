export default function CartIcon({ size = 24, className = '' }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-hidden="true"
        >
            <path
                d="M15.6 8.40005V5.40005C15.6 3.41182 13.9882 1.80005 12 1.80005C10.0118 1.80005 8.40002 3.41182 8.40002 5.40005V8.40005M4.7273 22.2001H19.2728C20.5581 22.2001 21.6 21.1775 21.6 19.916L20.1091 7.80002C20.1091 6.53859 19.0672 5.516 17.7818 5.516H5.9273C4.64198 5.516 3.60002 6.53859 3.60002 7.80002L2.40002 19.916C2.40002 21.1775 3.44198 22.2001 4.7273 22.2001Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}