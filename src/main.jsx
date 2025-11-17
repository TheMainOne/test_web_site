import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Contacts from './components/contacts/contacts.jsx';
import Terms from './components/terms/terms.jsx';
import AiwEmbed from './test.jsx';
import InlineHostPlayground from './components/InfluencerMarketingPage.jsx';




createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        {/* Виджет загрузится один раз и будет доступен на всех маршрутах */}
    {/* <AiwEmbed /> */}
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/terms" element={<Terms />} />
         <Route path="/influencer" element={<InlineHostPlayground />} />

      </Routes>
    </HashRouter>
  </React.StrictMode>
)
