using Domain.Common;
using Domain.Entities.Ticket;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities.Message;

[Table("Messages")]
public class MessageEntity : BaseEntity
{
    public string Content { get; set; }

    /*navigation props*/

    // 1 ticket - M messages
    public Guid TicketId { get; set; }
    public TicketEntity Ticket { get; set; }

    // 1 user - M messages
    public Guid UserId { get; set; }
    public UserEntity User { get; set; }
}
