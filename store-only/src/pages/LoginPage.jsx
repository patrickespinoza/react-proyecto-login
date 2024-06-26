import { useForm } from 'react-hook-form'
import{ login } from '../api'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import { useState } from 'react'


export default function LoginPage () {

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false)
    
    const {
        handleSubmit,
        register,
        formState: {errors},
        setError,
    } = useForm()


 async function onSubmit (data) {
    try {

        const token = await login(data.username, data.password)
        if(token) {

            window.localStorage.setItem('token', token)
            toast.success('Bienvenido')
            navigate("/productos")
        }else {
            toast.error("usuario o contraseña incorrectos")
            setError("root.credentials", {type: "manual", message:"Credenciales invalidas"})
        }
    } catch (error) {
      toast.error('Erorr al iniciar sesion')
      console.error ('[login error]', error)
    }

    }

    function handleShowHidePassword () {
        // if(showPassword === true) {
        //     setShowPassword(false)
        // }else {
        //     setShowPassword(true)
        // }
        setShowPassword(!showPassword)
    }


    return (
        <main className="flex items-center justify-center w-full gap-4 flex-col min-h-screen bg-black">

        <form onSubmit={handleSubmit(onSubmit)} className={clsx(' border border-white/50 rounded p-4 flex flex-col gap-4 max-w-sm w-full',
        {
            'border-red-500': errors.root ?.credentials,
        } 
        )}>

            <input className="border border-white/50 rounded p-2 text-black" type="text" {...register('username', {
                required: {value: true, message: 'El nombre de usuario requerido'}
            })} placeholder="User"/>

            <input className="border border-white/50 rounded p-2 text-black"  type={ showPassword ? "text": "password"} placeholder="Password" {...register('password',{
                required: {value: true, message: 'Contraseña requerida'}
            })}/>

            <span className='text-xs text-white/50 cursor-pointer hover:text-white'
            onClick={handleShowHidePassword}
            >
                { showPassword ? "🙈 Ocultar" : "🐵 mostrar"} password
            </span>

            <button className='text-4xl font-bold text-center'>Login</button>

            {errors.root?.credentials && <p className='text-red-500 text-center'>Credenciales invalidas</p> }

        </form>
        </main>
    )

}