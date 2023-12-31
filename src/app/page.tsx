"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import LoginPage from "@/app/login/page";
import SignupPage from "./signup/page";
import ConcertCard from "./components/concertCard/page";
import VenueCard from "./components/venueCard/page";
import Link from "next/link";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true); // Initialize as loading
  const [data, setData] = useState({
    username: "",
    userId: null,
    userEmail: "",
  });
  const [user, setUser] = React.useState({
    email: "",
    newpassword: "",
  });

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/cookieUser");
      const userData = res.data.data;
      setData({
        username: userData.username,
        userId: userData._id,
        userEmail: userData.email,
      });
      setLoading(false); // Set loading to false after successful data retrieval
    } catch (error: any) {
      console.error(error.message);
      setLoading(false); // Set loading to false on error
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const changePassword = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/reset_password", user);
      console.log("password changed", response.data);
    } catch (error: any) {
      console.log("password change FAILED", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid pt-8">
      {loading ? (
        <h1 className="text-4xl font-bold">Loading...</h1>
      ) : data.username ? (
        <h1 className="text-4xl font-bold">
          Welcome back <span className="brand_purple">{data.username}</span>
        </h1>
      ) : (
        <h1 className="text-2xl md:text-4xl font-bold">
          Experience <span className="brand_purple">Copenhagen</span> through{" "}
          <span className="brand_purple">live music</span>
        </h1>
      )}
      <div className="">
        <LoginPage />
      </div>
      <div>
        <SignupPage />
      </div>

      {/* Concerts */}
      <section className="pt-24 pb-4  md:h-[600px]">
        <h2 className="font-bold text-xl pb-8">
          Concerts you need to experience
        </h2>
        <div className="flex md:grid grid-cols-4 md:gap-4 overflow-x-scroll no-scrollbar">
          <ConcertCard />
        </div>
        <Link className="justify-end flex items-center" href="/concerts">
          View all concerts
          <SlArrowRight
            className="stroke-gray-600 dark:stroke-[#5311BF] w-4 h-4 pt-1"
            id="arrow_right"
          />
        </Link>
      </section>

      {/* Concerts just for you */}
      <section className="pb-40">
        <h2 className="font-bold text-xl">Concerts just for you</h2>
        <div className="flex gap-4 md:grid grid-cols-4 md:gap-4 overflow-x-scroll no-scrollbar md:height-[300px]">
          {/* <VenueCard /> */}
        </div>
        <Link className="justify-end flex items-center" href="/concerts">
          View all concerts
          <SlArrowRight
            className="stroke-gray-600 dark:stroke-[#5311BF] w-4 h-4 pt-1"
            id="arrow_right"
          />
        </Link>
      </section>

      {/* Venues */}
      <section className="pb-40">
        <h2 className="font-bold text-xl">Venues you need to experience</h2>
        <div className="flex gap-4 md:grid grid-cols-4 md:gap-4 overflow-x-scroll no-scrollbar md:height-[300px]">
          <VenueCard />
        </div>
        <Link
          className="place-self-end flex items-center md:hidden"
          href="/venues"
        >
          View all venues
          <SlArrowRight
            className="stroke-gray-600 dark:stroke-[#5311BF] w-4 h-4 pt-1"
            id="arrow_right"
          />
        </Link>
      </section>
    </div>
  );
}
