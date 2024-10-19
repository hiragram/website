import Link from "next/link";

const Header = () => {
    return (
        <header>
            <Link href="/">
            <p>
                <img src="https://avatars.githubusercontent.com/u/3433324?v=4" alt="hiragram" width="32" height="32" />
                <span>hiragram</span>
            </p>
            
            </Link>
        </header>
    );
};

export default Header;