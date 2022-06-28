namespace Api.UserFeatures.Requests;

public class RemoveManagerFromHostelRequest
{
    public Guid HostelId { get; set; }
    public Guid ManagerId { get; set; }
}