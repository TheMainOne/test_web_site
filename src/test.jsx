// src/components/aiw/AiwEmbed.jsx
import { useEffect } from "react";

export default function AiwEmbed() {
  useEffect(() => {
    // не подключаем второй раз
    if (document.querySelector('script[data-aiw-loader="1"]')) return;

    // ⚠️ НИЧЕГО не кладём в window.__AIW_CONFIG__ — всё из БД

    const ver = Date.now(); // простой cache-busting
    const s = document.createElement("script");
    s.src = `https://cloudcompliance.duckdns.org/aiw/widget-loader.js?v=${ver}`;
    s.defer = true;
    s.crossOrigin = "anonymous";
    s.setAttribute("data-aiw-loader", "1");

    // лоадеру достаточно знать только где API-хост и чей siteId
    s.setAttribute("data-host", "https://cloudcompliance.duckdns.org");
    s.setAttribute("data-site-id", "ZORKA_SITE_001");

    // опционально (если путь к бандлу не стандартный)
    s.setAttribute("data-src", `https://cloudcompliance.duckdns.org/aiw/widget.js?v=${ver}`);

    document.body.appendChild(s);

    s.onload = () => console.log("[AIW] loader ready (DB config mode)");

    // аккуратный cleanup, если компонент размонтируется
    return () => {
      try { window.__AIW__?.close?.(); } catch {}
      s.remove();
      // удалить корень виджета (по признаку typing-bubble в shadowRoot)
      const hosts = Array.from(document.querySelectorAll("div"))
        .filter(el => el.shadowRoot && el.shadowRoot.querySelector(".aiw-typing-bubble"));
      hosts.forEach(el => el.remove());
      try { delete window.__AIW_LOADED__; } catch {}
    };
  }, []);

  return null; // виджет сам создаёт DOM
}
