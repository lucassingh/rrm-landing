import { SignIn } from "@clerk/nextjs";
import { AuthSplitLayout } from "../../_components/AuthSplitLayout";
import { clerkAppearance } from "@/lib/clerkAppearance";

export default function SignInPage() {
  return (
    <AuthSplitLayout
      title="Iniciar Sesión"
      subtitle="Ingresa tus credenciales para acceder al sistema"
    >
      <SignIn
        appearance={clerkAppearance}
        routing="path"
        path="/admin/sign-in"
        signUpUrl="/admin/sign-up"
        fallbackRedirectUrl="/admin/news"
      />
    </AuthSplitLayout>
  );
}
