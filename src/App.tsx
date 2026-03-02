import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { SkeletonTheme } from "react-loading-skeleton";

function App() {
  return (
    <SkeletonTheme baseColor="#ffff" highlightColor="#cbcbcb">
      <RouterProvider router={router} />
    </SkeletonTheme>
  );
}

export default App;
