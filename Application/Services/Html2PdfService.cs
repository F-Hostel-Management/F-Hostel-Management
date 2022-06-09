using Application.Interfaces;
using iText.Html2pdf;

namespace Application.Services;

public class Html2PdfService : IHtml2PdfService
{
    public Stream Convert(string html)
    {
        var stream = new MemoryStream();
        HtmlConverter.ConvertToPdf(html, stream);

        return new MemoryStream(stream.ToArray());
    }
}
