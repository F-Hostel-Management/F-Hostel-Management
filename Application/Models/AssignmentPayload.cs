namespace Application.Models;

public class AssignmentPayload
{
    public Guid HostelId { get; set; }
    public Guid TargetId { get; set; }
    public Guid Inviter { get; set; }
}