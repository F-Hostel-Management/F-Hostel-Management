using Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities.Ticket;
public class TicketType : BaseEntity, Category
{
    public string CategoryName { get; set; }

    /*navigation props*/

    // 1 type - M tickets
    public virtual ICollection<TicketEntity> Tickets { get; set; }
}
