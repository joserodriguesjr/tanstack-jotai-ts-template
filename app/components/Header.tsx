import { Link, useMatchRoute } from '@tanstack/react-router'

export default function Header() {
  const matchRoute = useMatchRoute();
  const isActive = (to: string) => matchRoute({ to, fuzzy: true }) ? "font-bold pt-0.5" : "";

  return (
    <>
      <header className="p-2 bg-white text-black text-lg">
        <nav className="flex flex-row gap-2">
          <Link to="/" className={isActive("/")}>Home</Link>
          <Link to="/about" className={isActive("/about")}>About</Link>
          <Link to="/posts" className={isActive("/posts")}>Posts</Link>
          <Link to="/file" className={isActive("/file")}>File</Link>
        </nav>
      </header>
      <hr />
    </>
  )
}
