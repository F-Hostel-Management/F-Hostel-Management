using Domain.Common;
using Domain.Entities.Invoice;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities.InvoiceSchedule
{
    public class InvoiceScheduleEntity : BaseEntity
    {
        public string InvoiceCode { get; set; }
        public double Price { get; set; }
        public string Cron { get; set; }
        public string Content { get; set; }

        /*navigation props*/

        // type
        public Guid InvoiceTypeId { get; set; }
        public InvoiceType InvoiceType { get; set; }
    }
}
