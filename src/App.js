import './App.css';
import GlobalSearch from './lib';

// import home, about, contact pages from react-icons
import { FaHome, FaInfo, FaPhone, FaEnvelope } from 'react-icons/fa';
function App() {
    return (
        <GlobalSearch 
			items={[
				{
					name: 'Home',
					icon: <FaHome />,
					pathname: '/',
					onClick: () => window.location.pathname = '/',
					search: 'home',
					description: 'Home page Home pageHome pageHome pageHome pageHome pageHome pageHome page',
				},
				{
					name: 'About',
					icon: <FaInfo />,
					pathname: '/about',
					search: 'about',
					onClick: () => window.location.pathname = '/about',
				},
				{
					name: 'Contact',
					icon: <FaPhone />,
					pathname: '/contact',
					onClick: () => window.location.pathname = '/contact',
					search: 'contact',
				},
				{
					name: 'Email',
					icon: <FaEnvelope />,
					pathname: '/email',
					onClick: () => window.location.pathname = '/contact',
					search: 'email',
				},
			]}
			displayButton={true}
			modalTitle="Global Search"
			// modalPositionTop={"20%"}
			// modalWidth={"100%"}
        />
    );
}

export default App;
