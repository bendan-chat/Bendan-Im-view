import welcome from "@/assets/images/welcome01.png";
import "./home.less";

const Home = () => {
	return (
		<div className="home card">
			<img src={welcome} alt="welcome" />
		</div>
	);
};

export default Home;
