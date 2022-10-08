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
					search: 'home',
					description: 'Home page Home pageHome pageHome pageHome pageHome pageHome pageHome page',
				},
				{
					name: 'About',
					icon: <FaInfo />,
					pathname: '/about',
					search: 'about',
				},
				{
					name: 'Contact',
					icon: <FaPhone />,
					pathname: '/contact',
					search: 'contact',
				},
				{
					name: 'Email',
					icon: <FaEnvelope />,
					pathname: '/contact',
					search: 'contact',
				},
			]}
			displayButton={true}
			modalTitle="Global Search"
        />
    );
}

export default App;
