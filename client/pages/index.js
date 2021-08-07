import axios from "axios";
const LandingPage = ({ currentUser }) => {
  // console.log(currentUser);
  // axios.get('/api/users/currentuser').catch((err) => {
  //   console.log(err.message);
  // });

  return <h1>Landing Page</h1>;
};

LandingPage.getInitialProps = async ({ req }) => {
  console.log(req.headers);
  if (typeof window === "undefined") {
    //we are on the server
    const { data } = await axios.get(
      "http://ingress-nginx.ingress-nginx-controller.svc.cluster.local/api/users/currentuser",
      {
        headers: req.headers,
      }
    );
    return data;
  } else {
    //we are on the browser
    const { data } = await axios.get("/api/users/currentuser");
    return data;
  }
  return {};
};

export default LandingPage;
