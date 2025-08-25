import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../utils/constant';
import { removeUser } from '../Store/userSlice';

const Navbar = () => {
  const data = useSelector((state) => state?.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + '/logout', {}, { withCredentials: true });
      dispatch(removeUser());
      navigate('/');
    } catch (e) {
      console.error(e);
    }
  };
CryptoKey
  return (
<nav className="bg-purple-900 text-white py-3 px-4 sm:px-6 shadow-md fixed top-0 left-0 w-full z-50">
  <div className="flex items-center justify-between max-w-7xl mx-auto flex-wrap sm:flex-nowrap">
    
    {/* Left Section - Always aligned to start */}
    <div className="flex relative right-16 items-center gap-2 sm:gap-3 cursor-pointer"
      onClick={() => {
        data ? navigate('/feed') : navigate('/');
      }}
    >
      <span className="text-2xl">🧑‍💻</span>
      <p className="text-xl font-bold hover:text-cyan-300 transition whitespace-nowrap">
        resoCoders
      </p>
    </div>

    {/* Right Section - Always visible and aligned to end */}
    <div className="flex items-center lg:relative left-10 gap-4 sm:gap-6 flex-wrap sm:flex-nowrap">
      {data ? (
        <>
          <span className="text-sm hidden  md:block whitespace-nowrap">
            Welcome, <span className="font-semibold">{data.firstName}</span>
          </span>
          <div className="relative group">
            <img
              src={data?.photoUrl}
              alt="User avatar"
              className="w-10 h-10 rounded-full cursor-pointer border-2 border-cyan-400"
            />
            <ul className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 p-2 cursor-pointer">
              {/* Dropdown items */}
              <li className="mb-2">
                <p
                  className="block px-4 py-2 hover:bg-slate-700 rounded-md"
                  onClick={() => navigate('/viewprofile', { state: data })}
                >
                  My Profile
                </p>
              </li>
              <li className="mb-2 ml-6">
                <Link
                  to="/profile"
                  className="block px-6 py-2 hover:bg-slate-700 rounded-md text-nowrap"
                >
                  Edit Profile{' '}
                  <span className="text-xs bg-cyan-500 ml-2 text-white px-2 py-0.5 rounded-full">
                    New
                  </span>
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/connection"
                  className="block px-4 py-2 hover:bg-slate-700 rounded-md"
                >
                  Connections
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/request"
                  className="block px-4 py-2 hover:bg-slate-700 rounded-md"
                >
                  Requests
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 hover:bg-red-600 rounded-md text-red-300"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </>
      ) : (
        <div className='relative left-8 flext justify-bewtween gap-4 items-center'>
          <Link to="/login">
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white mr-4 px-4 py-2 rounded-lg transition whitespace-nowrap">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg transition whitespace-nowrap">
              Signup
            </button>
          </Link>
        </div>
      )}
    </div>
  </div>
</nav>

  )
}
export default Navbar;






