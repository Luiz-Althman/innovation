import { CardAuth } from './card-auth'

export const generateMetadata = () => ({
  title: 'Innovation Brindes | Login',
  description:
    'Acesse sua conta na Innovation Brindes e descubra soluções personalizadas em brindes corporativos e promocionais de alta qualidade.',
})

export default async function SignIn() {
  return (
    <div className="bg-login h-screen">
      <div className="flex h-screen flex-col items-center justify-center space-y-8 px-6 py-12">
        <h1 className="text-2xl font-bold text-[#58bd01] md:text-4xl">
          Bem-vindo a Innovation Brindes
        </h1>
        <CardAuth />
      </div>
    </div>
  )
}
