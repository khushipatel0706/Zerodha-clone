import React from "react";

const apps = [
  {
    name: "Console",
    desc: "Central dashboard for your account: reports, P&L, tax statements and ledger.",
    url: "https://console.zerodha.com",
  },
  {
    name: "Coin",
    desc: "Buy direct mutual funds online, commission free.",
    url: "https://coin.zerodha.com",
  },
  {
    name: "Kite Connect",
    desc: "Build your own trading apps using the Kite trading APIs.",
    url: "https://kite.trade",
  },
  {
    name: "Varsity",
    desc: "Free, easy to follow lessons on stock markets and investing.",
    url: "https://zerodha.com/varsity",
  },
  {
    name: "Streak",
    desc: "Create, backtest and deploy algo trading strategies without coding.",
    url: "https://streak.tech",
  },
  {
    name: "Sensibull",
    desc: "Options trading platform with strategy builder and analytics.",
    url: "https://sensibull.com",
  },
  {
    name: "Smallcase",
    desc: "Invest in themed baskets of stocks and ETFs.",
    url: "https://smallcase.com",
  },
  {
    name: "Ditto",
    desc: "Insurance advice and plans, with no commissions or sales pressure.",
    url: "https://joinditto.in",
  },
];

const Apps = () => {
  return (
    <>
      <h3 className="title">Apps ({apps.length})</h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {apps.map((app) => (
          <div
            key={app.name}
            style={{
              border: "1px solid #e0e0e0",
              borderRadius: "6px",
              padding: "18px",
              background: "#fff",
            }}
          >
            <h4 style={{ margin: "0 0 8px 0" }}>{app.name}</h4>
            <p style={{ fontSize: "14px", color: "#666", minHeight: "60px" }}>
              {app.desc}
            </p>
            <a
              href={app.url}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-block",
                padding: "6px 14px",
                background: "#387ed1",
                color: "#fff",
                textDecoration: "none",
                borderRadius: "3px",
                fontSize: "14px",
              }}
            >
              Open
            </a>
          </div>
        ))}
      </div>
    </>
  );
};

export default Apps;