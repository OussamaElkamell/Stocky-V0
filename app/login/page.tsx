import { LoginForm } from "@/components/auth/login-form"
import { FuturisticAuthLayout } from "@/components/auth/futuristic-auth-layout"

export default function LoginPage() {
  return (
    <FuturisticAuthLayout title="Connexion" description="Accédez à votre espace Storei">
      <LoginForm />
    </FuturisticAuthLayout>
  )
}
