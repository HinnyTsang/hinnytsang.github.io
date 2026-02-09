"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudRainWind,
  CloudSun,
  Droplets,
  Globe,
  MapPin,
  Snowflake,
  Sun,
  Thermometer,
  Wind,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { WeatherData, WeatherIcon } from "./hooks/use-weather";
import { getCityReminder, useGlobalWeather, weatherCodeToInfo } from "./hooks/use-weather";

// ─── Icon map ───────────────────────────────────────────────────────────────

const iconMap: Record<WeatherIcon, React.ComponentType<{ className?: string }>> = {
  sun: Sun,
  "cloud-sun": CloudSun,
  "cloud-fog": CloudFog,
  "cloud-drizzle": CloudDrizzle,
  "cloud-rain": CloudRain,
  snowflake: Snowflake,
  "cloud-rain-wind": CloudRainWind,
  "cloud-lightning": CloudLightning,
  cloud: Cloud,
};

// ─── Per-city row ───────────────────────────────────────────────────────────

function CityRow({ data }: { data: WeatherData }) {
  const { icon, label } = weatherCodeToInfo(data.weatherCode);
  const IconComponent = iconMap[icon];
  const { city } = data;

  const now = new Date();
  const localTime = now.toLocaleTimeString("en-GB", {
    timeZone: city.timezone,
    hour: "2-digit",
    minute: "2-digit",
  });
  const localDate = now.toLocaleDateString("en-GB", {
    timeZone: city.timezone,
    day: "numeric",
    month: "short",
  });
  const tzParts = new Intl.DateTimeFormat("en-GB", {
    timeZone: city.timezone,
    timeZoneName: "short",
  }).formatToParts(now);
  const tzAbbr = tzParts.find((p) => p.type === "timeZoneName")?.value ?? "";

  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-3 px-4 py-2.5">
      {/* Left: city + weather */}
      <div className="flex items-center gap-3">
        <IconComponent className="h-6 w-6 shrink-0 text-white/60" />
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-medium text-white/80">{city.name}</span>
            <span className="text-[9px] text-white/30">{label}</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-white/35">
            <span>{localDate}</span>
            <span>{localTime}</span>
            <span className="rounded bg-white/5 px-1 py-px text-[8px]">{tzAbbr}</span>
          </div>
        </div>
      </div>

      {/* Right: stats */}
      <div className="flex items-center gap-3">
        <span className="font-mono text-sm font-bold text-white/90">
          {Math.round(data.temperature)}°
        </span>
        <div className="flex items-center gap-0.5 text-[10px] text-white/40">
          <Droplets className="h-3 w-3 text-cyan-400/60" />
          <span>{data.humidity}%</span>
        </div>
        <div className="flex items-center gap-0.5 text-[10px] text-white/40">
          <Wind className="h-3 w-3 text-white/40" />
          <span>{Math.round(data.windSpeed)}</span>
        </div>
        {data.rainfall > 0 && (
          <div className="flex items-center gap-0.5 text-[10px] text-blue-400/60">
            <CloudRain className="h-3 w-3" />
            <span>{data.rainfall.toFixed(1)}</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main card ──────────────────────────────────────────────────────────────

/**
 * Global weather view — live conditions for Hong Kong, London, and New York.
 * Data from Open-Meteo (free, no API key).
 */
export function WeatherCard() {
  const { data, loading, error } = useGlobalWeather();
  const [reminderIdx, setReminderIdx] = useState(0);

  const reminders = data.map((d) => getCityReminder(d));

  useEffect(() => {
    if (reminders.length <= 1) return;
    const interval = setInterval(() => {
      setReminderIdx((prev) => (prev + 1) % reminders.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [reminders.length]);

  if (loading) {
    return (
      <div className="flex h-52 w-full items-center justify-center rounded-xl border border-white/10 bg-black/40 backdrop-blur-sm">
        <div className="flex items-center gap-2 text-xs text-white/40">
          <Globe className="h-4 w-4 animate-pulse" />
          <span>Fetching global weather...</span>
        </div>
      </div>
    );
  }

  if (error || data.length === 0) {
    return (
      <div className="flex h-52 w-full items-center justify-center rounded-xl border border-white/10 bg-black/40 backdrop-blur-sm">
        <p className="text-xs text-white/30">Weather unavailable</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-xl border border-white/10 bg-black/40 shadow-2xl backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center justify-between gap-1.5 border-b border-white/10 px-4 py-2">
        <div className="flex items-center gap-1">
          <MapPin className="h-3 w-3 text-white/40" />
          <span className="text-[10px] font-medium text-white/50">Global Weather</span>
        </div>
        <span className="text-[10px] font-medium text-white/50">
          <Link href="https://open-meteo.com" target="_blank">
            Powered by Open-Meteo
          </Link>
        </span>
      </div>

      {/* City rows */}
      <div className="divide-y divide-white/5">
        {data.map((d) => (
          <CityRow key={d.city.name} data={d} />
        ))}
      </div>

      {/* Cycling reminder */}
      <div className="relative flex items-center gap-2 overflow-hidden border-t border-white/10 px-4 py-2">
        <Thermometer className="h-3.5 w-3.5 shrink-0 text-amber-400/60" />
        <div className="relative h-4 flex-1">
          <AnimatePresence mode="wait">
            <motion.p
              key={reminderIdx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 text-[10px] leading-4 text-white/50"
            >
              {reminders[reminderIdx]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
