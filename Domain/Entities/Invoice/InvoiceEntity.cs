using Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities.Invoice
{
    public class InvoiceEntity : BaseEntity
    {
        public string InvoiceCode { get; set; }
        public double Price { get; set; }
        public DateTime Date { get; set; }
        public string Content { get; set; }

        /*navigation props*/

        // type
        public Guid InvoiceTypeId { get; set; }
        public InvoiceType InvoiceType { get; set; }
    }
}
