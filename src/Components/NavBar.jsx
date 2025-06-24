import applogo from '../assets/app-logo.png'
import avatar from '../assets/avatar-img.png'
const NavBar = () => {
  return (
    <div className='flex justify-between items-center py-3 bg-white px-5 rounded-sm'>
        <a href="#"><img className='w-24' src={applogo} alt="" /></a>
        <div className='flex gap-3 items-center'>
          <img className='w-9 h-9 rounded' src={avatar} alt="" />
          <span className='text-sm md:text-md lg:text-lg'>john smith</span>
        </div>
    </div>
  )
}

export default NavBar
