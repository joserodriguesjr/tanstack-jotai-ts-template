import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(pokemons)/pokemons/types')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello &quot;/(pokemons)/pokemons_/types&quot;!</div>;
}
