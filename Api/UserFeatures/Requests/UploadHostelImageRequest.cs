using Api.UserFeatures.Attributes;

namespace Api.UserFeatures.Requests
{
    public class UploadHostelImageRequest
    {
        public Guid HostelId { get; set; }
        [MaxFileSize( 2 * 1024 * 1024)]
        public IFormFile Image { get; set; }
    }
}
