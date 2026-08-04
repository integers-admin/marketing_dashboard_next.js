"use client";
import { useEffect, useState } from "react";
import { backend_url } from "../URL";

/*
  useApi — fetch a path off a base URL with a graceful fallback.
  New endpoints (Aadar / Integers) don't exist yet, so failures are
  silent and components fall back to "--". No toast spam on the wall.

  Returns { data, ok, loading }.
*/
export function useApi(path, { base = backend_url, transform, deps = [] } = {}) {
  const [state, setState] = useState({ data: null, ok: true, loading: true });

  useEffect(() => {
    if (!path) return;
    let alive = true;
    (async () => {
      try {
        const res = await fetch(`${base}${path}`, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (alive) setState({ data: transform ? transform(json) : json, ok: true, loading: false });
      } catch {
        if (alive) setState({ data: null, ok: false, loading: false });
      }
    })();
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path, base, ...deps]);

  return state;
}

/* number helpers shared across dashboards */
export const fmt = (value) => {
  const n = Number(value);
  if (!Number.isFinite(n)) return "--";
  if (Math.abs(n) >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(".0", "")}M`;
  if (Math.abs(n) >= 1000) return `${(n / 1000).toFixed(1).replace(".0", "")}k`;
  return `${n}`;
};

export const pct = (cur, prev) => {
  const c = Number(cur);
  const p = Number(prev);
  if (!Number.isFinite(c) || !Number.isFinite(p) || p === 0) return null;
  return ((c - p) / p) * 100;
};
