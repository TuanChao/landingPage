import { useMemo } from "react";
import { useParams } from "react-router-dom";
import Seo from "../seo/Seo";
import { useSiteContent } from "../hooks/useSiteContent";

export default function DownloadDetailPage() {
  const { slug } = useParams();
  const content = useSiteContent();
  const download = useMemo(
    () => content.downloads.find((d) => d.slug === slug),
    [slug, content.downloads]
  );

  if (!download) {
    return (
      <main className="container page-block">
        <h1>Ban tai khong ton tai</h1>
      </main>
    );
  }

  return (
    <main className="container page-block">
      <Seo
        title={`Tai ve ${download.name} | ZWCAD Vietnam`}
        description={`Chi tiet tai ve ${download.name} phien ban ${download.version}.`}
        keywords="tai ve zwcad, tai cadbro"
      />
      <h1>Chi tiet tai ve: {download.name}</h1>
      <h2>Phien ban {download.version}</h2>
      <p>Thong tin yeu cau he thong, huong dan cai dat va tai nguyen lien quan.</p>
      <h3>Huong dan</h3>
      <p>Bam nut tai ve, giai nen va cai dat theo huong dan tren man hinh.</p>
    </main>
  );
}
