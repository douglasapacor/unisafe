import { Button } from "@/src/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/src/components/ui/field";
import { Input } from "@/src/components/ui/input";

export default function Page() {
  return (
    <div className="w-[400px] rounded-md border border-gray-500 p-6">
      <div className="pb-6">Acesse sua conta unisafe</div>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="UserLogin">Login</FieldLabel>
          <Input id="UserLogin" required placeholder="seu-email@exemplo.com" />
        </Field>

        <Field>
          <FieldLabel htmlFor="UserPassword">Senha</FieldLabel>
          <Input
            id="UserPassword"
            required
            placeholder="***********"
            type="password"
          />
        </Field>

        <Field orientation="horizontal">
          <Button className="w-full" type="submit">
            Entrar
          </Button>
        </Field>
      </FieldGroup>
    </div>
  );
}
