import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router'
import Footer from './Footer'
import { BASE_URL } from '../utils/constant'
import { useNavigate,useLocation } from 'react-router-dom'
import { useEffect,useRef,useState } from 'react'
import axios from 'axios'
import { useDispatch,useSelector } from 'react-redux'
import {addUser} from '../Store/userSlice'
import images from '../assets/images.jpg'
import Carousel from './Carousel'
const Home = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const location=useLocation()
  const isAtHome=(location.pathname==='/')
  const[pageNum,setPageNum]=useState(1)
  const[loading,setLoading]=useState(false)
  const[lastElement,setLastElement]=useState(false)
    // const observer = useRef(
    //     new IntersectionObserver(
    //         (entries) => {
    //             const first = entries[0];
    //             if (first.isIntersecting) {
    //                 setPageNum((no) => no + 1);
    //             }
    //         })
    // );

  const user=useSelector((state)=>state?.user)
    const fetchUser = async () => {
    if (user){
    return;
    };
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data?.data));
      return navigate('/feed')
    } catch (err) {
      if (err.status === 401) {
        navigate("/login");
      }
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  //  useEffect(()=>{
  //         const currentElement = lastElement;
  //       const currentObserver = observer.current;

  //       if (currentElement) {
  //           currentObserver.observe(currentElement);
  //           setPageNum((num)=>num+1)
  //       }
        
  //       return () => {
  //           if (currentElement) {
  //               currentObserver.unobserve(currentElement);
  //           }
  //       };
  //  },[lastElement,pageNum])
  return (
  <div className='w-full min-h-screen bg-[url(../assets/images.jpg)] bg-fixed flex flex-col'>
    <Navbar/>
    {isAtHome && (<div className="bg-gradient-to-b from-gray-900 to-slate-800 min-h-screen text-white flex flex-col items-center justify-evenly px-6 py-32">
  <h1 className="text-5xl font-extrabold text-center mb-4">
    Connect. Collaborate. Code.
  </h1>
  <p className="text-xl text-center mb-8 max-w-xl">
    Find your next dev partner, mentor, or co-founder. It’s like swiping on GitHub—minus the awkward DMs.
  </p>
  <button 
    onClick={() => navigate('/signup')} 
    className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white text-lg font-semibold py-3 px-8 rounded-full shadow-md hover:shadow-xl transition duration-300 ease-in-out">
    Sign Up Now 👩‍💻👨‍💻
  </button>
  <div className="bg-slate-900 my-16 py-16 px-6 text-white grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
  <div>
    <h3 className="text-2xl font-bold mb-2">1. Create Profile</h3>
    <p>Show off your tech stack, GitHub activity, and learning goals.</p>
  </div>
  <div>
    <h3 className="text-2xl font-bold mb-2">2. Start Matching</h3>
    <p>Connect with developers based on interest and compatibility.</p>
  </div>
  <div>
    <h3 className="text-2xl font-bold mb-2">3. Build Together</h3>
    <p>Team up for side projects, mentorship, or code sprints.</p>
  </div>
</div>
  <div className="bg-indigo-600  text-white py-4 px-6 text-center font-semibold">
  🚀 New Feature Drop: AI-Powered Skill Matching now live!
</div>

<div className='my-40'>
<Carousel/>
</div>

</div>

)}
<div className='w-full min-h-[calc(100vh_-_220px)]  bg-slate-800 pb-[100px] pt-[24px] flex-grow overflow-y-auto'>
  <Outlet/>
</div>
      <div>
      <Footer/>
      </div>
  </div>
  )
}

export default Home