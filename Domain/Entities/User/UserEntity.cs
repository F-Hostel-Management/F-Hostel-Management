using Domain.Common;
using Domain.Entities.Hostel;
using Domain.Enums;

namespace Domain.Entities;

public class UserEntity : BaseEntity
{
    public string Name { get; set; }
    public string Email { get; set; }
    public string Phone { get; set; }
    public string Password { get; set; }
    public Role Role { get; set; }

    /*navigation props*/
    
    // owner
    public virtual ICollection<HostelEntity> Hostels { get; set; }

    // manager
    public virtual ICollection<HostelManagement> HostelManagements { get; set; }
}
