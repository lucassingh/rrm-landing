import { SignUp } from "@clerk/nextjs";
import { AuthSplitLayout } from "../../_components/AuthSplitLayout";
import { clerkAppearance } from "@/lib/clerkAppearance";

export default function SignUpPage() {
  return (
    <AuthSplitLayout
      title="Crear cuenta"
      subtitle="Registrate para acceder al panel de administración"
    >
      <SignUp
        appearance={clerkAppearance}
        routing="path"
        path="/admin/sign-up"
        signInUrl="/admin/sign-in"
        fallbackRedirectUrl="/admin/news"
      />
    </AuthSplitLayout>
  );
}
