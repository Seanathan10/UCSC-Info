import { Link } from "react-router";

interface NavBarButtonProps {
	onClick: () => void;
}

export default function NavBarButtons({onClick}: NavBarButtonProps) {
	const topBarButtons = {
		'Home': '/',
		...Object.fromEntries(['Insights', 'News', 'Menu', 'Courses'].map(k => [k, `/${k.toLowerCase()}`]))
	}

	return (
		Object.entries(topBarButtons).map(([name, path]) => (
			<Link
				to={path}
				style={{ textDecoration: 'none' }}
				onClick={onClick}
			>
				{name}
			</Link>
		))
	)
}