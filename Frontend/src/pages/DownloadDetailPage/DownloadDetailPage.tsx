import { useMemo } from "react";
import { useParams } from "react-router-dom";
import Seo from "../../seo/Seo";
import { PublicApi, useFetch, useLang, pick, type DownloadDto } from "@/lib/publicApi";
import "./DownloadDetailPage.css";

export default function DownloadDetailPage() {
  const { slug } = useParams();
  const lang = useLang();
  const { data, loading } = useFetch<DownloadDto[]>(() => PublicApi.downloads(), []);
  const download = useMemo(() => (data ?? []).find((d) => d.slug === slug), [slug, data]);

  if (loading) {
    return <main className="container download-detail-page"><p>Đang tải...</p></main>;
  }

  if (!download) {
    return (
      <main className="container download-detail-page">
        <h1>Ban tai khong ton tai</h1>
      </main>
    );
  }

  const name = pick(download, "title", lang);

  return (
    <main className="container download-detail-page">
      <Seo
        title={`Tai ve ${name} | ZWCAD Vietnam`}
        description={`Chi tiet tai ve ${name} phien ban ${download.version ?? ""}.`}
        keywords="tai ve zwcad, tai cadbro"
      />
      <h1>Chi tiet tai ve: {name}</h1>
      {download.version && <h2>Phien ban {download.version}</h2>}
      <p>Thong tin yeu cau he thong, huong dan cai dat va tai nguyen lien quan.</p>
      <h3>Tai ve</h3>
      <p>
        <a href={download.fileUrl} className="dp-btn" download>Tai ve ngay</a>
        {download.fileSize && <span style={{ marginLeft: 12, color: "#666" }}>({download.fileSize})</span>}
      </p>
      <h3>Huong dan</h3>
      <p>Bam nut tai ve, giai nen va cai dat theo huong dan tren man hinh.</p>
    </main>
  );
}
