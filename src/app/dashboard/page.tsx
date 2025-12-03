"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";

import {
  Menu,
  Home,
  PieChart,
  FileText,
  Settings,
  LogOut,
  ChevronLeft,
  Search as SearchIcon,
} from "lucide-react";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [active, setActive] = useState("overview");
  const [query, setQuery] = useState("");
  const [kpis, setKpis] = useState({
    recettes: 0,
    depenses: 0,
    solde: 0,
    growth: 0,
  });

  useEffect(() => {
    async function load() {
      const fake = await new Promise((res) =>
        setTimeout(
          () =>
            res({
              recettes: 123540000,
              depenses: 94500000,
              solde: 29040000,
              growth: 0.054,
            }),
          400
        )
      );
      setKpis(fake);
    }

    load();
  }, []);

  const fmt = (n) => n?.toLocaleString() ?? "—";

  const menu = [
    { id: "overview", label: "Overview", icon: Home },
    { id: "details", label: "Details", icon: FileText },
    { id: "forecast", label: "Forecast", icon: PieChart },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen flex bg-[#071022] text-white">

      {/* Sidebar */}
      <aside
        className={`transition-all duration-300 bg-[#0b1220] border-r border-[#0f1720] p-4 ${
          sidebarOpen ? "w-64" : "w-16"
        }`}
      >
        {/* Top section */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div
              className={`rounded-xl p-2 bg-gradient-to-br from-slate-800 to-slate-700 ${
                sidebarOpen ? "block" : "hidden"
              }`}
            >
              <PieChart className="w-6 h-6" />
            </div>
            {sidebarOpen && (
              <div>
                <h2 className="text-lg font-semibold">IUGB Budget</h2>
                <p className="text-xs text-slate-400">Dashboard</p>
              </div>
            )}
          </div>

          {/* Toggle button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen((s) => !s)}
            className="hover:bg-slate-800"
          >
            <ChevronLeft
              className={`transition-transform ${
                sidebarOpen ? "" : "rotate-180"
              }`}
            />
          </Button>
        </div>

        {/* Menu */}
        <nav className="flex flex-col gap-1">
          {menu.map((m) => {
            const Icon = m.icon;
            const isActive = active === m.id;

            return (
              <button
                key={m.id}
                onClick={() => setActive(m.id)}
                className={`group flex items-center gap-3 w-full text-left rounded-lg px-3 py-2 hover:bg-[#11202b] transition-colors ${
                  isActive ? "bg-[#163043] shadow" : ""
                }`}
              >
                <Icon className="w-5 h-5 text-slate-300" />
                {sidebarOpen && <span className="flex-1">{m.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="mt-6 border-t border-[#0f1720] pt-4">
          <button className="flex items-center gap-3 w-full rounded-lg px-3 py-2 hover:bg-[#11202b] transition-colors">
            <LogOut className="w-5 h-5 text-slate-300" />
            {sidebarOpen && "Se déconnecter"}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => setSidebarOpen((s) => !s)}
              className="md:hidden"
            >
              <Menu />
            </Button>

            <div>
              <h1 className="text-2xl font-semibold">Prédictions budgétaires</h1>
              <p className="text-sm text-slate-400">
                Visualisation historique et prévisions
              </p>
            </div>
          </div>

          {/* Search + Export */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Rechercher..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 min-w-[260px] bg-[#071828] border-[#10202a] text-white"
              />
            </div>
            <Button>Export</Button>
          </div>
        </header>

        {/* KPI Row */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {/* KPI card repeated 4 times */}
          {[
            { label: "Recettes", value: `${fmt(kpis.recettes)} CFA` },
            { label: "Dépenses", value: `${fmt(kpis.depenses)} CFA` },
            { label: "Solde", value: `${fmt(kpis.solde)} CFA` },
            {
              label: "Croissance",
              value: `${(kpis.growth * 100).toFixed(2)}%`,
            },
          ].map((k, i) => (
            <Card
              key={i}
              className="bg-[#06121a] border border-[#0f1720] p-4"
            >
              <p className="text-sm text-slate-300">{k.label}</p>
              <p className="text-2xl font-bold mt-2">{k.value}</p>
            </Card>
          ))}
        </section>

        {/* Tabs */}
        <section>
          <Tabs defaultValue="overview">
            <TabsList className="bg-[#071a22] p-1 rounded-xl mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="forecast">Forecast</TabsTrigger>
            </TabsList>

            {/* Overview */}
            <TabsContent value="overview">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main chart */}
                <Card className="col-span-2 bg-[#071a22] border border-[#0f1720] p-4">
                  <h3 className="text-lg font-semibold mb-3">
                    Recettes vs Dépenses
                  </h3>
                  <div className="w-full h-72 bg-[#06121a] rounded-xl border border-[#0f1620] flex items-center justify-center">
                    <span className="text-slate-500">
                      Chart area — replace with real chart
                    </span>
                  </div>
                </Card>

                {/* Summary */}
                <Card className="bg-[#071a22] border border-[#0f1720] p-4">
                  <h3 className="text-lg font-semibold mb-3">Résumé</h3>
                  <ul className="text-sm text-slate-300 space-y-2">
                    <li>Année : {new Date().getFullYear()}</li>
                    <li>Recettes : {fmt(kpis.recettes)}</li>
                    <li>Dépenses : {fmt(kpis.depenses)}</li>
                    <li>Solde : {fmt(kpis.solde)}</li>
                  </ul>
                </Card>
              </div>
            </TabsContent>

            {/* Details */}
            <TabsContent value="details">
              <Card className="bg-[#071a22] border border-[#0f1720] p-4">
                <h3 className="text-lg font-semibold mb-3">
                  Tableau détaillé
                </h3>
                <div className="w-full h-64 overflow-auto bg-[#06121a] rounded-md border border-[#0f1720] p-3">
                  <p className="text-slate-400">
                    Placeholder — connect a data table component later.
                  </p>
                </div>
              </Card>
            </TabsContent>

            {/* Forecast */}
            <TabsContent value="forecast">
              <Card className="bg-[#071a22] border border-[#0f1720] p-4">
                <h3 className="text-lg font-semibold mb-3">Prévisions</h3>

                <div className="w-full h-64 bg-[#06121a] rounded-md border border-[#0f1720] flex items-center justify-center mb-4">
                  <span className="text-slate-500">Forecast chart area</span>
                </div>

                <div className="flex gap-2">
                  <Input placeholder="Fin (ex : 2035)" />
                  <Button>Rafraîchir</Button>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </section>
      </main>
    </div>
  );
}
