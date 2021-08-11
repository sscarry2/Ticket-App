import axios from "axios";

export default buildClient = ({ req }) => {
  if (typeof window === "undefined") {
    // We on the server

    return axios.create({
      baseURL:
        "http://ingress-nginx.ingress-nginx-controller.svc.cluster.local",
      headers: req.headers,
    });
  } else {
    // We must be on the browser
    return axios.create({
      baseURL: "/",
    });
  }
};
