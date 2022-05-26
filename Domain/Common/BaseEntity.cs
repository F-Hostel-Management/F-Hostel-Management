namespace Domain.Common;

public abstract class BaseEntity
{
    public Guid Id { get; init; }
    public bool IsDeleted { get; set; } = false;
}
