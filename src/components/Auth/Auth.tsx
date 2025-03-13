import { Link } from "react-router";
import { Building, HeartHandshake } from "lucide-react";
import Header from "../Header";
import {
  Card,
  CardHeader,
  CardTitle,
} from "../ui/card";

function Auth() {
  return (
    <div className="flex flex-col gap-12 min-h-screen items-center">
      <Header />
      <div className="flex-1 flex flex-col gap-6 text-center">
        <h1 className="text-3xl font-semibold">
          Join <span className="text-7xl font-semibold font-logo px-4">سبيل</span> as
        </h1>

        <div className="flex justify-center items-center gap-10 p-6 max-sm:flex-col">
          {/* Volunteer Card */}
          <Link to="/register/volunteer">
            <Card className="w-3xs transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <CardHeader className="flex items-center justify-center flex-col gap-4">
                <CardTitle className="text-primary">
                  <HeartHandshake className="w-24 h-24" />
                </CardTitle>
                <CardTitle className="text-2xl font-semibold">Volunteer</CardTitle>
              </CardHeader>
            </Card>
          </Link>

          {/* Organisation Card */}
          <Link to="/register/organization">
            <Card className="w-3xs transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <CardHeader className="flex items-center justify-center flex-col gap-4">
                <CardTitle className="text-primary">
                  <Building className="w-24 h-24" />
                </CardTitle>
                <CardTitle className="text-2xl font-semibold">Organisation</CardTitle>
              </CardHeader>
            </Card>
          </Link>
        </div>
        <p className="text-sm ">
          Already have an account? <Link to="/login"className="hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Auth;
