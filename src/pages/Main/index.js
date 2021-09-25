import './styles.css';
import '../../styles/global.css';
import Sidebar from '../../components/Sidebar';
import MenuUser from '../../components/MenuUser';

function Main({ children }) {
	return (
		<div className="flex-row">
			<Sidebar />
			<div className="main-container">
				<MenuUser />
				{children}
			</div>
		</div>
	);
}

export default Main;
