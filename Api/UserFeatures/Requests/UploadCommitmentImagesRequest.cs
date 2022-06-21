namespace Api.UserFeatures.Requests;

public class UploadCommitmentImagesRequest
{
    public virtual List<IFormFile> ImgsFormFiles { get; set; }
}
