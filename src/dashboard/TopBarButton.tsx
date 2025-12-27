import {Link} from "react-router";

interface TopBarButtonProps {
	path: string;
	name: string;
	onClick: () => void;
}

export default function TopBarButton({path, name, onClick}: TopBarButtonProps) {
    return (
        <Link 
			to={path} 
			style={{textDecoration: 'none'}} 
			onClick={onClick}
		>
				{name}
		</Link>
    );
}