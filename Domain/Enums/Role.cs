using System.Runtime.Serialization;
namespace Domain.Enums;

public enum Role
{
    [EnumMember(Value = "Tenant")]
    Tenant,
    [EnumMember(Value = "Manager")]
    Manager,
    [EnumMember(Value = "Owner")]
    Owner,
}
