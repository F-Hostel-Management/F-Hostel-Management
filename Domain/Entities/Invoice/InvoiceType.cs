using Domain.Common;
using Domain.Entities.InvoiceSchedule;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities.Invoice;

[Table("InvoiceTypes")]
public class InvoiceType : BaseEntity, Category
{
    public string CategoryName { get; set; }

    /*navigation props*/

    // 1 type - M invoiceSchedules
    public virtual ICollection<InvoiceScheduleEntity> InvoiceSchedules { get; set; }

    // 1 type - M invoices
    public virtual ICollection<InvoiceEntity> Invoices { get; set; }

}

