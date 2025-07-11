"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";



export default function LoginPage(){

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: ""
  });


  const onLogin = async() => {
    try {
      if(!user.email || !user.password){
        alert("All fields are required");
        return;
      }

      setLoading(true);
      const response = await axios.post("/api/login", user);
      console.log("Login success", response.data);
      localStorage.setItem("username", response.data.username);
      router.push("/profile");

    } catch (error: unknown) {
      console.log("Login failed : ", error);

    } finally {
      setLoading(false);
    }
  };


  return(
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-3xl mb-5 italic">
          Auth app
        </h1>
        <label htmlFor="email">Email</label>
        <input 
          id="email"
          type="email"
          placeholder="Enter your email"
          value={user.email}
          onChange={(e) => setUser({...user, email: e.target.value})}
          className="bg-gray-100 rounded-lg p-2 w-full"
          />
        <hr />
        <label htmlFor="password">Password</label>
        <input 
          id="password"
          type="password"
          placeholder="Enter your password"
          value={user.password}
          onChange={(e) => setUser({...user, password: e.target.value})}
          className="bg-gray-100 rounded-lg p-2 w-full"
          />
        <hr />
        <hr />
        <button
          onClick={onLogin}
          className="bg-black text-white px-6 py-1.5 rounded-lg hover:bg-gray-800 cursor-pointer"
        >
          {loading ? "Loading..." : "Login"}
        </button>
        <hr />
        <p>
          Don&apos;t have an account? <Link href={"/create-account"} className=" text-blue-500">Sign up</Link>
        </p>
      </div>
    </div>
  );
}