"use client";

import { useEffect, useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

export type CityConfig = {
  name: string;
  lat: number;
  lon: number;
  timezone: string;
};

export type WeatherData = {
  city: CityConfig;
  temperature: number; // °C
  humidity: number; // %
  rainfall: number; // mm (next 3h cumulative)
  weatherCode: number; // WMO weather code
  windSpeed: number; // km/h
  isDay: boolean;
  time: string;
};

// ─── Cities ─────────────────────────────────────────────────────────────────

export const CITIES: CityConfig[] = [
  { name: "Hong Kong", lat: 22.3193, lon: 114.1694, timezone: "Asia/Hong_Kong" },
  { name: "London", lat: 51.5074, lon: -0.1278, timezone: "Europe/London" },
  { name: "New York", lat: 40.7128, lon: -74.006, timezone: "America/New_York" },
];

// ─── Open-Meteo API (free, no key required) ─────────────────────────────────

function buildUrl(city: CityConfig): string {
  return (
    `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}` +
    "&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m,is_day" +
    "&hourly=precipitation" +
    "&forecast_hours=3" +
    `&timezone=${encodeURIComponent(city.timezone)}`
  );
}

function parseResponse(json: Record<string, unknown>, city: CityConfig): WeatherData {
  const current = json.current as Record<string, unknown>;
  const hourly = json.hourly as Record<string, unknown> | undefined;
  const hourlyPrecip: number[] = (hourly?.precipitation as number[]) ?? [];
  const rainfall3h = hourlyPrecip.slice(0, 3).reduce((sum, v) => sum + v, 0);

  return {
    city,
    temperature: current.temperature_2m as number,
    humidity: current.relative_humidity_2m as number,
    rainfall: rainfall3h,
    weatherCode: current.weather_code as number,
    windSpeed: current.wind_speed_10m as number,
    isDay: current.is_day === 1,
    time: current.time as string,
  };
}

// ─── Hook — fetches all cities in parallel ──────────────────────────────────

export function useGlobalWeather(): {
  data: WeatherData[];
  loading: boolean;
  error: string | null;
} {
  const [data, setData] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchAll() {
      try {
        const results = await Promise.all(
          CITIES.map(async (city) => {
            const res = await fetch(buildUrl(city));
            if (!res.ok) throw new Error(`Weather API ${res.status} for ${city.name}`);
            const json = await res.json();
            return parseResponse(json, city);
          }),
        );

        if (!cancelled) setData(results);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to fetch weather");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchAll();
    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading, error };
}

// ─── Weather code helpers ───────────────────────────────────────────────────

export type WeatherIcon =
  | "sun"
  | "cloud-sun"
  | "cloud-fog"
  | "cloud-drizzle"
  | "cloud-rain"
  | "snowflake"
  | "cloud-rain-wind"
  | "cloud-lightning"
  | "cloud";

export function weatherCodeToInfo(code: number): { icon: WeatherIcon; label: string } {
  if (code === 0) return { icon: "sun", label: "Clear sky" };
  if (code <= 3) return { icon: "cloud-sun", label: "Partly cloudy" };
  if (code <= 49) return { icon: "cloud-fog", label: "Foggy" };
  if (code <= 59) return { icon: "cloud-drizzle", label: "Drizzle" };
  if (code <= 69) return { icon: "cloud-rain", label: "Rain" };
  if (code <= 79) return { icon: "snowflake", label: "Snow" };
  if (code <= 84) return { icon: "cloud-rain-wind", label: "Rain showers" };
  if (code <= 89) return { icon: "snowflake", label: "Snow showers" };
  if (code <= 99) return { icon: "cloud-lightning", label: "Thunderstorm" };
  return { icon: "cloud", label: "Unknown" };
}

/** Generate a per-city reminder based on its conditions */
export function getCityReminder(data: WeatherData): string {
  const { city } = data;

  if (data.weatherCode >= 61 || data.rainfall > 2) {
    return `Rain in ${city.name} — pack an umbrella!`;
  }
  if (data.weatherCode >= 51 && data.weatherCode <= 59) {
    return `Light drizzle in ${city.name} — a jacket might help.`;
  }
  if (data.temperature < 5) {
    return `Freezing in ${city.name} — bundle up!`;
  }
  if (data.temperature < 12) {
    return `Chilly in ${city.name} — grab a warm layer.`;
  }
  if (data.temperature > 30) {
    return `It's hot in ${city.name} — stay hydrated!`;
  }
  if (data.humidity > 85) {
    return `Very humid in ${city.name} — dress light.`;
  }
  if (data.windSpeed > 40) {
    return `Strong winds in ${city.name} — hold on tight!`;
  }
  if (data.weatherCode <= 3 && data.isDay) {
    return `Lovely weather in ${city.name} — enjoy!`;
  }
  return `Have a great day in ${city.name}!`;
}
