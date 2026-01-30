export default function PdfPreview({ pdfUrl }) {
  return (
    <iframe
      src={pdfUrl}
      title="PDF Preview"
      className="w-full h-[500px] border rounded"
    />
  )
}
