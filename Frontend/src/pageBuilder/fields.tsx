// Custom Puck fields: ImagePicker (FileUpload), RichText (Tiptap), Color.
// Dùng `type: "custom"` trong Puck config, value/onChange truyền vào component bên dưới.
import type { CustomField } from "@measured/puck";
import { FileUpload } from "@/admin/components";
import RichTextEditor from "@/admin/components/RichTextEditor";

interface FieldProps<T> {
  value: T;
  onChange: (next: T) => void;
}

// ── ImagePicker ────────────────────────────────────────────────────────────
function ImagePickerInput({ value, onChange }: FieldProps<string>) {
  return (
    <div>
      <input
        type="text"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="URL ảnh (hoặc upload bên dưới)"
        style={{
          width: "100%",
          padding: "6px 8px",
          border: "1px solid #d1d5db",
          borderRadius: 4,
          fontSize: 13,
          marginBottom: 8,
        }}
      />
      <FileUpload
        category="image"
        value={value}
        onChange={(r) => onChange(r.url)}
        hint="JPG/PNG/WEBP/SVG"
      />
    </div>
  );
}

export const ImagePickerField = (label?: string): CustomField<string> => ({
  type: "custom",
  label,
  render: ({ value, onChange }) => <ImagePickerInput value={value ?? ""} onChange={onChange} />,
});

// ── RichText (Tiptap) ──────────────────────────────────────────────────────
function RichTextInput({ value, onChange }: FieldProps<string>) {
  return (
    <div style={{ background: "#fff", border: "1px solid #d1d5db", borderRadius: 4 }}>
      <RichTextEditor value={value || ""} onChange={onChange} minHeight={160} />
    </div>
  );
}

export const RichTextField = (label?: string): CustomField<string> => ({
  type: "custom",
  label,
  render: ({ value, onChange }) => <RichTextInput value={value ?? ""} onChange={onChange} />,
});

// ── Color ──────────────────────────────────────────────────────────────────
function ColorInput({ value, onChange }: FieldProps<string>) {
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <input
        type="color"
        value={value || "#000000"}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: 40, height: 32, padding: 0, border: "1px solid #d1d5db", borderRadius: 4 }}
      />
      <input
        type="text"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="#000000 hoặc transparent"
        style={{
          flex: 1,
          padding: "6px 8px",
          border: "1px solid #d1d5db",
          borderRadius: 4,
          fontSize: 13,
        }}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          style={{ padding: "4px 8px", fontSize: 12, border: "1px solid #d1d5db", borderRadius: 4, background: "#fff", cursor: "pointer" }}
        >
          ×
        </button>
      )}
    </div>
  );
}

export const ColorField = (label?: string): CustomField<string> => ({
  type: "custom",
  label,
  render: ({ value, onChange }) => <ColorInput value={value ?? ""} onChange={onChange} />,
});
