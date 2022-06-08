namespace Application.Interfaces;

public interface IHtml2PdfService
{
    Stream Convert(string html);
}