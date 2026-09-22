import Link from "next/link";

const Header = () => {
  return (
    <header className="flex h-[60px] w-full items-center justify-center border-b border-border bg-header">
      <nav>
        <ul className="flex gap-4">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
