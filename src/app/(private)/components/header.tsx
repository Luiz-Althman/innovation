import { Mail, Phone } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

export function HeaderPrivate() {
  return (
    <header className="bg-[#58bd01]">
      <div className="flex w-full items-center justify-between px-6 py-10 md:px-16">
        <h3>LOGO</h3>
        <div className="flex items-center justify-center gap-5">
          <Mail className="text-white" />
          <Phone className="text-white" />
          <div className="flex items-center justify-between gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback>DI</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-center justify-center">
              <p className="font-semibold text-zinc-800">Dinamica</p>
              <p className="text-xs font-semibold text-zinc-800">
                {new Date().toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
