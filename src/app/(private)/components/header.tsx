import { Mail, Phone } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function HeaderPrivate() {
  return (
    <header className="bg-[#58bd01]">
      <div className="flex w-full items-center justify-between px-6 py-10">
        <h3>LOGO</h3>
        <div className="flex items-center justify-center gap-5">
          <Mail className="text-white" />
          <Phone className="text-white" />
          <div className="flex items-center justify-between gap-3">
            <Avatar className="h-15 w-15">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-center justify-center">
              <p className="text-white">Dinamica</p>
              <p className="text-sm text-white">
                {new Date().toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
