import { useEffect, useMemo, useState } from "react";
import "./InlineHostPlayground.css";

/**
 * Простой playground, который показывает, как inline-iframe виджет
 * реагирует на разные размеры контейнера и режимы fit.
 *
 * Вставьте компонент в любую React‑страницу, чтобы быстро проверить,
 * как iframe занимает родительский блок.
 */
// Встраивает iframe-режим виджета в переданный контейнер
const InlineAIW = ({
  siteId = "ZORKA_SITE_001",
  targetId = "zorka-chat-slot",
  height = 620,        // реально нужен только для fit="content"
  fit = "container",   // "container" | "content"
}) => {
  useEffect(() => {
    // если скрипт уже есть — удаляем, чтобы не было дубликатов/старых настроек
    const existing = document.querySelector(
      `script[data-aiw-inline="${targetId}"]`
    );
    if (existing) existing.remove();

    const script = document.createElement("script");
    script.defer = true;
    script.src = "https://cloudcompliance.duckdns.org/aiw/widget-loader.js";
    script.setAttribute("data-host", "https://cloudcompliance.duckdns.org");
    script.setAttribute("data-site-id", siteId);
    script.setAttribute("data-mode", "inline");
    script.setAttribute("data-target", `#${targetId}`);
    script.setAttribute("data-height", String(height));
    script.setAttribute("data-fit", fit);
    script.setAttribute("data-aiw-inline", targetId);
    document.body.appendChild(script);

    return () => {
      const toRemove = document.querySelector(
        `script[data-aiw-inline="${targetId}"]`
      );
      if (toRemove) toRemove.remove();

      const slot = document.getElementById(targetId);
      if (slot) slot.innerHTML = "";
    };
  }, [fit, height, siteId, targetId]);

  // Для fit="container" секция и слот должны растягиваться на 100%
  const sectionStyle =
    fit === "container" ? { height: "100%" } : undefined;

  const slotStyle =
    fit === "container"
      ? { width: "100%", height: "100%" }
      : undefined;

  return (
    <div className="aiw-inline-section" style={sectionStyle}>
      <div
        id={targetId}
        className="aiw-inline-slot"
        data-fit={fit}
        style={slotStyle}
        aria-live="polite"
      />
    </div>
  );
};


const px = (value) => `${value}px`;

const InlineHostPlayground = () => {
  const [fit, setFit] = useState("container");
  const [hostWidth, setHostWidth] = useState(420);
  const [hostHeight, setHostHeight] = useState(520);
  const [contentHeight, setContentHeight] = useState(520);
  const [stretchParent, setStretchParent] = useState(true);

  const slotId = useMemo(() => `zorka-inline-slot-${fit}`, [fit]);
  const loaderHeight = fit === "content" ? Math.max(200, contentHeight) : 520;

  const hostStyle = useMemo(() => {
    if (fit === "container") {
      return {
        width: px(hostWidth),
        height: px(hostHeight),
      };
    }
    return { width: px(hostWidth) };
  }, [fit, hostHeight, hostWidth]);

  const slotStyle = useMemo(() => {
    if (fit === "container") {
      return {
        width: "100%",
        height: "100%",
      };
    }
    return undefined;
  }, [fit]);

  const viewportStyle = useMemo(() => {
    if (!stretchParent) return undefined;
    const base = fit === "container" ? hostHeight : contentHeight;
    return { minHeight: px(base + 80) };
  }, [stretchParent, fit, hostHeight, contentHeight]);

  return (
    <main className="inline-host-playground">
      <header className="inline-playground-header">
        <h1>Inline iframe playground</h1>
        <p>
          Переключайте режимы <code>fit</code> и размеры контейнера, чтобы
          убедиться, что iframe растягивается и заполняет родителя.
        </p>
      </header>

      <section className="inline-demo-panel">
        <div className="inline-demo-controls">
          <label className="control">
            <span>Fit mode</span>
            <select value={fit} onChange={(e) => setFit(e.target.value)}>
              <option value="container">container (занимает родителя)</option>
              <option value="content">content (высота по контенту)</option>
            </select>
          </label>

          <label className="control">
            <span>Parent width: {px(hostWidth)}</span>
            <input
              type="range"
              min="280"
              max="800"
              step="10"
              value={hostWidth}
              onChange={(e) => setHostWidth(Number(e.target.value))}
            />
          </label>

          {fit === "container" ? (
            <label className="control">
              <span>Parent height: {px(hostHeight)}</span>
              <input
                type="range"
                min="300"
                max="800"
                step="10"
                value={hostHeight}
                onChange={(e) => setHostHeight(Number(e.target.value))}
              />
            </label>
          ) : (
            <label className="control">
              <span>Минимальная высота контента: {px(contentHeight)}</span>
              <input
                type="range"
                min="300"
                max="800"
                step="10"
                value={contentHeight}
                onChange={(e) => setContentHeight(Number(e.target.value))}
              />
            </label>
          )}

          <label className="control checkbox">
            <input
              type="checkbox"
              checked={stretchParent}
              onChange={(e) => setStretchParent(e.target.checked)}
            />
            <span>Родитель = flex-контейнер высотой 100%</span>
          </label>
        </div>

        <div
          className={`inline-demo-viewport ${
            stretchParent ? "is-flex" : ""
          }`}
          style={viewportStyle}
        >
          <div className="inline-demo-host" style={hostStyle}>
  <InlineAIW
    siteId="ZORKA_SITE_001"
    targetId="zorka-chat-slot"
    fit="container"
    height={520} // на container особо не влияет, но можно оставить
  />
          </div>
        </div>
      </section>
    </main>
  );
};

export default InlineHostPlayground;