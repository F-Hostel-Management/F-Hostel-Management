﻿using Domain.Common;
using Domain.Entities.Room;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities.Invoice;

[Table("Invoices")]
public class InvoiceEntity : BaseEntity
{
    public string InvoiceCode { get; set; }
    public double Quantity { get; set; }
    public double UnitPrice { get; set; }
    public double Price { get; set; }
    public DateTime Date { get; set; }
    public DateTime DueDate { get; set; }
    public string Content { get; set; }
    public string InvoiceType { get; set; }

    /*navigation props*/

    // 1 tenant (paid) M invoice
    public Guid? TenantPaidId { get; set; }
    public UserEntity? TenantPaid { get; set; }


    // 1 Manager (create) M Invoices (for) 1 Room
    public Guid ManagerId { get; set; }
    public UserEntity Manager { get; set; }
    public Guid RoomId { get; set; }
    public RoomEntity Room { get; set; }
}
