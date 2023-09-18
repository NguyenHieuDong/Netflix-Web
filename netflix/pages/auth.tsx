import 'tailwindcss/tailwind.css'
import Input from "../components/input"
import {useCallback, useState} from 'react'


import axios from 'axios'
import { getSession, signIn } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { NextPageContext } from 'next'



const Auth = () => {
    
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const [variant , setVariant] = useState('login')
    const toggleVariant = useCallback(() => {
        setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login');
    },[]);


    const login  = useCallback(async () => {
        try {
            await signIn('credentials',{
                email,
                password,
                
                callbackUrl: '/profiles'
            });
            
        } catch (error){
            console.log(error)
        }

      },[email , password ]);

    const register = useCallback(async () => {
        try {
          await axios.post('/api/register', {
            email,
            name,
            password
          });
          login()
          
        } catch (error) {
            console.log(error);
        }
      }, [email, name, password , login]);


     
    return (
        
        <div className="relative h-full w-full bg-[url('/image/background.jpeg')] bg-no-repeat bg-center bg-fixed bg-cover">
            <div className='bg-black w-full h-full lg:bg-opacity-30'>
                <nav className="px-12 py-5">
                    <img src="/image/netflix.png" className="h-12" alt="Logo" />
                
                </nav>
                <div className="flex justify-center">
                    <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
                        <h2 className='text-white text-4xl mb-8 font-semibold'>
                            {variant === 'login' ? 'Đăng nhập' : 'Tạo tài khoản'}
                        </h2>
                        <div className="flex flex-col gap-4">
                            {variant === 'register' && (
                                <Input
                                label="Username" 
                                onChange={(ev:any) => setName(ev.target.value)}
                                id ="name"
                                type="name"
                                value={name}
                            />
                            )}
                            
                            <Input
                                label="Email" 
                                onChange={(ev:any) => setEmail(ev.target.value)}
                                id ="email"
                                type="email"
                                value={email}
                            />
                            <Input
                                label="Password" 
                                onChange={(ev:any) => setPassword(ev.target.value)}
                                id ="password"
                                type="password"
                                value={password}
                            />
                        </div>
                        <button onClick={variant === 'login' ? login : register } className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
                            {variant === 'login' ? 'Đăng nhập' : 'Đăng ký'}
                        </button>
                        <div className='flex flex-row items-center gap-4 mt-8 justify-center'>
                            <div onClick={() => signIn('google' , {callbackUrl: '/profiles' })} className='w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition'>
                                <FcGoogle size={30}/>
                            </div>
                            <div onClick={() => signIn('github' , {callbackUrl: '/profiles' })} className='w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition'>
                                <FaGithub size={30}/>
                            </div>
                        </div>
                        
                            
                        
                        <p className="text-neutral-500 mt-12">
                            {variant === 'login' ? 'Bạn mới tham gia Netflix? ' : 'Đã có tài khoản?'}
                            <span onClick={toggleVariant} className='text-white ml-1 hover:underline cursor-pointer'>
                                {variant === 'login' ? 'Đăng ký ngay':'Đăng nhập' }
                            </span>
                        </p>
                        <p className="text-neutral-500 mt-12">
                            Trang này được Google reCAPCHA bảo vệ để đảm bảo bạn không phải là robot.
                        </p>
                        <span onClick={toggleVariant} className='text-white ml-1 hover:underline cursor-pointer'>
                                Tìm hiểu thêm
                        </span>
                    </div>
                </div>
                <div className="bg-black bg-opacity-50 mt-10 relative h-full w-full bg-no-repeat bg-center bg-fixed bg-cover">
                    
                         <p className="text-neutral-500 mt-12 px-12 py-5">
                        
                            Bạn có câu hỏi? Liên hệ với chúng tôi.
                        </p>
                        <div className="px-12 py-2">
                        
                        </div>
                    
                    
                    
                </div>
            </div>
        </div>
       
        
    )
}

export default Auth;