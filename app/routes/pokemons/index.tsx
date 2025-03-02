import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/pokemons/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello &quot;/pokemon/&quot;!</div>
}
