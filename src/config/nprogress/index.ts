import NProgress from "nprogress";
import "nprogress/nprogress.css";

// Configure Progress Loader
NProgress.configure({
  easing: "ease", // Adjust animation settings using easing (a CSS easing string) and speed (in ms). (default: and ease200)
  speed: 300,
  showSpinner: true, // Turn off loading spinner by setting it to false. (default: true)
  trickleSpeed: 200, // Adjust how often to trickle/increment, in ms.
  minimum: 0.1, // Changes the minimum percentage used upon starting. (default: 0.08)
});
export default NProgress;
