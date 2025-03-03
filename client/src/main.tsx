// Import necessary modules from React and React Router
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

/* ************************************************************************* */

// Import the main app component
import App from "./App";
import AdminRoute from "./components/ProtectedRoute/AdminRoute";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import AdoptDragon from "./pages/AdoptDragon/AdoptDragon";
import AllDragons from "./pages/AllDragons/AllDragons";
import Dashboard from "./pages/Dashboard/Dashboard";
import DragonDetails from "./pages/DragonDetails/DragonDetails";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import SelectProfile from "./pages/SelectProfile/SelectProfile";
import {
  loadAllDragons,
  loadDragonDetails,
  loadProfiles,
  loadSpecies,
} from "./services/loader";

// Import additional components for new routes
// Try creating these components in the "pages" folder

// import About from "./pages/About";
// import Contact from "./pages/Contact";

/* ************************************************************************* */

// Create router configuration with routes
// You can add more routes as you build out your app!
const router = createBrowserRouter([
  {
    path: "/", // The root path
    element: <App />, // Renders the App component for the home page
    children: [
      {
        path: "adopter-dragon",
        element: <ProtectedRoute element={<AdoptDragon />} />,
        loader: loadSpecies,
      },
      {
        path: "mes-dragons/:dragonId",
        element: <ProtectedRoute element={<DragonDetails />} />,
        loader: loadDragonDetails,
      },
      {
        path: "/mes-dragons",
        element: <ProtectedRoute element={<AllDragons />} />,
        loader: loadAllDragons,
      },
      {
        path: "/profils",
        element: <ProtectedRoute element={<SelectProfile />} />,
        loader: loadProfiles,
      },
      {
        path: "/dashboard",
        element: <AdminRoute element={<Dashboard />} />,
      },
      {
        path: "/connexion",
        element: <Login />,
      },
      {
        path: "/inscription",
        element: <Register />,
      },
    ],
  },
  // Try adding a new route! For example, "/about" with an About component
]);

/* ************************************************************************* */

// Find the root element in the HTML document
const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}

// Render the app inside the root element
createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

/**
 * Helpful Notes:
 *
 * 1. Adding More Routes:
 *    To add more pages to your app, first create a new component (e.g., About.tsx).
 *    Then, import that component above like this:
 *
 *    import About from "./pages/About";
 *
 *    Add a new route to the router:
 *
 *      {
 *        path: "/about",
 *        element: <About />,  // Renders the About component
 *      }
 *
 * 2. Try Nested Routes:
 *    For more complex applications, you can nest routes. This lets you have sub-pages within a main page.
 *    Documentation: https://reactrouter.com/en/main/start/tutorial#nested-routes
 *
 * 3. Experiment with Dynamic Routes:
 *    You can create routes that take parameters (e.g., /users/:id).
 *    Documentation: https://reactrouter.com/en/main/start/tutorial#url-params-in-loaders
 */
