import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userLoggedOut } from "../../features/auth/authSlice";

export default function Navigation() {
  const dispatch = useDispatch();

  // Extract user from auth state
  const { user } = useSelector((state) => state.auth) || {};

  const logout = () => {
    dispatch(userLoggedOut());
    localStorage.clear();
  };

  // Debugging logs to check the user object
  console.log("user:", user);

  return (
    <nav className="border-general sticky top-0 z-40 border-b bg-violet-700 transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between h-16 items-center">
          <Link to="/">
            <img className="h-10" src="" alt="shoron" />
          </Link>
          <ul className="flex items-center space-x-4">
            {user && user.name ? (
              <li className="text-white">{user.name}</li> // Display user's name
            ) : (
              <li className="text-white">Welcome, Guest</li> // Fallback for missing user data
            )}
            <li className="text-white">
              <span className="cursor-pointer" onClick={logout}>
                Logout
              </span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
