import { Plus } from 'lucide-react'
import letsStart from './assets/lets-start-illustration.svg'
import logo from './assets/logo-in-orbit.svg'
import { Button } from './components/ui/button.tsx'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from './components/ui/dialog.tsx'

export function App() {
  return (
    <Dialog>
      <div className="h-screen flex flex-col items-center justify-center gap-8">
        <img src={logo} alt="in.orbit logo" />
        <img src={letsStart} alt="lets start illustration" />
        <p className="text-zinc-300 leading-relaxed max-w-80 text-center">
          Você ainda não cadastrou nenhuma meta, que tal cadastrar um agora
          mesmo?
        </p>

        <DialogTrigger asChild>
          <Button>
            <Plus className="size-4" />
            Cadastrar Meta
          </Button>
        </DialogTrigger>

        <DialogContent>
          <div>
            <p />
          </div>
        </DialogContent>
      </div>
    </Dialog>
  )
}
