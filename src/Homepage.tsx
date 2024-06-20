import { THomePage } from "./types";

const HomePage: THomePage = ({ logout }) => {
  return (
    <div className="page">
      <div onClick={logout} className="logout-button">
        Logout
      </div>
      <h1>Signed Up Successfully</h1>
    </div>
  );
};

export default HomePage;
