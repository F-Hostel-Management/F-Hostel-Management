using Api.UserFeatures.Requests;
using Application.Interfaces;
using AutoWrapper.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Text;

namespace Api.Controllers.Rest;

public class Html2PdfController : BaseRestController
{
    private readonly IHtml2PdfService _html2PdfService;

    public Html2PdfController(IHtml2PdfService html2PdfService)
    {
        _html2PdfService = html2PdfService;
    }

    [Authorize]
    [HttpPost]
    [AutoWrapIgnore]
    public async Task<IActionResult> DownloadAsync(Html2PdfRequest request)
    {
        var base64EncodedBytes = Convert.FromBase64String(request.Base64Html);
        var html = Encoding.UTF8.GetString(base64EncodedBytes);
        var stream = _html2PdfService.Convert(html);
        return new FileStreamResult(stream, "application/pdf");
    }
}
