"use client";

import { useEffect, useState } from "react";
import {
  FolderOpen,
  HardDrive,
  ImageOff,
  Loader2,
  RefreshCw,
  Video,
} from "lucide-react";

interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  thumbnailLink?: string;
  createdTime?: string;
  size?: string;
}

interface DriveAbout {
  displayName?: string;
  emailAddress?: string;
  limitBytes?: number;
  usageBytes?: number;
}

interface DriveResponse {
  files: DriveFile[];
  about: DriveAbout;
}

function formatBytes(bytes?: number): string {
  if (bytes == null) return "—";
  const units = ["B", "KB", "MB", "GB", "TB"];
  let value = bytes;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit++;
  }
  return `${value.toFixed(value < 10 && unit > 0 ? 1 : 0)} ${units[unit]}`;
}

export function DriveGallery() {
  const [data, setData] = useState<DriveResponse | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  async function load() {
    setStatus("loading");
    try {
      const res = await fetch("/api/drive/files", { cache: "no-store" });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setData(await res.json());
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  }

  useEffect(() => {
    load();
  }, []);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center gap-3 rounded-3xl border border-surface-variant bg-surface-lowest py-24 text-on-surface-variant">
        <Loader2 className="h-5 w-5 animate-spin" />
        <span className="font-body">Reading your FamFrame folder…</span>
      </div>
    );
  }

  if (status === "error" || !data) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-error-container bg-error-container/40 py-20 text-center">
        <p className="font-body text-on-error-container">
          Couldn&apos;t reach your Google Drive. Your session may have expired.
        </p>
        <button
          onClick={load}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-body text-sm font-semibold text-on-primary transition hover:opacity-90"
        >
          <RefreshCw className="h-4 w-4" /> Try again
        </button>
      </div>
    );
  }

  const { files, about } = data;
  const usedPct =
    about.limitBytes && about.usageBytes
      ? Math.min(100, (about.usageBytes / about.limitBytes) * 100)
      : null;

  return (
    <div className="flex flex-col gap-8">
      {/* Storage summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          icon={<FolderOpen className="h-5 w-5 text-primary" />}
          label="Memories in folder"
          value={String(files.length)}
        />
        <StatCard
          icon={<HardDrive className="h-5 w-5 text-primary" />}
          label="Drive storage used"
          value={`${formatBytes(about.usageBytes)} / ${formatBytes(about.limitBytes)}`}
          footer={
            usedPct != null ? (
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-surface-highest">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${usedPct}%` }}
                />
              </div>
            ) : undefined
          }
        />
        <StatCard
          icon={<RefreshCw className="h-5 w-5 text-primary" />}
          label="Google account"
          value={about.emailAddress ?? "—"}
        />
      </div>

      {/* Gallery */}
      {files.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-3xl border border-dashed border-outline-variant bg-surface-lowest py-24 text-center">
          <FolderOpen className="h-10 w-10 text-primary-container" />
          <h3 className="font-headline text-xl font-semibold text-on-surface">
            No memories yet
          </h3>
          <p className="max-w-sm font-body text-on-surface-variant">
            Add photos and videos from the FamFrame mobile app and they&apos;ll
            appear here, straight from your Google Drive.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {files.map((file) => (
            <MediaTile key={file.id} file={file} />
          ))}
        </div>
      )}
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  footer,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  footer?: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-surface-variant bg-surface-lowest p-6 shadow-[var(--shadow-card)]">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-fixed">
        {icon}
      </div>
      <p className="mt-4 font-body text-sm text-on-surface-variant">{label}</p>
      <p className="mt-1 truncate font-headline text-lg font-semibold text-on-surface">
        {value}
      </p>
      {footer}
    </div>
  );
}

function MediaTile({ file }: { file: DriveFile }) {
  const [broken, setBroken] = useState(false);
  const isVideo = file.mimeType.startsWith("video/");

  return (
    <div className="group relative aspect-square overflow-hidden rounded-2xl border border-surface-variant bg-surface-container">
      {file.thumbnailLink && !broken ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={file.thumbnailLink}
          alt={file.name}
          referrerPolicy="no-referrer"
          onError={() => setBroken(true)}
          className="h-full w-full object-cover transition group-hover:scale-105"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-on-surface-variant">
          {isVideo ? (
            <Video className="h-7 w-7" />
          ) : (
            <ImageOff className="h-7 w-7" />
          )}
          <span className="px-3 text-center font-body text-xs">{file.name}</span>
        </div>
      )}
      {isVideo && file.thumbnailLink && !broken && (
        <span className="absolute right-2 top-2 rounded-full bg-black/50 p-1.5">
          <Video className="h-3.5 w-3.5 text-white" />
        </span>
      )}
    </div>
  );
}
