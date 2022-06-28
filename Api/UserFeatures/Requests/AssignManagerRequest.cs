namespace Api.UserFeatures.Requests;

public class AssignManagerRequest
{
    public Guid HostelId { get; set; }
    public string Email { get; set; }
}