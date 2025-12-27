import { useContext } from "react";
import "./TopBar.css";
import TopBarButton from "../TopBarButton";
import { Context } from "../../Context";

export function TopBar() {
	const topBarButtons = {
		'Home': '/',
		...Object.fromEntries(['Insights', 'News', 'Menu', 'Courses'].map(k => [k, `/${k.toLowerCase()}`]))
	}
	const ctx = useContext(Context);
	return (
		<>
			<header className="app-bar">

				<div className={`hamburger ${ctx?.drawer ? 'open' : ''}`}
					onClick={() => ctx?.drawerFunction(!ctx?.drawer)}
				>
					<span />
					<span />
					<span />
				</div>
				<div className="app-bar__title">ucsc.info</div>
			</header>

			<aside className={`drawer ${ctx?.drawer ? 'open' : ''}`}>
				<nav className="drawer__nav">
					{Object.entries(topBarButtons).map(([item, path]) => (
						<TopBarButton path={path} name={item} onClick={() => ctx!.drawerFunction(false)}/>
					))}
				</nav>
			</aside>
		</>
	);
}

// this will need a shared state from the start
/*
export function TopBar() {
	const [opened, toggleNavbar] = useState(false);
	return (
		<AppShell
			header={{height: 50}}
			navbar={{width: 300, breakpoint: 'sm', collapsed: {mobile: !opened}}}
		>
			<AppShell.Header>
				<Group h="100%" px="md">
					<Burger opened={opened} onClick={() => {toggleNavbar(!opened)}}
						hiddenFrom="sm" size="sm" />
					<Text size="xl">ucsc.info</Text>
				</Group>
			</AppShell.Header>
			<AppShell.Navbar p="mid">
				<Text size="xl">
					holy fucking shit, 40000
				</Text>
				<Text size="xl">
					earthmover
				</Text>
				<Text size="xl">
					holy fucking shit, 40000
				</Text>
			</AppShell.Navbar>
		</AppShell>
	);
}
*/