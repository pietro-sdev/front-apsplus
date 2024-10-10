import LoginForm from "@/components/auth/login-form";
import { Logo } from "@/components/ui/logo";
import "bootstrap-icons/font/bootstrap-icons.css"; // Certifique-se de importar o CSS dos ícones

export default function Page() {
  return (
    <div className="flex max-w-[1500px] h-screen">
      {/* Left section: Login form */}
      <div className="w-full max-w-md lg:w-1/2 bg-white flex flex-col justify-center items-center px-2 py-1 mx-auto">
        <Logo size={160} />
        <h2 className="mt-4 text-center text-xl font-semibold">
          Faça o login em sua conta
        </h2>
        <LoginForm />
      </div>

      {/* Right section: Illustration */}
      <div className="lg:w-1/2 lg:flex hidden bg-gray-100 justify-center items-center">
        <img
          src="/login-illustrator.svg"
          alt="Login illustration"
          className="w-2/3 size-[500px]"
        />
      </div>
    </div>
  );
}
