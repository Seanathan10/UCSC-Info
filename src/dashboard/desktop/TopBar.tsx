import { useLocation } from 'react-router';
import './TopBar.css';
import TopBarButton from '../TopBarButton';
import ThemeToggle from '../../ThemeChanger';
import { useContext } from 'react';
import { Context } from '../../Context';

export function TopBar() {
    const location = useLocation();
    const isInsights = location.pathname.includes("insights");
	const ctx = useContext(Context);

	const topBarButtons = {
		'Home': '/',
		...Object.fromEntries(['Insights', 'News', 'Menu', 'Courses'].map(k => [k, `/${k.toLowerCase()}`]))
	}
    
    return (
        <header className={`app-bar ${isInsights ? 'glass-topbar' : ''}`}>
            <nav className="nav-bar__nav">
                {Object.entries(topBarButtons).map(([item, path]) => (
                    <TopBarButton path={path} name={item} onClick={() => ctx!.drawerFunction(false)}/>
                ))}
            </nav>
            <div className="nav-bar__theme-toggle">
                <ThemeToggle />
            </div>
        </header>
    );
}
