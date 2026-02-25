const Navbar = () => {
  return (
    <nav className="dashboard-nav">
	<h1 className="text-sm font-semibold text-white">Universe&You</h1>
	<ul>
		<li>
			<a href="/dashboard/books">Articles</a>
		</li>
		<li>
			<a href="/dashboard/books">Books</a>
		</li>
	</ul>
	<div className="profile">HR</div>
</nav>
  )
}

export default Navbar