"use client";

import { useState, useEffect } from "react";
import SettingsIndicatorRow, { SystemIndicator } from "./components/SettingsIndicatorRow";
import LoadingSpinner from "./components/LoadingSpinner";
import getActuatorData from "./actions/getActuatorData";
import postActuatorData from "./actions/postActuatorData";
import LogoutButton from "./components/LogOutButton";
import { manrope } from "../layout";

export interface SystemIndicatorProps {
  healthIndicators: SystemIndicator[];
}

export default function SettingsPage() {
  const [data, setData] = useState<SystemIndicatorProps>({ healthIndicators: [] });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getActuatorData();

        const resultWithToggle: SystemIndicatorProps = {
          healthIndicators: result.healthIndicators.map((indicator, index) => ({
            ...indicator,
            onToggle: () =>
              handleToggle(
                index,
                indicator.name === "Ventilation System" ? "vent" : "pump"
              ),
          })),
        };

        setData(resultWithToggle);
      } catch (err) {
        console.error("Failed to fetch actuator data:", err);
      } finally {
        setIsLoaded(true);
      }
    };

    fetchData();
  }, []);

  const handleToggle = async (index: number, eventName: string) => {
    try {
      // Optimistic update
      setData((prev) => {
        const updatedIndicators = [...prev.healthIndicators];
        const indicator = updatedIndicators[index];
        const newIsActive = !indicator.isActive;

        updatedIndicators[index] = {
          ...indicator,
          isActive: newIsActive,
          status: newIsActive ? "Active" : "Inactive",
          onToggle: indicator.onToggle,
        };

        return { healthIndicators: updatedIndicators };
      });

      await postActuatorData(eventName); // Backend update
    } catch (err) {
      console.error("Failed to toggle actuator:", err);
    }
  };

  if (!isLoaded) return <LoadingSpinner />;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1
        className={`text-4xl md:text-5xl font-bold text-white my-8 md:my-10 tracking-tight ${manrope.className}`}
      >
        Settings
      </h1>

      <h2 className={`text-base md:text-xl text-gray-400 mb-12 md:mb-16 ${manrope.className}`}>
        Manage your compost bin settings and preferences here.
      </h2>

      {/* SYSTEM CONTROLS */}
      <section className="mb-10 md:mb-14">
        <h2
          className={`text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 ${manrope.className}`}
        >
          System Controls
        </h2>
        <hr className="h-px bg-[#6C786A]/40 border-0 mb-4" />

        <div className="divide-y divide-[#6C786A]/40">
          {data.healthIndicators.map((indicator, index) => (
            <SettingsIndicatorRow
              key={index}
              index={index}
              indicator={indicator}
            />
          ))}
        </div>
      </section>

      {/* ACCOUNT CONTROLS */}
      <section className="mb-10 md:mb-14">
        <h2
          className={`text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 ${manrope.className}`}
        >
          Account Controls
        </h2>
        <hr className="h-px bg-[#6C786A]/40 border-0 mb-4" />

        <LogoutButton />
      </section>
      <div className="h-0 md:h-36 lg:h-0"></div>

    </div>
  );
}
