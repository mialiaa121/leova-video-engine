"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const BACKEND_GENERATE_URL = "https://backend-freepik-user-key.vercel.app/api/generate";
const BACKEND_STATUS_URL = "https://backend-freepik-user-key.vercel.app/api/status";

const SUPABASE_URL = "https://fadzqoseymrrmxyeiioe.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhZHpxb3NleW1ycm14eWVpaW9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcxOTcyMzAsImV4cCI6MjA5Mjc3MzIzMH0.S5PRqZ29Edvd1ZclL-duIyOHrpzapOh2pMciPne_GXc";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const MODEL_OPTIONS = [
  ["Kling 3.0", "kling-3-0"],
  ["Kling 3.1 Omni", "kling-3-1-omni"],
  ["Kling 3.1 Motion Control", "kling-3-1-motion-control"],
  ["Kling 2.6", "kling-2-6"],
  ["Kling 2.6 Motion Control", "kling-2-6-motion-control"],
  ["Kling O1", "kling-o1"],
  ["Kling 2.5", "kling-2-5"],
  ["Kling 2.1", "kling-2-1"],
  ["Kling 2.1 Master", "kling-2-1-master"],

  ["Seedance 2.0", "seedance-2-0"],
  ["Seedance 2.0 Fast", "seedance-2-0-fast"],
  ["Seedance 1.5 Pro", "seedance-1-5-pro"],
  ["Seedance 1.0 Pro", "seedance-1-0-pro"],
  ["Seedance 1.0 Fast", "seedance-1-0-fast"],
  ["Seedance 1.0 Lite", "seedance-1-0-lite"],

  ["Grok", "grok"],

  ["Google Veo 3.1", "veo-3-1"],
  ["Google Veo 3.1 Fast", "veo-3-1-fast"],
  ["Google Veo 3.1 Lite", "veo-3-1-lite"],
  ["Google Veo 3", "veo-3"],
  ["Google Veo 3 Fast", "veo-3-fast"],
  ["Google Veo 2", "veo-2"],

  ["Omni Human 1.5", "omni-human-1-5"],

  ["Runway Gen 4.5", "runway-gen-4-5"],
  ["Runway Gen 4", "runway-gen-4"],
  ["Runway Act Two", "runway-act-two"],

  ["Veed Fabric 1.0", "veed-fabric-1-0"],
  ["Veed Fabric 1.0 Fast", "veed-fabric-1-0-fast"],

  ["MiniMax Hailuo 2.3", "hailuo-2-3"],
  ["MiniMax Hailuo 2.3 Fast", "hailuo-2-3-fast"],
  ["MiniMax Hailuo 02", "hailuo-02"],
  ["MiniMax Hailuo Live Illustrations", "hailuo-live-illustrations"],

  ["PixVerse 6", "pixverse-6"],
  ["PixVerse 5.5", "pixverse-5-5"],

  ["Sora 2 Pro", "sora-2-pro"],
  ["Sora 2", "sora-2"],

  ["Wan 2.7", "wan-2-7"],
  ["Wan 2.6", "wan-2-6"],
  ["Wan 2.5", "wan-2-5"],
  ["Wan 2.2", "wan-2-2"],
  ["Wan 2.2 Anime Move", "wan-2-2-anime-move"],

  ["LTX 2 Pro", "ltx-2-pro"],
  ["LTX 2 Fast", "ltx-2-fast"]
];
const AFFILIATE_STYLES = [
  "UGC Review Natural",
  "Sambil Makan / Minum",
  "Get Ready With Me",
  "Mirror Talk",
  "Unboxing Produk",
  "Problem Solution",
  "Before After",
  "Jalan Sambil Review",
  "Duduk di Kamar",
  "Duduk di Cafe",
  "Pakai Produk Langsung",
  "Close-up Detail Produk",
  "Testimoni Puas",
  "Soft Selling Storytime",
  "Hard Selling Promo",
  "POV Teman Rekomendasi",
  "ASMR Produk",
  "Tutorial Pemakaian",
  "Comparison Produk",
  "Lifestyle Daily Use",
  "Reaction First Try",
  "Packing Order",
  "Aesthetic Product Showcase",
  "Voice Over B-Roll",
  "Hook Kontroversial"
];

const DURATIONS = {
  cloning: [5, 10, 15, 20, 25, 30],
  timelapse: [5, 10, 15, 20, 30, 45, 60, 90],
  affiliate: [15, 30, 45, 60, 90, 120, 180, 300]
};

async function uploadToPublicStorage(file) {
  if (!file) return null;

  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;
  const filePath = `uploads/${fileName}`;

  const { error } = await supabase.storage
    .from("leova-uploads")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false
    });

  if (error) throw new Error("Upload gagal: " + error.message);

  const { data } = supabase.storage
    .from("leova-uploads")
    .getPublicUrl(filePath);

  return data.publicUrl;
}

function getTaskId(data) {
  return (
    data?.result?.data?.task_id ||
    data?.result?.task_id ||
    data?.data?.task_id ||
    data?.task_id ||
    data?.result?.id ||
    data?.id ||
    null
  );
}

function getVideoUrl(data) {
  return (
    data?.videoUrl ||
    data?.generated?.[0]?.url ||
    data?.generated?.[0] ||
    data?.raw?.data?.generated?.[0]?.url ||
    data?.raw?.data?.generated?.[0] ||
    data?.raw?.generated?.[0]?.url ||
    data?.raw?.generated?.[0] ||
    data?.raw?.data?.video_url ||
    data?.raw?.data?.url ||
    data?.result?.videoUrl ||
    data?.result?.data?.generated?.[0]?.url ||
    data?.result?.data?.generated?.[0] ||
    data?.result?.generated?.[0]?.url ||
    data?.result?.generated?.[0] ||
    data?.video_url ||
    data?.url ||
    null
  );
}

function isFinished(status) {
  return ["COMPLETED", "SUCCEEDED", "SUCCESS", "DONE", "FINISHED"].includes(
    String(status || "").toUpperCase()
  );
}

function isFailed(status) {
  return ["FAILED", "ERROR", "CANCELED", "CANCELLED"].includes(
    String(status || "").toUpperCase()
  );
}

export default function Page() {
  const [showSettings, setShowSettings] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [freepikApiKey, setFreepikApiKey] = useState("");

  const [videoMode, setVideoMode] = useState("cloning");
  const [modelId, setModelId] = useState("kling-3-1-motion-control");
  const [duration, setDuration] = useState(5);
  const [aspectRatio, setAspectRatio] = useState("9:16");
  const [resolution, setResolution] = useState("720p");

  const [videoFile, setVideoFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [productFile, setProductFile] = useState(null);
  const [audioFile, setAudioFile] = useState(null);

  const [videoPreview, setVideoPreview] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [productPreview, setProductPreview] = useState("");

  const [prompt, setPrompt] = useState("");
  const [productName, setProductName] = useState("");
  const [productBenefits, setProductBenefits] = useState("");
  const [ctaText, setCtaText] = useState("");
  const [affiliateStyle, setAffiliateStyle] = useState("UGC Review Natural");

  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [processText, setProcessText] = useState("");
  const [error, setError] = useState("");
  const [finalVideoUrl, setFinalVideoUrl] = useState("");

  function changeMode(value) {
    setVideoMode(value);
    if (value === "cloning") {
      setDuration(5);
      setModelId("kling-3-1-motion-control");
    }
    if (value === "timelapse") {
      setDuration(15);
      setModelId("kling-3-0");
    }
    if (value === "affiliate") {
      setDuration(30);
      setModelId("kling-3-1-motion-control");
    }
  }

  async function pollStatus(taskId) {
    for (let i = 0; i < 180; i++) {
      await new Promise((resolve) => setTimeout(resolve, 8000));

      setProgress((old) => Math.min(old + 3, 95));
      setProcessText("Mohon tunggu, AI sedang membuat video kamu.");

      const response = await fetch(BACKEND_STATUS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          freepikApiKey,
          taskId,
          modelId
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Gagal mengecek hasil video.");
      }

      const videoUrl = getVideoUrl(data);
      const status = data?.status || data?.raw?.data?.status || data?.raw?.status;

      if (videoUrl && (isFinished(status) || status)) {
        setProgress(100);
        setProcessText("Video selesai dan siap diunduh.");
        setFinalVideoUrl(videoUrl);
        return;
      }

      if (isFailed(status)) {
        throw new Error("Video gagal diproses. Coba pakai input yang lebih sederhana.");
      }
    }

    throw new Error("Video diproses terlalu lama. Coba durasi lebih pendek.");
  }

  async function handleGenerate() {
    setError("");
    setFinalVideoUrl("");
    setLoading(true);
    setProgress(5);

    try {
      if (!freepikApiKey.trim()) throw new Error("Masukkan API Key Freepik dulu di Setting.");
      if (!imageFile) throw new Error("Upload foto model / objek dulu.");
      if (videoMode === "cloning" && !videoFile) throw new Error("Upload video referensi untuk mode cloning.");
      if (videoMode === "timelapse" && !prompt.trim()) throw new Error("Prompt wajib untuk mode timelapse.");

      if (videoMode === "affiliate" && Number(duration) > 30 && !modelId.includes("veed-fabric")) {
        throw new Error("Affiliate di atas 30 detik wajib memakai Veed Fabric.");
      }

      if (videoMode === "affiliate" && modelId.includes("veed-fabric") && !audioFile) {
        throw new Error("Veed Fabric membutuhkan audio voice over.");
      }

      setProcessText("Mengupload video referensi...");
      setProgress(12);
      const uploadedVideoUrl = videoFile ? await uploadToPublicStorage(videoFile) : null;

      setProcessText("Mengupload foto model / objek...");
      setProgress(25);
      const uploadedImageUrl = await uploadToPublicStorage(imageFile);

      setProcessText("Mengupload foto produk...");
      setProgress(35);
      const uploadedProductUrl = productFile ? await uploadToPublicStorage(productFile) : null;

      setProcessText("Mengupload audio voice over...");
      setProgress(45);
      const uploadedAudioUrl = audioFile ? await uploadToPublicStorage(audioFile) : null;

      setProcessText("Mengirim request ke Freepik...");
      setProgress(55);

      const response = await fetch(BACKEND_GENERATE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          freepikApiKey,
          videoUrl: uploadedVideoUrl,
          imageUrl: uploadedImageUrl,
          productImageUrl: uploadedProductUrl,
          audioUrl: uploadedAudioUrl,
          prompt,
          productName,
          productBenefits,
          ctaText,
          affiliateStyle,
          videoMode,
          modelId,
          duration,
          aspectRatio,
          resolution
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Request ke Freepik gagal.");
      }

      const directVideoUrl = getVideoUrl(data);
      if (directVideoUrl) {
        setProgress(100);
        setProcessText("Video selesai dan siap diunduh.");
        setFinalVideoUrl(directVideoUrl);
        return;
      }

      const taskId = getTaskId(data);
      if (!taskId) throw new Error("Task video tidak ditemukan.");

      setProgress(65);
      setProcessText("Mohon tunggu, AI sedang membuat video kamu.");
      await pollStatus(taskId);
    } catch (err) {
      setError(err.message || "Terjadi error.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <header className="header">
        <div className="logoBox">
          <img
            className="logo"
            src="https://i.ibb.co.com/5ZHsXsc/IMG-20260417-185016-765.jpg"
            alt="LEOVA"
          />
          <div>
            <div className="title">LEOVA VIDEO ENGINE</div>
            <div className="subtitle">Cloning • Timelapse • Affiliate</div>
          </div>
        </div>

        <button className="btn btnDark" onClick={() => setShowSettings(true)}>
          Setting
        </button>
      </header>

      <main className="main">
        {!freepikApiKey && (
          <div className="card">
            <h2>Masukkan API Key Freepik dulu</h2>
            <p className="help">Klik Setting untuk memasukkan API Key Freepik milik kamu.</p>
          </div>
        )}

        <div className="card">
          <label className="label">Mode Video</label>
          <select className="select" value={videoMode} onChange={(e) => changeMode(e.target.value)}>
            <option value="cloning">Video Cloning / Motion Transfer</option>
            <option value="timelapse">Timelapse Transformation</option>
            <option value="affiliate">Video Affiliate / UGC Ads</option>
          </select>
        </div>

        <div className="card grid grid2">
          <div>
            <label className="label">
              {videoMode === "cloning"
                ? "Upload Video Referensi"
                : videoMode === "timelapse"
                ? "Upload Video Referensi Timelapse (Optional)"
                : "Upload Video Referensi Gaya Affiliate (Optional)"}
            </label>
            <input
              className="input"
              type="file"
              accept="video/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                setVideoFile(file || null);
                setVideoPreview(file ? URL.createObjectURL(file) : "");
              }}
            />
            {videoPreview && <video className="preview" src={videoPreview} controls />}
          </div>

          <div>
            <label className="label">
              {videoMode === "timelapse"
                ? "Upload Foto Objek Awal"
                : videoMode === "affiliate"
                ? "Upload Foto Model Affiliate"
                : "Upload Foto Model"}
            </label>
            <input
              className="input"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                setImageFile(file || null);
                setImagePreview(file ? URL.createObjectURL(file) : "");
              }}
            />
            {imagePreview && <img className="preview" src={imagePreview} alt="preview" />}
          </div>
        </div>

        {videoMode === "affiliate" && (
          <div className="card grid">
            <div>
              <label className="label">Pilih Model Video Affiliate</label>
              <select
                className="select"
                value={affiliateStyle}
                onChange={(e) => setAffiliateStyle(e.target.value)}
              >
                {AFFILIATE_STYLES.map((style) => (
                  <option key={style} value={style}>{style}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="label">Upload Foto Produk</label>
              <input
                className="input"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  setProductFile(file || null);
                  setProductPreview(file ? URL.createObjectURL(file) : "");
                }}
              />
              {productPreview && <img className="preview" src={productPreview} alt="produk" />}
            </div>

            <input
              className="input"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Nama Produk"
            />

            <textarea
              className="textarea"
              value={productBenefits}
              onChange={(e) => setProductBenefits(e.target.value)}
              placeholder="Keunggulan produk"
            />

            <input
              className="input"
              value={ctaText}
              onChange={(e) => setCtaText(e.target.value)}
              placeholder="CTA, contoh: Klik keranjang kuning sekarang"
            />

            <div>
              <label className="label">Upload Audio Voice Over</label>
              <input
                className="input"
                type="file"
                accept="audio/*"
                onChange={(e) => setAudioFile(e.target.files?.[0] || null)}
              />
              <p className="help">Wajib untuk Veed Fabric atau affiliate di atas 30 detik.</p>
              {audioFile && <p className="help">Audio: {audioFile.name}</p>}
            </div>
          </div>
        )}

        <div className="card grid">
          <div>
            <label className="label">Model AI</label>
            <select className="select" value={modelId} onChange={(e) => setModelId(e.target.value)}>
              {MODEL_OPTIONS.map(([label, id]) => (
                <option key={id} value={id}>{label}</option>
              ))}
            </select>
            <p className="help">
              Cloning terbaik: Kling Motion Control. Affiliate 5 menit: Veed Fabric + audio.
            </p>
          </div>

          <div className="grid grid2">
            <div>
              <label className="label">Durasi</label>
              <select className="select" value={duration} onChange={(e) => setDuration(Number(e.target.value))}>
                {DURATIONS[videoMode].map((d) => (
                  <option key={d} value={d}>
                    {d < 60 ? `${d} detik` : `${d / 60} menit`}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="label">Aspect Ratio</label>
              <select className="select" value={aspectRatio} onChange={(e) => setAspectRatio(e.target.value)}>
                <option value="9:16">9:16 Reels/TikTok</option>
                <option value="16:9">16:9 YouTube</option>
                <option value="1:1">1:1 Square</option>
              </select>
            </div>
          </div>

          {videoMode === "affiliate" && (
            <div>
              <label className="label">Resolution untuk Veed Fabric</label>
              <select className="select" value={resolution} onChange={(e) => setResolution(e.target.value)}>
                <option value="720p">720p</option>
                <option value="480p">480p</option>
              </select>
            </div>
          )}

          <div>
            <label className="label">
              {videoMode === "timelapse" ? "Prompt Timelapse" : "Prompt Optional"}
            </label>
            <textarea
              className="textarea"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={
                videoMode === "timelapse"
                  ? "Create a realistic construction timelapse from old house to modern minimalist house..."
                  : "Tambahkan arahan optional..."
              }
            />
          </div>
        </div>

        {loading && (
          <div className="card">
            <h2>Memproses Video</h2>
            <p className="help">{processText || "Mohon tunggu, AI sedang membuat video kamu."}</p>
            <div className="progressWrap">
              <div className="progressBar" style={{ width: `${progress}%` }} />
            </div>
            <p className="help">Proses ini bisa memakan waktu beberapa menit.</p>
          </div>
        )}

        {error && <div className="error">{error}</div>}

        {finalVideoUrl && (
          <div className="card">
            <h2>Video Selesai</h2>
            <p className="success">Video selesai dan siap diunduh.</p>
            <video className="preview" src={finalVideoUrl} controls />
            <div className="row" style={{ marginTop: 14 }}>
              <a className="btn" href={finalVideoUrl} download target="_blank" rel="noreferrer">
                Download Video
              </a>
              <a className="btn btnDark" href={finalVideoUrl} target="_blank" rel="noreferrer">
                Open Video
              </a>
            </div>
          </div>
        )}

        <button className="btn btnFull" disabled={loading} onClick={handleGenerate}>
          {loading ? "Sedang Memproses..." : "Generate Video"}
        </button>

        <p className="footer">
          Gunakan hanya foto, video, produk, dan audio yang kamu miliki atau punya izin gunakan.
        </p>
      </main>

      {showSettings && (
        <div className="modalBackdrop">
          <div className="modal">
            <h2>API Settings</h2>
            <p className="help">Masukkan API Key Freepik milik kamu sendiri.</p>

            <div className="row">
              <input
                className="input"
                type={showKey ? "text" : "password"}
                value={freepikApiKey}
                onChange={(e) => setFreepikApiKey(e.target.value)}
                placeholder="Freepik API Key"
              />
              <button className="btn btnDark" onClick={() => setShowKey(!showKey)}>
                {showKey ? "Hide" : "Show"}
              </button>
            </div>

            <p className="help">
              API key hanya disimpan selama halaman terbuka dan tidak disimpan permanen.
            </p>

            <div className="row" style={{ marginTop: 16 }}>
              <button className="btn" onClick={() => setShowSettings(false)}>Simpan</button>
              <button className="btn btnDark" onClick={() => setShowSettings(false)}>Tutup</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
    }
