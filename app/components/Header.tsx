import Link from "next/link";

export default function Header() {
    return (
        <header className="bg-white shadow-sm">
            <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                <Link href="/" className="text-xl font-bold text-indigo-600">
                    MyCompany
                </Link>

                <div className="space-x-6 text-sm font-medium">
                    <Link href="/" className="hover:text-indigo-600">
                        Home
                    </Link>
                    <Link href="/about" className="hover:text-indigo-600">
                        About
                    </Link>
                    <Link href="/case-studies" className="hover:text-indigo-600">
                        Case Studies
                    </Link>
                </div>
            </nav>
        </header>
    );
}
