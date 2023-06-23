import ReactGA from "react-ga";

let initialized = false;
const isBrowser = () => typeof window !== "undefined"

function trackPageGA() {
    if (!initialized) {
        ReactGA.initialize('G-43F2VNGSJH');
    }
    if (isBrowser()) {
        ReactGA.pageview(window.location.pathname + window.location.search);
    }
}


export default trackPageGA;