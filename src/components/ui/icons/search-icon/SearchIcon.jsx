import "./search-icon.scss"

export default function SearchIcon({ className = "" }) {
    return (

        <svg
            className={className}
            // width="16"
            // height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >

            <path
                d="M12.6871 12.6872L15.4996 15.4997"
                stroke="#2D2E2F"
                strokeMiterlimit="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            <path
                d="M6.59338 12.6872C9.95887 12.6872 12.6871 9.95892 12.6871 6.59344C12.6871 3.22795 9.95887 0.499687 6.59338 0.499687C3.2279 0.499687 0.499634 3.22795 0.499634 6.59344C0.499634 9.95892 3.2279 12.6872 6.59338 12.6872Z"
                stroke="#2D2E2F"
                strokeWidth="0.999375"
                strokeMiterlimit="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

        </svg>
    )
}