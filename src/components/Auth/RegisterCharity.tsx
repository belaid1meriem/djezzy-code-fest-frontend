import charityImage from "../../assets/login.jpg";
import Header from "../Header";
import RegisterCharityForm  from "./RegisterCharityForm";

export default function RegisterCharity() {
  return (
        <div className="flex flex-col">
      <Header />
      <div className="grid min-h-svh lg:grid-cols-2">
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-xs">
              <RegisterCharityForm />
            </div>
          </div>
        </div>
        <div className="relative hidden bg-muted lg:block">
          <img
            src={charityImage}
            alt="Charity Registration"
            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div>
    </div>
  );
}
