import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { request } from "@/admin/api";

interface ViewStats { slug: string; total: number; last7: number; last30: number; a: number; b: number; }
interface DailyRow  { date: string; total: number; a: number; b: number; }
interface Conversion { slug: string; variant: string | null; leads: number; }

export default function AdminAnalyticsPage() {
  const [stats, setStats] = useState<ViewStats[]>([]);
  const [daily, setDaily] = useState<DailyRow[]>([]);
  const [conversions, setConversions] = useState<Conversion[]>([]);
  const [days, setDays] = useState<number>(30);
  const [selectedSlug, setSelectedSlug] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      request<ViewStats[]>("GET", "/api/page-views/stats"),
      request<DailyRow[]>("GET", `/api/page-views/daily?days=${days}${selectedSlug ? `&slug=${encodeURIComponent(selectedSlug)}` : ""}`),
      request<Conversion[]>("GET", "/api/contacts/conversions"),
    ]).then(([s, d, c]) => {
      setStats(s ?? []);
      setDaily(d ?? []);
      setConversions(c ?? []);
    }).catch(() => {}).finally(() => setLoading(false));
  }, [days, selectedSlug]);

  // Lookup leads cho 1 slug+variant (variant null khi page không A/B test)
  function leadsFor(slug: string, variant: "A" | "B" | null): number {
    return conversions
      .filter((c) => c.slug === slug && (variant === null ? !c.variant : c.variant === variant))
      .reduce((s, c) => s + c.leads, 0);
  }
  function rate(leads: number, views: number): string {
    if (views === 0) return "—";
    return `${((leads / views) * 100).toFixed(1)}%`;
  }

  const totalAll = stats.reduce((s, r) => s + r.total, 0);
  const totalLast7 = stats.reduce((s, r) => s + r.last7, 0);
  const totalLast30 = stats.reduce((s, r) => s + r.last30, 0);
  const totalLeads = conversions.reduce((s, c) => s + c.leads, 0);
  const overallCr = totalAll > 0 ? `${((totalLeads / totalAll) * 100).toFixed(1)}%` : "—";
  const topPage = [...stats].sort((a, b) => b.last7 - a.last7)[0];
  const maxDaily = Math.max(1, ...daily.map((d) => d.total));

  return (
    <div className="adm-root">
      <div className="adm-page-header">
        <div className="adm-page-header__title">
          <h1 className="adm-h1">Analytics — Trang tùy biến</h1>
          <p className="adm-muted">Lượt xem trang theo thời gian. Có A/B variant nếu trang bật A/B test.</p>
        </div>
        <Link to="/admin/pages" className="adm-btn adm-btn--outline">← Trang tùy biến</Link>
      </div>

      {/* Summary cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 12, marginBottom: 20 }}>
        <Card label="Tổng lượt xem" value={totalAll.toLocaleString("vi-VN")} />
        <Card label="7 ngày qua"     value={totalLast7.toLocaleString("vi-VN")} />
        <Card label="30 ngày qua"    value={totalLast30.toLocaleString("vi-VN")} />
        <Card label="Tổng leads"    value={totalLeads.toLocaleString("vi-VN")} sub={`Conv. rate ${overallCr}`} />
        <Card label="Top page (7d)"  value={topPage ? `${topPage.slug}` : "—"} sub={topPage ? `${topPage.last7} views` : ""} />
      </div>

      {/* Chart */}
      <div className="adm-card" style={{ marginBottom: 20 }}>
        <div className="adm-card__header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
          <h2 className="adm-h2" style={{ margin: 0 }}>
            Lượt xem theo ngày
            {selectedSlug && <span className="adm-muted" style={{ fontSize: 14, marginLeft: 8 }}>· {selectedSlug}</span>}
          </h2>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {selectedSlug && (
              <button className="adm-btn adm-btn--outline adm-btn--sm" onClick={() => setSelectedSlug("")}>← Tất cả trang</button>
            )}
            <select className="adm-select" value={days} onChange={(e) => setDays(Number(e.target.value))} style={{ height: 30 }}>
              <option value={7}>7 ngày</option>
              <option value={30}>30 ngày</option>
              <option value={90}>90 ngày</option>
            </select>
          </div>
        </div>
        <div className="adm-card__content">
          {loading ? <p className="adm-muted">Đang tải…</p> : (
            <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 200, padding: "8px 0" }}>
              {daily.map((d) => {
                const pct = (d.total / maxDaily) * 100;
                const pctA = d.total > 0 ? (d.a / d.total) * pct : 0;
                const pctB = d.total > 0 ? (d.b / d.total) * pct : 0;
                const hasAB = d.a > 0 || d.b > 0;
                return (
                  <div key={d.date} title={`${d.date}: ${d.total} views${hasAB ? ` (A: ${d.a}, B: ${d.b})` : ""}`}
                       style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", minHeight: 1, cursor: "default" }}>
                    {hasAB ? (
                      <>
                        <div style={{ background: "#e63946", height: `${pctA}%`, minHeight: d.a ? 1 : 0 }} />
                        <div style={{ background: "#fbbf24", height: `${pctB}%`, minHeight: d.b ? 1 : 0 }} />
                      </>
                    ) : (
                      <div style={{ background: "#3b82f6", height: `${pct}%`, minHeight: d.total ? 1 : 0 }} />
                    )}
                  </div>
                );
              })}
            </div>
          )}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4, fontSize: 11, color: "#777" }}>
            <span>{daily[0]?.date}</span>
            <span>{daily[daily.length - 1]?.date}</span>
          </div>
          <div style={{ display: "flex", gap: 16, marginTop: 8, fontSize: 12, color: "#555" }}>
            <Legend color="#3b82f6" label="Tổng" />
            <Legend color="#e63946" label="Variant A" />
            <Legend color="#fbbf24" label="Variant B" />
          </div>
        </div>
      </div>

      {/* Per-page table */}
      <div className="adm-table-wrap">
        <table className="adm-table">
          <thead>
            <tr>
              <th>Slug</th>
              <th style={{ width: 90 }}>Views</th>
              <th style={{ width: 90 }}>Leads</th>
              <th style={{ width: 90 }}>Conv. rate</th>
              <th style={{ width: 130 }}>A — views/leads/CR</th>
              <th style={{ width: 130 }}>B — views/leads/CR</th>
              <th style={{ width: 100 }}>Winner</th>
              <th style={{ width: 110 }}></th>
            </tr>
          </thead>
          <tbody>
            {!loading && [...stats].sort((a, b) => b.last7 - a.last7).map((r) => {
              const abTotal = r.a + r.b;
              const leadsTotal = leadsFor(r.slug, null) + leadsFor(r.slug, "A") + leadsFor(r.slug, "B");
              const leadsA = leadsFor(r.slug, "A");
              const leadsB = leadsFor(r.slug, "B");
              const crA = r.a > 0 ? (leadsA / r.a) : 0;
              const crB = r.b > 0 ? (leadsB / r.b) : 0;
              // Winner cần đủ samples (>= 30 views/variant) để tránh kết luận từ data nhỏ
              const hasMinSamples = r.a >= 30 && r.b >= 30;
              let winner: "A" | "B" | "—" = "—";
              if (abTotal > 0 && hasMinSamples) {
                if (crA > crB * 1.05) winner = "A";
                else if (crB > crA * 1.05) winner = "B";
              }
              return (
                <tr key={r.slug}>
                  <td><code>/p/{r.slug}</code></td>
                  <td className="adm-mono">{r.total.toLocaleString("vi-VN")}</td>
                  <td className="adm-mono">{leadsTotal}</td>
                  <td className="adm-mono"><strong>{rate(leadsTotal, r.total)}</strong></td>
                  <td className="adm-mono">
                    {abTotal ? <>{r.a} / {leadsA} / <strong>{rate(leadsA, r.a)}</strong></> : "—"}
                  </td>
                  <td className="adm-mono">
                    {abTotal ? <>{r.b} / {leadsB} / <strong>{rate(leadsB, r.b)}</strong></> : "—"}
                  </td>
                  <td>
                    {winner === "—"
                      ? <span className="adm-muted">{abTotal && !hasMinSamples ? "cần data" : "—"}</span>
                      : <span className="adm-badge adm-badge--success">🏆 {winner}</span>}
                  </td>
                  <td>
                    <button className="adm-btn adm-btn--ghost adm-btn--sm" onClick={() => setSelectedSlug(r.slug)}>
                      Xem chart
                    </button>
                  </td>
                </tr>
              );
            })}
            {!loading && stats.length === 0 && (
              <tr><td colSpan={8} className="adm-table-empty">Chưa có view nào. Truy cập một trang tùy biến đã publish để bắt đầu ghi nhận.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Card({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="adm-card" style={{ padding: 16 }}>
      <div className="adm-muted" style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</div>
      <div style={{ fontSize: 24, fontWeight: 700, marginTop: 4 }}>{value}</div>
      {sub && <div className="adm-muted" style={{ fontSize: 12 }}>{sub}</div>}
    </div>
  );
}
function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
      <span style={{ width: 10, height: 10, background: color, borderRadius: 2 }} />
      {label}
    </span>
  );
}
