import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect, useRef } from "react";
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough, Code,
  Heading2, Heading3, List, ListOrdered, Quote,
  Link as LinkIcon, Image as ImageIcon,
  Undo2, Redo2, Pilcrow,
} from "lucide-react";
import { uploadFile, resolveAssetUrl } from "@/admin/api";
import "./RichTextEditor.css";

interface Props {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: number;
}

export default function RichTextEditor({ value, onChange, placeholder, minHeight = 280 }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<Editor | null>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      Underline,
      Link.configure({ openOnClick: false, autolink: true, HTMLAttributes: { rel: "noopener", target: "_blank" } }),
      Image.configure({ HTMLAttributes: { class: "rte-image" }, allowBase64: false }),
      Placeholder.configure({ placeholder: placeholder || "Bắt đầu viết…" }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: { class: "rte-content", style: `min-height:${minHeight}px` },
      handlePaste: (_view, event) => handleFiles(event.clipboardData?.files, editorRef.current),
      handleDrop: (_view, event) => handleFiles((event as DragEvent).dataTransfer?.files, editorRef.current),
    },
  });

  useEffect(() => { editorRef.current = editor; }, [editor]);

  // Sync khi value đổi từ ngoài (ví dụ: load bài để sửa)
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "", { emitUpdate: false });
    }
  }, [value, editor]);

  function handleFiles(files: FileList | undefined | null, ed: Editor | null): boolean {
    if (!files || files.length === 0 || !ed) return false;
    const images = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (images.length === 0) return false;
    images.forEach(async (file) => {
      try {
        const res = await uploadFile(file, "image");
        ed.chain().focus().setImage({ src: resolveAssetUrl(res.url), alt: res.originalName }).run();
      } catch (e: any) {
        alert(`Upload ảnh thất bại: ${e?.message || e}`);
      }
    });
    return true;
  }

  async function pickAndInsertImage() {
    fileRef.current?.click();
  }
  async function onPickFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || !editor) return;
    try {
      const res = await uploadFile(file, "image");
      editor.chain().focus().setImage({ src: resolveAssetUrl(res.url), alt: res.originalName }).run();
    } catch (ex: any) {
      alert(`Upload ảnh thất bại: ${ex?.message || ex}`);
    }
  }

  function setLink() {
    if (!editor) return;
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("URL liên kết:", prev || "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }

  if (!editor) return null;

  return (
    <div className="rte">
      <div className="rte-toolbar" role="toolbar" aria-label="Định dạng văn bản">
        <Group>
          <TButton onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title="Hoàn tác (Ctrl+Z)">
            <Undo2 size={16} />
          </TButton>
          <TButton onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title="Làm lại (Ctrl+Y)">
            <Redo2 size={16} />
          </TButton>
        </Group>

        <Group>
          <TButton active={editor.isActive("paragraph")} onClick={() => editor.chain().focus().setParagraph().run()} title="Đoạn văn">
            <Pilcrow size={16} />
          </TButton>
          <TButton active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} title="Tiêu đề lớn">
            <Heading2 size={16} />
          </TButton>
          <TButton active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} title="Tiêu đề nhỏ">
            <Heading3 size={16} />
          </TButton>
        </Group>

        <Group>
          <TButton active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()} title="Đậm (Ctrl+B)">
            <Bold size={16} />
          </TButton>
          <TButton active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()} title="Nghiêng (Ctrl+I)">
            <Italic size={16} />
          </TButton>
          <TButton active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()} title="Gạch chân (Ctrl+U)">
            <UnderlineIcon size={16} />
          </TButton>
          <TButton active={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()} title="Gạch ngang">
            <Strikethrough size={16} />
          </TButton>
          <TButton active={editor.isActive("code")} onClick={() => editor.chain().focus().toggleCode().run()} title="Code inline">
            <Code size={16} />
          </TButton>
        </Group>

        <Group>
          <TButton active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()} title="Danh sách •">
            <List size={16} />
          </TButton>
          <TButton active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()} title="Danh sách 1.">
            <ListOrdered size={16} />
          </TButton>
          <TButton active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()} title="Trích dẫn">
            <Quote size={16} />
          </TButton>
        </Group>

        <Group>
          <TButton active={editor.isActive("link")} onClick={setLink} title="Chèn / sửa liên kết">
            <LinkIcon size={16} />
          </TButton>
          <TButton onClick={pickAndInsertImage} title="Chèn ảnh (upload, paste, kéo-thả đều được)">
            <ImageIcon size={16} />
          </TButton>
        </Group>
      </div>

      <EditorContent editor={editor} />

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={onPickFile}
        style={{ display: "none" }}
      />
    </div>
  );
}

function Group({ children }: { children: React.ReactNode }) {
  return <div className="rte-group">{children}</div>;
}

function TButton({
  children, onClick, active, disabled, title,
}: {
  children: React.ReactNode;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  title?: string;
}) {
  return (
    <button
      type="button"
      className={`rte-btn${active ? " is-active" : ""}`}
      onClick={onClick}
      disabled={disabled}
      title={title}
      aria-pressed={active}
    >
      {children}
    </button>
  );
}
