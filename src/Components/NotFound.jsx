import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound({ isLogin }) {
  const navigate = useNavigate();
  const [count, setCount] = useState(3);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLogin) {
        navigate("/page");
      } else {
        navigate("/");
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isLogin, navigate]);

  setTimeout(()=>setCount(count - 1),990)
  return (
    <div className="h-screen backdrop-brightness-50 w-screen flex flex-col justify-center items-center text-white">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-4">Page Not Found</p>
      <p className="text-gray-400">
        Redirecting you {isLogin ? "to your dashboard" : "to home"} in {count} {" "}
         seconds...
      </p>
    </div>
  );
}
