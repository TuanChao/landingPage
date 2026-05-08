import { useRef, useState } from "react";
import { uploadFile, formatBytes, resolveAssetUrl, type UploadCategory, type UploadResult } from "@/admin/api";
import Icon from "./Icon";

interface Props {
  category: UploadCategory;
  value?: string;                  // URL hiện tại (relative or absolute)
  onChange: (result: UploadResult) => void;
  accept?: string;                 // override accept attribute
  label?: string;
  preview?: "image" | "none";      // mặc định: image với category="image"
  hint?: string;
}

const ACCEPT_BY_CATEGORY: Record<UploadCategory, string> = {
  image: "image/*",
  installer: ".zip,.rar,.7z,.exe,.msi",
  doc: ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt",
};

export default function FileUpload({
  category, value, onChange, accept, label, preview, hint,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [info, setInfo] = useState<UploadResult | null>(null);

  const showImagePreview = (preview ?? (category === "image" ? "image" : "none")) === "image";
  const previewSrc = info?.absoluteUrl ?? resolveAssetUrl(value);

  async function handlePick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = ""; // reset để có thể chọn lại cùng file
    if (!file) return;

    setErr(null);
    setProgress(0);
    try {
      const res = await uploadFile(file, category, (p) => setProgress(p));
      setInfo(res);
      setProgress(100);
      onChange(res);
    } catch (ex: any) {
      setErr(ex?.message || "Lỗi upload");
      setProgress(null);
    }
  }

  return (
    <div className="adm-upload">
      {label && <label className="adm-label">{label}</label>}

      <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
        <button
          type="button"
          className="adm-btn adm-btn--outline"
          onClick={() => inputRef.current?.click()}
          disabled={progress !== null && progress < 100}
        >
          <Icon name="plus" size={14} /> {value || info ? "Chọn file khác" : "Chọn file"}
        </button>
        {(info || value) && (
          <span className="adm-muted" style={{ fontSize: 12 }}>
            {info
              ? <>{info.originalName} · {formatBytes(info.size)}</>
              : <span className="adm-mono">{value}</span>}
          </span>
        )}
        <input
          ref={inputRef}
          type="file"
          accept={accept ?? ACCEPT_BY_CATEGORY[category]}
          onChange={handlePick}
          style={{ display: "none" }}
        />
      </div>

      {hint && <div className="adm-muted" style={{ fontSize: 12, marginTop: 4 }}>{hint}</div>}

      {progress !== null && progress < 100 && (
        <div style={{ marginTop: 6 }}>
          <div style={{ height: 4, background: "#e5e7eb", borderRadius: 2, overflow: "hidden" }}>
            <div style={{ width: `${progress}%`, height: "100%", background: "#2563eb", transition: "width .15s" }} />
          </div>
          <div className="adm-muted" style={{ fontSize: 11, marginTop: 2 }}>Đang tải lên… {progress}%</div>
        </div>
      )}

      {err && <div className="adm-error" style={{ marginTop: 6 }}>{err}</div>}

      {showImagePreview && previewSrc && (
        <div style={{ marginTop: 8 }}>
          <img src={previewSrc} alt="" style={{ maxHeight: 120, maxWidth: "100%", borderRadius: 6, border: "1px solid #e5e7eb" }} />
        </div>
      )}
    </div>
  );
}

