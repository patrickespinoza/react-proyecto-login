import { useForm } from 'react-hook-form'
import{ login } from '../api'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'


export default function LoginPage () {

    const navigate = useNavigate();
    const {
        handleSubmit,
        register,
        formState: {errors},
    } = useForm()


 async function onSubmit (data) {
    try {

        const token = await login(data.username, data.password)
        window.localStorage.setItem('token', token)
        toast.success('Bienvenido')
        navigate("/productos")
    } catch (error) {
      toast.error('Erorr al iniciar sesion')
      console.error ('[login error]', error)
    }

    }

    return (
        <main className="flex items-center justify-center w-full gap-4 flex-col min-h-screen bg-slate-500">

        <form onSubmit={handleSubmit(onSubmit)} className='border-white/50 rounded p-4 flex flex-col gap-4 max-w-sm w-full'>

            <input className="border border-white/50 rounded p-2 text-black" type="text" {...register('username', {
                required: {value: true, message: 'El nombre de usuario requerido'}
            })} placeholder="User"/>

            <input className="border border-white/50 rounded p-2 text-black"  type="password" placeholder="Password" {...register('password',{
                required: {value: true, message: 'Contraseña requerida'}
            })}/>

            <button className='text-4xl font-bold text-center'>Login</button>

        </form>
        </main>
    )

}