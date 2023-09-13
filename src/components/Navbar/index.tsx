import Link from 'next/link'

export const Navbar = () => (
  <div className="navbar bg-base-100 flex justify-between">
    <Link href="/" className="btn btn-ghost normal-case">Toggl clone</Link>
    <div className="flex gap-4">
      <Link href="/time" className="btn btn-ghost normal-case">Time</Link>
      <Link href="/projects" className="btn btn-ghost normal-case">Projects</Link>
      <Link href="/reports" className="btn btn-ghost normal-case">Reports</Link>
    </div>
  </div>
)