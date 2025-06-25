import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(pokemons)/pokemons/about')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello &quot;/(pokemons)/about&quot;!</div>;
}
