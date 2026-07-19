import React, { useState, useEffect, useMemo } from "react";
import { Play, Lock, Plus, Trash2, Film, TrendingUp, Check, X, Smartphone } from "lucide-react";
import { supabase } from "./supabaseClient";

const COLORS = {
  bg: "#12192E",
  bgElevated: "#1B2542",
  bgCard: "#212C4D",
  gold: "#D9A441",
  teal: "#2F6B5E",
  wine: "#9C3B44",
  cream: "#F3ECDD",
  muted: "#8992AA",
  line: "#2C3760",
};

const COUNTRIES = {
  CM: { label: "Cameroun", color: COLORS.gold, target: 60 },
  SN: { label: "Sénégal", color: COLORS.teal, target: 8 },
  CI: { label: "Côte d'Ivoire", color: COLORS.wine, target: 8 },
  CD: { label: "RD Congo", color: "#5C7A99", target: 8 },
  ML: { label: "Mali", color: "#C97B3D", target: 8 },
  BJ: { label: "Bénin", color: "#7A5A82", target: 8 },
  AO: { label: "Angola (hors quota)", color: "#4A9B8E", target: 0 },
};

const SEED = [
  { id: "s1", title: "Vengeance", country: "CM", year: 2022, synopsis: "La vie d'une famille riche et puissante est bouleversée par l'apparition d'un mystérieux assassin qui cherche à éteindre sa lignée.", videoUrl: "https://www.youtube.com/watch?v=wzQaRkQYWOU", addedAt: 1 },
  { id: "s2", title: "Pouvoir et Loi", country: "CM", year: 2022, synopsis: "Une avocate reprend le cabinet de son père, un ténor du barreau, sans se douter qu'il trempe lui-même dans de sombres affaires.", videoUrl: "https://www.youtube.com/watch?v=8LyIsDQTnlc", addedAt: 2 },
  { id: "s3", title: "Ewusu", country: "CM", year: 2024, synopsis: "Une jeune psychologue de Yaoundé se confronte à des cas hors du commun dans son cabinet d'un quartier populaire.", videoUrl: "https://www.youtube.com/watch?v=UWeiHfHIZUc", addedAt: 3 },
  { id: "s4", title: "Baabel", country: "SN", year: 2023, synopsis: "Quatre belles-sœurs s'affrontent sans merci pour devenir la reine incontestée de la famille.", videoUrl: "https://www.youtube.com/watch?v=KSv4tJkR0pk", addedAt: 4 },
  { id: "s5", title: "Lady Diama", country: "SN", year: 2024, synopsis: "Le portrait de Diama Kane, considérée comme la plus belle femme du Sénégal, prise dans une relation compliquée.", videoUrl: "https://www.youtube.com/watch?v=fZRzc35Qdok", addedAt: 5 },
  { id: "s6", title: "Tukki", country: "SN", year: 2025, synopsis: "Trois ans après un coup raté à Casablanca, deux anciens arnaqueurs reviennent fauchés à Dakar pour un dernier plan.", videoUrl: "https://www.youtube.com/watch?v=-jAM8u1RETI", addedAt: 6 },
  { id: "s7", title: "Isabelle", country: "CI", year: 2023, synopsis: "Le quotidien d'une jeune fille d'Abidjan passionnée par les réseaux sociaux.", videoUrl: "https://www.youtube.com/watch?v=ceN23rHrUCg", addedAt: 7 },
  { id: "s8", title: "Niabla", country: "CI", year: 2023, synopsis: "Une jeune femme débarque à Abidjan pour retrouver sa sœur, plongeant dans les nuits troubles de la ville.", videoUrl: "", addedAt: 8 },
  { id: "s9", title: "Les Perles de Babi", country: "CI", year: 2024, synopsis: "Les destins croisés de six jeunes femmes d'Abidjan qui cherchent à s'affirmer entre tradition et modernité.", videoUrl: "", addedAt: 9 },
  { id: "s10", title: "Les Nounous", country: "CI", year: 2024, synopsis: "Le quotidien de six employées de maison au caractère bien trempé dans une cité bourgeoise d'Abidjan.", videoUrl: "", addedAt: 10 },
  { id: "s11", title: "Chez Coco", country: "CD", year: 2023, synopsis: "Sitcom kinoise centrée sur un salon de coiffure et sa nouvelle patronne, Coco.", videoUrl: "https://www.youtube.com/playlist?list=PLk_JVM79nFVIsVLj_z1Fhs233InXi7kWF", addedAt: 11 },
  { id: "s12", title: "Sens Interdit", country: "CD", year: 2023, synopsis: "Deux familles fortunées de Kinshasa tentent de sceller leur union par un mariage arrangé qui ne se passe pas comme prévu.", videoUrl: "", addedAt: 12 },
  { id: "s13", title: "Verita", country: "CD", year: 2024, synopsis: "Une série chorale mêlant drame, comédie et romance autour de l'importance de dire la vérité.", videoUrl: "", addedAt: 13 },
  { id: "s14", title: "Dimanche à Bamako", country: "ML", year: 2022, synopsis: "Trois femmes que tout oppose se retrouvent chez le même marabout à quelques heures de leur mariage.", videoUrl: "", addedAt: 14 },
  { id: "s15", title: "Apparences", country: "BJ", year: 2024, synopsis: "La famille Oni se déchire dans une lutte de succession à la tête de son empire après l'assassinat du patriarche.", videoUrl: "", addedAt: 15 },
  { id: "s16", title: "Cotonou", country: "BJ", year: 2023, synopsis: "Une immersion dans les quartiers et la jeunesse de la mégapole béninoise de Cotonou.", videoUrl: "", addedAt: 16 },
  { id: "s17", title: "Windeck", country: "AO", year: 2012, synopsis: "La riche famille Voss, propriétaire du magazine de mode Divo à Luanda, attire toutes les convoitises et les intrigues amoureuses.", videoUrl: "https://www.youtube.com/watch?v=6m5nahL8WTg", addedAt: 17 },
  { id: "s18", title: "Madame... Monsieur", country: "CM", year: 2019, synopsis: "Une comédie camerounaise sur les hauts et les bas du quotidien d'un couple.", videoUrl: "https://www.youtube.com/watch?v=8SsYIQZAZv0", addedAt: 18 },
  { id: "s19", title: "Foyer Polygamique", country: "CM", year: 2023, synopsis: "Trois familles voisines et leurs histoires rocambolesques, entre jalousie et rebondissements, dans un foyer polygame.", videoUrl: "https://www.youtube.com/watch?v=lXycjN3glOY", addedAt: 19 },
  { id: "s20", title: "Sketchs de Gaby Kmer", country: "CM", year: 2022, synopsis: "Sketchs comiques camerounais sur les petits travers du quotidien, portés par l'humoriste Gaby Kmer.", videoUrl: "https://www.youtube.com/watch?v=CQR-hQk0BFE", addedAt: 20 },
  { id: "s21", title: "Sketchs d'Ulrich Takam", country: "CM", year: 2025, synopsis: "Web-séries et sketchs de l'humoriste camerounais Ulrich Takam sur la vie quotidienne de la jeunesse.", videoUrl: "https://www.youtube.com/watch?v=rwYUCY0xrHI", addedAt: 21 },
  { id: "s22", title: "Moustique le Charismatique et compagnie", country: "CM", year: 2019, synopsis: "Prestations et sketchs de l'humoriste camerounais Moustique le Charismatique.", videoUrl: "https://www.youtube.com/watch?v=LKi7jWKADPA", addedAt: 22 },
];

const FONT_IMPORT = "@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Work+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap');";

function getEmbedUrl(url) {
  if (!url) return null;
  const ytList = url.match(/[?&]list=([\w-]+)/);
  const yt = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{6,})/);
  if (yt) return { type: "iframe", src: `https://www.youtube.com/embed/${yt[1]}` };
  if (ytList) return { type: "iframe", src: `https://www.youtube.com/embed/videoseries?list=${ytList[1]}` };
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return { type: "iframe", src: `https://player.vimeo.com/video/${vimeo[1]}` };
  if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(url)) return { type: "video", src: url };
  return { type: "video", src: url };
}

export default function AfriStream() {
  const [loading, setLoading] = useState(true);
  const [subscribed, setSubscribed] = useState(false);
  const [view, setView] = useState("catalogue");
  const [series, setSeries] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [form, setForm] = useState({ title: "", country: "CM", year: new Date().getFullYear(), synopsis: "", videoUrl: "" });
  const [toast, setToast] = useState(null);
  const [installPrompt, setInstallPrompt] = useState(null);
  const [installDismissed, setInstallDismissed] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);
  const [playing, setPlaying] = useState(null);
  const [payMethod, setPayMethod] = useState(null);
  const [payPhone, setPayPhone] = useState("");
  const [paying, setPaying] = useState(false);
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPasswordInput, setAdminPasswordInput] = useState("");
  const [adminError, setAdminError] = useState("");
  const [adminChecking, setAdminChecking] = useState(false);

  const trySignIn = async () => {
    setAdminChecking(true);
    setAdminError("");
    const { error } = await supabase.auth.signInWithPassword({ email: adminEmail, password: adminPasswordInput });
    if (error) {
      setAdminError(error.message || "Identifiants incorrects.");
    } else {
      setAdminUnlocked(true);
    }
    setAdminChecking(false);
  };

  useEffect(() => {
    (async () => {
      setSubscribed(localStorage.getItem("subscription-status") === "true");
      const { data, error } = await supabase.from("series").select("*").order("added_at", { ascending: true });
      if (error || !data || data.length === 0) {
        setSeries(SEED);
      } else {
        setSeries(
          data.map((r) => ({
            id: r.id,
            title: r.title,
            country: r.country,
            year: r.year,
            synopsis: r.synopsis,
            videoUrl: r.video_url,
            addedAt: r.added_at,
          }))
        );
      }
      setLoading(false);
    })();
  }, []);

  const subscribe = async () => {
    setPaying(true);
    await new Promise((r) => setTimeout(r, 1400));
    setPaying(false);
    setSubscribed(true);
    localStorage.setItem("subscription-status", "true");
  };

  const addSeries = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    const { data, error } = await supabase
      .from("series")
      .insert({
        title: form.title,
        country: form.country,
        year: form.year,
        synopsis: form.synopsis,
        video_url: form.videoUrl,
        added_at: Date.now(),
      })
      .select()
      .single();
    if (!error && data) {
      setSeries([
        ...series,
        { id: data.id, title: data.title, country: data.country, year: data.year, synopsis: data.synopsis, videoUrl: data.video_url, addedAt: data.added_at },
      ]);
      setForm({ title: "", country: "CM", year: new Date().getFullYear(), synopsis: "", videoUrl: "" });
      setToast("Série ajoutée au catalogue");
      setTimeout(() => setToast(null), 2200);
    } else {
      setToast("Erreur : connecte-toi pour ajouter une série");
      setTimeout(() => setToast(null), 2500);
    }
  };

  const removeSeries = async (id) => {
    const { error } = await supabase.from("series").delete().eq("id", id);
    if (!error) setSeries(series.filter((s) => s.id !== id));
  };

  const counts = useMemo(() => {
    const c = { CM: 0, SN: 0, CI: 0, CD: 0, ML: 0, BJ: 0, AO: 0 };
    series.forEach((s) => { if (c[s.country] !== undefined) c[s.country]++; });
    return c;
  }, [series]);
  const total = series.length || 1;
  const pct = (k) => Math.round((counts[k] / total) * 100);

  const filtered = useMemo(
    () => (filter === "ALL" ? series : series.filter((s) => s.country === filter)),
    [series, filter]
  );

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center" style={{ background: COLORS.bg, color: COLORS.cream }}>
        <style>{FONT_IMPORT}</style>
        Chargement…
      </div>
    );
  }

  if (!subscribed) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center px-6" style={{ background: COLORS.bg, fontFamily: "'Work Sans', sans-serif" }}>
        <style>{FONT_IMPORT}</style>
        <div className="max-w-md w-full text-center">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Film size={22} color={COLORS.gold} />
            <span style={{ color: COLORS.muted, fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, letterSpacing: 2 }}>ABONNEMENT REQUIS</span>
          </div>
          <h1 style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: 44, color: COLORS.cream, lineHeight: 1.1 }}>
            afri-stream🎥
          </h1>
          <p style={{ color: COLORS.muted, marginTop: 14, fontSize: 15, lineHeight: 1.6 }}>
            Une salle de projection que vous programmez vous-même : 80% de mini-séries camerounaises,
            10% sénégalaises, 10% ivoiriennes.
          </p>

          <div className="mt-10 rounded-xl p-6 text-left" style={{ background: COLORS.bgElevated, border: `1px solid ${COLORS.line}` }}>
            <div className="flex items-baseline justify-between">
              <span style={{ color: COLORS.cream, fontFamily: "'Fraunces', serif", fontSize: 26, fontWeight: 600 }}>2 000 FCFA</span>
              <span style={{ color: COLORS.muted, fontSize: 13 }}>/ mois</span>
            </div>
            <ul className="mt-4 space-y-2">
              {["Accès illimité au catalogue", "Ajoutez vos propres mini-séries", "Suivi du quota de curation en direct"].map((t) => (
                <li key={t} className="flex items-start gap-2" style={{ color: COLORS.cream, fontSize: 13.5 }}>
                  <Check size={15} color={COLORS.teal} style={{ marginTop: 2, flexShrink: 0 }} />
                  {t}
                </li>
              ))}
            </ul>

            <p style={{ color: COLORS.muted, fontSize: 12, marginTop: 20, marginBottom: 8 }}>Moyen de paiement</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { key: "orange", label: "Orange Money", color: "#FF7900" },
                { key: "mtn", label: "MTN MoMo", color: "#FFCC00" },
              ].map((m) => (
                <button
                  key={m.key}
                  onClick={() => setPayMethod(m.key)}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-lg transition-colors"
                  style={{
                    background: payMethod === m.key ? `${m.color}22` : COLORS.bg,
                    border: `1.5px solid ${payMethod === m.key ? m.color : COLORS.line}`,
                  }}
                >
                  <span style={{ width: 10, height: 10, borderRadius: 999, background: m.color, flexShrink: 0 }} />
                  <span style={{ color: COLORS.cream, fontSize: 13, fontWeight: 500 }}>{m.label}</span>
                </button>
              ))}
            </div>

            {payMethod && (
              <div className="mt-3">
                <Field label={`Numéro ${payMethod === "orange" ? "Orange" : "MTN"}`}>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: COLORS.bg, border: `1px solid ${COLORS.line}` }}>
                    <Smartphone size={14} color={COLORS.muted} />
                    <input
                      value={payPhone}
                      onChange={(e) => setPayPhone(e.target.value)}
                      placeholder="6XX XX XX XX"
                      className="w-full bg-transparent outline-none"
                      style={{ color: COLORS.cream, fontSize: 14 }}
                    />
                  </div>
                </Field>
              </div>
            )}

            <button
              onClick={subscribe}
              disabled={!payMethod || !payPhone.trim() || paying}
              className="w-full mt-4 py-3 rounded-lg flex items-center justify-center gap-2 font-medium transition-opacity"
              style={{
                background: COLORS.gold,
                color: COLORS.bg,
                fontFamily: "'Work Sans', sans-serif",
                fontWeight: 600,
                opacity: !payMethod || !payPhone.trim() || paying ? 0.5 : 1,
                cursor: !payMethod || !payPhone.trim() || paying ? "not-allowed" : "pointer",
              }}
            >
              {paying ? "Paiement en cours…" : <><Lock size={15} /> Payer 2 000 FCFA et entrer</>}
            </button>
            <p className="text-center mt-3" style={{ color: COLORS.muted, fontSize: 11 }}>Simulation — aucun paiement réel n'est effectué.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen" style={{ background: COLORS.bg, fontFamily: "'Work Sans', sans-serif" }}>
      <style>{FONT_IMPORT}</style>

      <header className="flex items-center justify-between px-6 py-4" style={{ borderBottom: `1px solid ${COLORS.line}` }}>
        <div className="flex items-center gap-2">
          <Film size={20} color={COLORS.gold} />
          <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: 20, color: COLORS.cream }}>afri-stream🎥</span>
        </div>
        <nav className="flex gap-1 rounded-lg p-1" style={{ background: COLORS.bgElevated }}>
          {[["catalogue", "Catalogue"], ["admin", "Espace créateur"]].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setView(key)}
              className="px-4 py-1.5 rounded-md text-sm transition-colors"
              style={{
                background: view === key ? COLORS.gold : "transparent",
                color: view === key ? COLORS.bg : COLORS.muted,
                fontWeight: view === key ? 600 : 500,
              }}
            >
              {label}
            </button>
          ))}
        </nav>
      </header>

      {installPrompt && !installDismissed && (
        <div className="flex items-center justify-between gap-3 px-6 py-3" style={{ background: COLORS.bgElevated, borderBottom: `1px solid ${COLORS.line}` }}>
          <p style={{ color: COLORS.cream, fontSize: 13 }}>Installe afri-stream🎥 sur ton telephone pour un acces plus rapide.</p>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={async () => {
                installPrompt.prompt();
                await installPrompt.userChoice;
                setInstallPrompt(null);
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-medium"
              style={{ background: COLORS.gold, color: COLORS.bg, fontWeight: 600 }}
            >
              Installer
            </button>
            <button onClick={() => setInstallDismissed(true)} style={{ color: COLORS.muted }}>
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {view === "catalogue" && (
        <main className="px-6 py-8 max-w-6xl mx-auto">
          {series[0] && (
            <button
              onClick={() => setPlaying(series[0])}
              className="w-full text-left rounded-2xl overflow-hidden relative mb-8 block"
              style={{
                background: `linear-gradient(120deg, ${COUNTRIES[series[0].country].color}30, ${COLORS.bgElevated} 70%)`,
                border: `1px solid ${COLORS.line}`,
                minHeight: 220,
              }}
            >
              <div className="p-6 sm:p-8 flex flex-col justify-end h-full" style={{ minHeight: 220 }}>
                <span
                  className="inline-block px-2 py-0.5 rounded mb-3 w-fit"
                  style={{ background: COUNTRIES[series[0].country].color, color: COLORS.bg, fontSize: 10, fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600 }}
                >
                  A LA UNE · {COUNTRIES[series[0].country].label}
                </span>
                <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: 30, color: COLORS.cream, lineHeight: 1.15 }}>{series[0].title}</h2>
                <p style={{ color: COLORS.muted, fontSize: 13.5, marginTop: 8, maxWidth: 480, lineHeight: 1.5 }}>{series[0].synopsis || "Pas de synopsis."}</p>
                <span className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-lg w-fit" style={{ background: COLORS.gold, color: COLORS.bg, fontWeight: 600, fontSize: 13 }}>
                  <Play size={14} /> Regarder
                </span>
              </div>
            </button>
          )}

          <div className="flex items-center gap-2 mb-6 flex-wrap">
            <FilterChip active={filter === "ALL"} onClick={() => setFilter("ALL")} label={`Tout (${series.length})`} color={COLORS.cream} />
            {Object.entries(COUNTRIES).map(([k, v]) => (
              <FilterChip key={k} active={filter === k} onClick={() => setFilter(k)} label={`${v.label} (${counts[k]})`} color={v.color} />
            ))}
          </div>

          {filtered.length === 0 ? (
            <EmptyState text="Aucune série ici pour l'instant. Ajoutez-en une depuis l'Espace créateur." />
          ) : filter === "ALL" ? (
            <div className="flex flex-col gap-8">
              {Object.entries(COUNTRIES)
                .filter(([k]) => counts[k] > 0)
                .map(([k, v]) => (
                  <div key={k}>
                    <div className="flex items-center gap-2 mb-3">
                      <span style={{ width: 8, height: 8, borderRadius: 999, background: v.color }} />
                      <h3 style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 16, color: COLORS.cream }}>{v.label}</h3>
                    </div>
                    <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: "thin" }}>
                      {series.filter((s) => s.country === k).map((s) => (
                        <PosterCard key={s.id} s={s} country={v} onPlay={() => setPlaying(s)} />
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="flex gap-3 overflow-x-auto pb-2 flex-wrap" style={{ scrollbarWidth: "thin" }}>
              {filtered.map((s) => (
                <PosterCard key={s.id} s={s} country={COUNTRIES[s.country]} onPlay={() => setPlaying(s)} />
              ))}
            </div>
          )}
        </main>
      )}

      {view === "admin" && !adminUnlocked && (
        <main className="px-6 py-16 max-w-sm mx-auto text-center">
          <Lock size={22} color={COLORS.gold} style={{ margin: "0 auto 14px" }} />
          <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 20, color: COLORS.cream, marginBottom: 6 }}>Espace protégé</h2>
          <p style={{ color: COLORS.muted, fontSize: 13, marginBottom: 18 }}>
            Ce catalogue est partagé entre tous les utilisateurs. Connecte-toi avec ton compte admin pour ajouter ou supprimer des séries.
          </p>
          <div className="flex flex-col gap-2 text-left">
            <Field label="Email">
              <input
                type="email"
                value={adminEmail}
                onChange={(e) => { setAdminEmail(e.target.value); setAdminError(""); }}
                placeholder="toi@exemple.com"
                className="w-full px-3 py-2.5 rounded-lg outline-none"
                style={{ background: COLORS.bgElevated, border: `1px solid ${adminError ? COLORS.wine : COLORS.line}`, color: COLORS.cream, fontSize: 14 }}
              />
            </Field>
            <Field label="Mot de passe">
              <input
                type="password"
                value={adminPasswordInput}
                onChange={(e) => { setAdminPasswordInput(e.target.value); setAdminError(""); }}
                onKeyDown={(e) => { if (e.key === "Enter") trySignIn(); }}
                placeholder="Mot de passe"
                className="w-full px-3 py-2.5 rounded-lg outline-none"
                style={{ background: COLORS.bgElevated, border: `1px solid ${adminError ? COLORS.wine : COLORS.line}`, color: COLORS.cream, fontSize: 14 }}
              />
            </Field>
          </div>
          {adminError && <p style={{ color: COLORS.wine, fontSize: 12, marginTop: 8 }}>{adminError}</p>}
          <button
            onClick={trySignIn}
            disabled={adminChecking || !adminEmail.trim() || !adminPasswordInput.trim()}
            className="w-full mt-4 py-2.5 rounded-lg font-medium"
            style={{
              background: COLORS.gold,
              color: COLORS.bg,
              fontWeight: 600,
              fontSize: 14,
              opacity: adminChecking || !adminEmail.trim() || !adminPasswordInput.trim() ? 0.5 : 1,
            }}
          >
            {adminChecking ? "Connexion…" : "Se connecter"}
          </button>
        </main>
      )}

      {view === "admin" && adminUnlocked && (
        <main className="px-6 py-8 max-w-5xl mx-auto grid gap-8" style={{ gridTemplateColumns: "1.1fr 1fr" }}>
          <div>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 20, color: COLORS.cream, marginBottom: 4 }}>Ajouter une mini-série</h2>
            <p style={{ color: COLORS.muted, fontSize: 13, marginBottom: 16 }}>Choisissez vous-même ce qui entre au catalogue.</p>
            <form onSubmit={addSeries} className="flex flex-col gap-3">
              <Field label="Titre">
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Ex : Yaoundé Story"
                  className="w-full px-3 py-2 rounded-lg outline-none"
                  style={{ background: COLORS.bgElevated, border: `1px solid ${COLORS.line}`, color: COLORS.cream, fontSize: 14 }}
                />
              </Field>
              <Field label="Pays">
                <select
                  value={form.country}
                  onChange={(e) => setForm({ ...form, country: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg outline-none"
                  style={{ background: COLORS.bgElevated, border: `1px solid ${COLORS.line}`, color: COLORS.cream, fontSize: 14 }}
                >
                  {Object.entries(COUNTRIES).map(([k, v]) => (
                    <option key={k} value={k}>{v.label}</option>
                  ))}
                </select>
              </Field>
              <Field label="Année">
                <input
                  type="number"
                  min="2000"
                  max="2030"
                  value={form.year}
                  onChange={(e) => setForm({ ...form, year: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg outline-none"
                  style={{ background: COLORS.bgElevated, border: `1px solid ${COLORS.line}`, color: COLORS.cream, fontSize: 14 }}
                />
              </Field>
              <Field label="Synopsis">
                <textarea
                  value={form.synopsis}
                  onChange={(e) => setForm({ ...form, synopsis: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg outline-none resize-none"
                  style={{ background: COLORS.bgElevated, border: `1px solid ${COLORS.line}`, color: COLORS.cream, fontSize: 14 }}
                />
              </Field>
              <Field label="Lien vidéo (YouTube, Vimeo ou .mp4 — optionnel)">
                <input
                  value={form.videoUrl}
                  onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-lg outline-none"
                  style={{ background: COLORS.bgElevated, border: `1px solid ${COLORS.line}`, color: COLORS.cream, fontSize: 14 }}
                />
              </Field>
              <button
                type="submit"
                className="mt-2 py-2.5 rounded-lg flex items-center justify-center gap-2"
                style={{ background: COLORS.gold, color: COLORS.bg, fontWeight: 600, fontSize: 14 }}
              >
                <Plus size={16} /> Ajouter au catalogue
              </button>
            </form>

            <h3 style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 16, color: COLORS.cream, marginTop: 28, marginBottom: 10 }}>Séries au catalogue</h3>
            <div className="flex flex-col gap-2 max-h-72 overflow-auto pr-1">
              {series.map((s) => (
                <div key={s.id} className="flex items-center justify-between px-3 py-2 rounded-lg" style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.line}` }}>
                  <div className="flex items-center gap-2 min-w-0">
                    <span style={{ width: 8, height: 8, borderRadius: 999, background: COUNTRIES[s.country].color, flexShrink: 0 }} />
                    <span style={{ color: COLORS.cream, fontSize: 13.5 }} className="truncate">{s.title}</span>
                  </div>
                  <button onClick={() => removeSeries(s.id)} style={{ color: COLORS.muted }} className="hover:opacity-70">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp size={16} color={COLORS.gold} />
              <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 20, color: COLORS.cream }}>Baromètre de curation</h2>
            </div>
            <p style={{ color: COLORS.muted, fontSize: 13, marginBottom: 18 }}>Objectif : 80% CM · 10% SN · 10% CI</p>

            <div className="rounded-xl p-5" style={{ background: COLORS.bgElevated, border: `1px solid ${COLORS.line}` }}>
              <div className="w-full h-5 rounded-full overflow-hidden flex" style={{ background: COLORS.bg }}>
                {Object.entries(COUNTRIES).map(([k, v]) => (
                  <div key={k} style={{ width: `${pct(k)}%`, background: v.color, transition: "width .4s ease" }} />
                ))}
              </div>
              <div className="flex flex-col gap-3 mt-5">
                {Object.entries(COUNTRIES).map(([k, v]) => {
                  const actual = pct(k);
                  const diff = actual - v.target;
                  return (
                    <div key={k}>
                      <div className="flex items-center justify-between" style={{ fontSize: 13 }}>
                        <span className="flex items-center gap-2" style={{ color: COLORS.cream }}>
                          <span style={{ width: 8, height: 8, borderRadius: 999, background: v.color }} />
                          {v.label}
                        </span>
                        <span style={{ fontFamily: "'IBM Plex Mono', monospace", color: COLORS.muted }}>
                          {actual}% <span style={{ color: COLORS.line }}>/</span> {v.target}%{" "}
                          <span style={{ color: diff === 0 ? COLORS.teal : Math.abs(diff) <= 5 ? COLORS.gold : COLORS.wine }}>
                            ({diff > 0 ? "+" : ""}{diff})
                          </span>
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <p style={{ color: COLORS.muted, fontSize: 11.5, marginTop: 16, lineHeight: 1.5 }}>
                {total} série{total > 1 ? "s" : ""} au catalogue. Ajoutez des titres sénégalais ou ivoiriens si un pays dépasse son quota.
              </p>
            </div>
          </div>
        </main>
      )}

      {playing && (() => {
        const embed = playing.videoUrl ? getEmbedUrl(playing.videoUrl) : null;
        return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "#000000cc" }}>
          <div className="w-full max-w-2xl rounded-xl overflow-hidden" style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.line}` }}>
            <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: `1px solid ${COLORS.line}` }}>
              <div className="flex items-center gap-2 min-w-0">
                <span style={{ width: 8, height: 8, borderRadius: 999, background: COUNTRIES[playing.country].color, flexShrink: 0 }} />
                <span style={{ color: COLORS.cream, fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 15 }} className="truncate">{playing.title}</span>
              </div>
              <button onClick={() => setPlaying(null)} style={{ color: COLORS.muted }} className="hover:opacity-70 flex-shrink-0">
                <X size={18} />
              </button>
            </div>
            <div className="w-full aspect-video flex items-center justify-center" style={{ background: "#000" }}>
              {embed ? (
                embed.type === "iframe" ? (
                  <iframe
                    src={embed.src}
                    className="w-full h-full"
                    style={{ border: 0 }}
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    title={playing.title}
                  />
                ) : (
                  <video src={embed.src} controls autoPlay className="w-full h-full" />
                )
              ) : (
                <p style={{ color: COLORS.muted, fontSize: 13.5, padding: 24, textAlign: "center" }}>
                  Aucune vidéo n'a encore été liée à cette série.<br />Ajoutez un lien YouTube, Vimeo ou .mp4 depuis l'Espace créateur.
                </p>
              )}
            </div>
            <div className="p-4">
              <p style={{ color: COLORS.muted, fontSize: 13, lineHeight: 1.5 }}>{playing.synopsis || "Pas de synopsis."}</p>
            </div>
          </div>
        </div>
        );
      })()}

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 px-4 py-2.5 rounded-lg flex items-center gap-2" style={{ background: COLORS.teal, color: COLORS.cream, fontSize: 13.5 }}>
          <Check size={15} /> {toast}
        </div>
      )}
    </div>
  );
}

function PosterCard({ s, country, onPlay }) {
  return (
    <button
      onClick={onPlay}
      className="flex-shrink-0 rounded-xl overflow-hidden text-left group"
      style={{ width: 132, background: COLORS.bgCard, border: `1px solid ${COLORS.line}` }}
    >
      <div
        className="relative flex items-center justify-center"
        style={{ aspectRatio: "2 / 3", background: `linear-gradient(145deg, ${country.color}35, ${COLORS.bgElevated} 75%)` }}
      >
        <span className="rounded-full p-2.5 transition-transform group-hover:scale-110" style={{ background: `${country.color}25` }}>
          <Play size={18} color={country.color} />
        </span>
        <span
          className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded"
          style={{ background: country.color, color: COLORS.bg, fontSize: 9, fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600 }}
        >
          {s.country}
        </span>
        {s.videoUrl && (
          <span className="absolute top-1.5 right-1.5 rounded-full p-1" style={{ background: "#00000090" }}>
            <Check size={10} color={COLORS.cream} />
          </span>
        )}
      </div>
      <div className="px-2 py-2">
        <p style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 12.5, color: COLORS.cream, lineHeight: 1.25 }} className="line-clamp-2">
          {s.title}
        </p>
        {s.year && <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: COLORS.muted, marginTop: 2 }}>{s.year}</p>}
      </div>
    </button>
  );
}

function FilterChip({ active, onClick, label, color }) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-1.5 rounded-full text-xs transition-colors"
      style={{
        background: active ? color : "transparent",
        color: active ? COLORS.bg : COLORS.muted,
        border: `1px solid ${active ? color : COLORS.line}`,
        fontWeight: 600,
      }}
    >
      {label}
    </button>
  );
}

function Field({ label, children }) {
  return (
    <label className="flex flex-col gap-1">
      <span style={{ color: COLORS.muted, fontSize: 12 }}>{label}</span>
      {children}
    </label>
  );
}

function EmptyState({ text }) {
  return (
    <div className="rounded-xl py-16 text-center" style={{ background: COLORS.bgElevated, border: `1px dashed ${COLORS.line}` }}>
      <X size={22} color={COLORS.muted} style={{ margin: "0 auto 10px" }} />
      <p style={{ color: COLORS.muted, fontSize: 13.5 }}>{text}</p>
    </div>
  );
}
