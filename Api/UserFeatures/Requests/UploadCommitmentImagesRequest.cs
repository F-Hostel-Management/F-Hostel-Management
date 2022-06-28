using System.ComponentModel.DataAnnotations;

namespace Api.UserFeatures.Requests;

public class UploadCommitmentImagesRequest
{
    [Required]
    public virtual List<IFormFile> ImgsFormFiles { get; set; }
}
