import { Navigate } from "react-router-dom";
import { TOKEN } from "../helper/constant";
import { getItemFromCookie } from "../helper/util";

const withAuthentication = (WrapedComponent) => {
  const Component = () => {
    if (getItemFromCookie(TOKEN)) {
      return <WrapedComponent />;
    }
    return <Navigate to={"/login"} />;
  };

  return (
    <>
      <Component />
    </>
  );
};

export default withAuthentication;
