using Domain.Common;
using Domain.Entities.Message;
using Domain.Entities.Room;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities.Ticket;
public class TicketEntity : BaseEntity
{
    public string Discription { get; set; }
    public string ImgPaths { get; set; }

    /*navigation props*/

    // 1 ticket - M messages
    public virtual ICollection<MessageEntity> Messages { get; set; }

    // 1 Tenant (create) M Tickets (for) 1 Room
    public Guid TenantId { get; set; }
    public UserEntity Tenant { get; set; }

    public Guid RoomId { get; set; }
    public RoomEntity Room { get; set; }
}
