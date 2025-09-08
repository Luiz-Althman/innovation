'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LockKeyholeOpen, User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { saveAuthToken } from '@/services/auth'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'

const signInFormSchema = z.object({
  email: z.string().min(1, 'Usuário é obrigatório'),
  password: z.string().min(1, 'Senha é obrigatória'),
  remember: z.boolean().optional(),
})

type SignInFormValues = z.infer<typeof signInFormSchema>

export function CardAuth() {
  const navigate = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  })

  async function onSubmit(data: SignInFormValues) {
    try {
      const res = await fetch(
        'https://apihomolog.innovationbrindes.com.br/api/innova-dinamica/login/acessar',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: data.email,
            senha: data.password,
          }),
        },
      )

      const resData = await res.json()

      if (resData.status === 1) {
        saveAuthToken(resData.token_de_acesso, data.remember ?? false)
        navigate.push('/produtos')
      } else {
        toast.error('Usuário ou senha inválidos.')
      }
    } catch {
      toast.error('Erro de conexão. Tente novamente.')
    }
  }

  return (
    <Card className="w-full max-w-lg border-0 bg-[#58bd01] p-8">
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
          <div className="relative w-full">
            <User
              className={`absolute top-1/2 left-6 -translate-y-1/2 ${
                errors.email ? 'text-red-500' : 'text-gray-400'
              }`}
            />
            <Input
              type="text"
              placeholder="Usuário"
              className={`rounded-full bg-white py-8 pl-15 ${
                errors.email
                  ? 'border-red-500 placeholder-red-500 focus:border-red-500 focus:ring-red-500'
                  : 'border-none'
              }`}
              {...register('email')}
            />
            {errors.email && (
              <p className="absolute top-full left-0 mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="relative w-full">
            <LockKeyholeOpen
              className={`absolute top-1/2 left-6 -translate-y-1/2 ${
                errors.password ? 'text-red-500' : 'text-gray-400'
              }`}
            />
            <Input
              type="password"
              placeholder="Senha"
              className={`rounded-full bg-white py-8 pl-15 ${
                errors.password
                  ? 'border-red-500 placeholder-red-500 focus:border-red-500 focus:ring-red-500'
                  : 'border-none'
              }`}
              {...register('password')}
            />
            {errors.password && (
              <p className="absolute top-full left-0 mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-white">
              <Checkbox {...register('remember')} />
              <Label htmlFor="remember">Manter logado</Label>
            </div>
            <Link
              href="#"
              className="ml-auto inline-block text-sm text-white underline-offset-4 hover:underline"
            >
              Esqueceu a senha?
            </Link>
          </div>

          <div className="flex items-center justify-center pt-8">
            <Button
              type="submit"
              className="cursor-pointer px-10 disabled:cursor-not-allowed"
              disabled={isSubmitting}
              variant="secondary"
            >
              Login
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
